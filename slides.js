/* ==========================================================================
   Recursive Prompt Engineering: Who Writes the Next Prompt?
   Shashi Jagtap · Superagentic AI · LLMday + Prompt Engineering London 2026
   Clean monochrome white-and-black editorial print deck
   ========================================================================== */

const ERAS = [
  { short: "Manual", side: "you", who: "You", line: "You write every turn." },
  { short: "Context", side: "you", who: "You", line: "You still choose what goes in." },
  { short: "Loop", side: "it", who: "Loop", line: "The loop writes the next action." },
  { short: "Harness", side: "it", who: "Harness", line: "The scaffold holds the limits." },
  { short: "Agents", side: "it", who: "Router", line: "A router writes the worker brief." },
  { short: "Recursive", side: "it", who: "Model", line: "The model slices the prompt and calls itself." }
];

const LADDER = [
  {
    title: "Prompt",
    line: "You write the instruction.",
    example: `prompt = "Fix the totals bug"`
  },
  {
    title: "Loop",
    line: "One window. Tools append to the same history.",
    example: `while not done:\n    action = llm(history)\n    history.append(run_tool(action))`
  },
  {
    title: "llm_query",
    line: "The model slices a variable and calls itself.",
    example: `chunks = context.select("src/**/*.py").chunk()\nfindings = llm_query_batched([c.labelled() for c in chunks])`
  },
  {
    title: "Spawn",
    line: "A new session. The host caps the tree.",
    example: `workflow("diagnose-ci")\nstep("slice-logs", context_handle="file:ci.log", mode="read-only")`
  },
  {
    title: "Compile",
    line: "Read-only inspection drafts a spec.",
    example: `sq factory describe --rlm`
  }
];

const SLIDES = [
  {
    id: "title",
    title: "Recursive Prompt Engineering",
    time: "0:00 to 1:00",
    notes: "Keep the opening crisp and calm. Ask the room: who has spent an afternoon babysitting a coding agent turn by turn? For three years, YOU wrote the next prompt. Today we ask: what happens when agents write the next prompt safely?",
    render: () => `
      <div class="slide" style="max-width:980px;">
        <div class="eyebrow">LLMDAY + PROMPT ENGINEERING LONDON</div>
        <h1 class="hero-title" style="margin-top:14px;margin-bottom:28px;">
          Recursive Prompt Engineering:<br/>
          <span class="ink-block">Who Writes the Next Prompt?</span>
        </h1>
        <div style="border-top:2px solid #0a0a0a;padding-top:22px;display:flex;flex-wrap:wrap;gap:14px;align-items:center;">
          <span class="pill solid">Shashi Jagtap</span>
          <span class="pill">Founder, Superagentic AI</span>
          <span class="pill">Everyman Canary Wharf</span>
        </div>
      </div>
    `
  },
  {
    id: "bottleneck",
    title: "The bottleneck is attention",
    time: "1:00 to 2:30",
    notes: "Models are no longer the main bottleneck. Human attention caps out at 3 to 5 concurrent chat sessions. Manual follow-ups throttle autonomous systems down to human typing speed.",
    render: () => `
      <div class="slide">
        <h2 class="slide-title">The bottleneck is attention</h2>
        <div class="grid-2" style="margin-top:28px;">
          <div class="card">
            <h3>Turns</h3>
            <p>You write every follow-up by hand.</p>
          </div>
          <div class="card inverted">
            <h3>Stop</h3>
            <p>The system speaks up only when you must act.</p>
          </div>
        </div>
      </div>
    `
  },
  {
    id: "eras",
    title: "Six eras",
    time: "2:30 to 5:00",
    notes: "Click left to right. Amber means you write the prompt. Blue means the system writes the next one. The slope is Manual, Context, Loop, Harness, Agents, Recursive. Loop comes before agents. From the loop on, you stop writing every turn. You still own the goal and the stop.",
    render: () => `
      <div class="slide">
        <h2 class="slide-title">Six eras</h2>
        <div class="era-legend">
          <span><i class="swatch you"></i>You</span>
          <span><i class="swatch it"></i>System</span>
        </div>
        <div class="era-slope" aria-hidden="true">
          ${ERAS.map((e, i) => `<i class="${e.side}" style="height:${18 + i * 8}px"></i>`).join("")}
        </div>
        <div class="era-tabs" id="era-tabs">
          ${ERAS.map((e, i) => `
            <button class="era-tab ${e.side} ${i === 0 ? "active" : ""}" data-era="${i}">
              <div class="era-name">${e.short}</div>
            </button>
          `).join("")}
        </div>
        <div class="card framed era-detail" id="era-detail"></div>
      </div>
    `,
    mount: () => {
      const renderEra = (idx) => {
        const e = ERAS[idx];
        document.querySelectorAll(".era-tab").forEach((el, i) => el.classList.toggle("active", i === idx));
        document.getElementById("era-detail").innerHTML = `
          <div class="who-box ${e.side}" style="grid-column: 1 / -1;">
            <div class="who-kicker">${e.who}</div>
            <div class="who-line">${e.line}</div>
          </div>
        `;
      };
      document.querySelectorAll(".era-tab").forEach((btn) => {
        btn.addEventListener("click", () => renderEra(Number(btn.dataset.era)));
      });
      renderEra(0);
    }
  },
  {
    id: "context-rot",
    title: "Context rot",
    time: "5:00 to 6:30",
    notes: "Click 12k, 96k, 420k tokens. Adding more tools and logs degrades reasoning and burns cost. Context engineering fails when everything is stuffed into one flat prompt.",
    render: () => `
      <div class="slide">
        <h2 class="slide-title">Context rot</h2>
        <p class="lead">More tools and logs bury the goal. Keep the corpus outside the prompt.</p>
        <div class="rot-controls" style="margin-top:22px;">
          <button class="seg-btn" data-rot="0">Small</button>
          <button class="seg-btn" data-rot="1">Noisy</button>
          <button class="seg-btn active" data-rot="2">Full</button>
        </div>
        <div class="card framed" id="rot-card"></div>
      </div>
    `,
    mount: () => {
      const states = [
        { label: "Holds", signal: 92, line: "Constraints stay intact." },
        { label: "Drifts", signal: 54, line: "Tools and logs bury the goal." },
        { label: "Rots", signal: 18, line: "The model edits the wrong files." }
      ];
      const renderRot = (idx) => {
        const s = states[idx];
        document.querySelectorAll("[data-rot]").forEach((b, i) => b.classList.toggle("active", i === idx));
        document.getElementById("rot-card").innerHTML = `
          <span class="pill">${s.label}</span>
          <p style="margin-top:12px;">${s.line}</p>
          <div class="meter-bar"><div class="meter-fill" style="width:${s.signal}%;"></div></div>
        `;
      };
      document.querySelectorAll("[data-rot]").forEach((b) => b.addEventListener("click", () => renderRot(Number(b.dataset.rot))));
      renderRot(2);
    }
  },
  {
    id: "harness",
    title: "Harness",
    time: "6:30 to 8:00",
    notes: "Language models live inside scaffolds. The harness owns execution isolation, context handles, permissions, and budgets so autonomy stays safe.",
    render: () => `
      <div class="slide">
        <h2 class="slide-title">Harness</h2>
        <p class="lead">The model lives inside a scaffold.</p>
        <div class="grid-3">
          <div class="card framed"><h3>Sandbox</h3><p>The checkout stays isolated.</p></div>
          <div class="card framed"><h3>Memory</h3><p>Handles and short summaries, not dumps.</p></div>
          <div class="card framed"><h3>Budget</h3><p>Depth, time, and tokens live in the host.</p></div>
        </div>
      </div>
    `
  },
  {
    id: "deepseek-superagent",
    title: "Router and workers",
    time: "8:00 to 10:30",
    notes: "DeepSeek Harness super-agent, 31 Oct 2026, is a different mechanism from an RLM: one router, isolated workers. Their preliminary scheduling test, five runs, timer workload: system p50 12.4 min versus about 20.4 min for a single session that never delegated. The workers themselves are not 40% faster. Say preliminary, then move on.",
    render: () => `
      <div class="slide">
        <h2 class="slide-title">Router and workers</h2>
        <div class="grid-3" style="margin-top:28px;">
          <div class="card"><h3>Events</h3><p>Issues, CI, and chat arrive here.</p></div>
          <div class="card inverted"><h3>Router</h3><p>One voice. It writes the briefs.</p></div>
          <div class="card"><h3>Workers</h3><p>Isolated sessions. They do not speak to you.</p></div>
        </div>
      </div>
    `
  },
  {
    id: "rlm",
    title: "The prompt is a variable",
    time: "10:30 to 12:30",
    notes: "Say this before the code. An ordinary prompt puts the whole input in the window. Quality rots before the window fills. A recursive language model stores the prompt as a Python variable. The root model sees the length and the shape, writes code to slice it, and calls itself on each slice with llm_query. From outside it is still one model: string in, string out. llm_query has no tools and no session. A spawned worker is the next rung, and only when the child needs its own repository. The host owns the budget. Cite Zhang, Kraska, and Khattab, MIT CSAIL, arXiv 2512.24601: more than an order of magnitude past the context window. Their RLM-Qwen3-8B beat base Qwen3-8B by a median of 28% and approached GPT-5 on three long-context tasks. Do not say 100x.",
    render: () => `
      <div class="slide">
        <h2 class="slide-title">The prompt is a variable</h2>
        <p class="lead">The root model sees the shape, slices it, and calls itself. From outside it is still one model.</p>
        <div class="card">
          <div class="code-box">context.stats()
auth = context.select("src/auth/**")
llm_query("Which checks are missing?", context=auth.text())</div>
        </div>
      </div>
    `
  },
  {
    id: "ladder",
    title: "The recursion ladder",
    time: "12:30 to 14:00",
    notes: "Open on L2 and stay there until the room can say what llm_query is. Then click L3: a spawned worker is a new session, and the host caps the tree. L4 is the product, sq factory describe --rlm. Click L0 and L1 only if someone asks how this differs from a normal tool loop.",
    render: () => `
      <div class="slide">
        <h2 class="slide-title">The recursion ladder</h2>
        <div class="ladder-wrap" style="margin-top:22px;">
          <div class="ladder-list" id="ladder-list">
            ${LADDER.map((item, i) => `
              <button class="ladder-item ${i === 2 ? "active" : ""}" data-ladder="${i}">
                <div style="font-size:18px;font-weight:800;">${item.title}</div>
              </button>
            `).join("")}
          </div>
          <div class="card framed" id="ladder-detail" style="display:flex;flex-direction:column;justify-content:center;gap:14px;"></div>
        </div>
      </div>
    `,
    mount: () => {
      const renderLevel = (idx) => {
        const l = LADDER[idx];
        document.querySelectorAll("[data-ladder]").forEach((el, i) => el.classList.toggle("active", i === idx));
        document.getElementById("ladder-detail").innerHTML = `
          <h3 style="font-size:24px;">${l.line}</h3>
          <div class="code-box">${l.example}</div>
        `;
      };
      document.querySelectorAll("[data-ladder]").forEach((b) => b.addEventListener("click", () => renderLevel(Number(b.dataset.ladder))));
      renderLevel(2);
    }
  },
  {
    id: "swarms-vs-factories",
    title: "Swarms and factories",
    time: "14:00 to 15:30",
    notes: "Swarms offer dynamic runtime decomposition; Software Factories offer isolation, repeatability, and verification. Recursive Prompt Engineering bridges both.",
    render: () => `
      <div class="slide">
        <h2 class="slide-title">Swarms and factories</h2>
        <div class="grid-3" style="margin-top:28px;">
          <div class="card"><h3>Swarm</h3><p>Split the work at runtime.</p></div>
          <div class="card inverted"><h3>Checks</h3><p>Every run stays isolated and verified.</p></div>
          <div class="card"><h3>Factory</h3><p>A versioned spec, compiled on demand.</p></div>
        </div>
      </div>
    `
  },
  {
    id: "failure-modes",
    title: "When nobody owns the stop",
    time: "15:30 to 16:45",
    notes: "Cite DeepSeek-Reasonix issue 2272, May 2026. One /autoresearch question spawned 12,744 subagents and 235,681,715 tokens. A nested skill bypassed a depth cap that lived in the tool list. Most tokens were cache hits, so the bill was about $3.40. The scare is the fan-out. Say that if someone asks about cost. The rule stands: the host owns depth and budget.",
    render: () => `
      <div class="slide">
        <h2 class="slide-title">When nobody owns the stop</h2>
        <div class="grid-2" style="margin-top:28px;">
          <div class="card inverted">
            <h3>Fan-out</h3>
            <p>A nested skill walks past a depth cap. The host must own depth and budget.</p>
          </div>
          <div class="card framed">
            <h3>Slop</h3>
            <p>Ambiguous tickets become plausible diffs nobody trusts.</p>
          </div>
        </div>
      </div>
    `
  },
  {
    id: "five-laws",
    title: "Five rules",
    time: "16:45 to 18:30",
    notes: "Practical architecture checklist for taking recursive prompt engineering into production tomorrow morning.",
    render: () => `
      <div class="slide">
        <h2 class="slide-title">Five rules</h2>
        <div class="grid-5" style="margin-top:28px;">
          <div class="card framed"><h3>Read-only</h3><p>Name what stays out.</p></div>
          <div class="card framed"><h3>Host caps</h3><p>Depth and budget live in the runtime.</p></div>
          <div class="card framed"><h3>Pauses</h3><p>Open spec, then again before ship.</p></div>
          <div class="card framed"><h3>Hidden checks</h3><p>The agent never sees the probes.</p></div>
          <div class="card inverted"><h3>You sign</h3><p>The last gate is yours.</p></div>
        </div>
      </div>
    `
  },
  {
    id: "interactive-gates",
    title: "When should it pause?",
    time: "18:30 to 19:30",
    notes: "Toggle live between Ambiguous Feature and Clear Bug Fix to show typed Triage routing: pause before coding when intent is open; take the fast path when scope is clear.",
    render: () => `
      <div class="slide">
        <h2 class="slide-title">When should it pause?</h2>
        <div class="rot-controls" style="margin-top:20px;">
          <button class="seg-btn active" data-gate="feature">Open spec</button>
          <button class="seg-btn" data-gate="bug">Clear bug</button>
        </div>
        <div class="card tinted" id="gate-prompt-box" style="margin-bottom:14px;"></div>
        <div class="pipeline-flow" id="gate-pipeline"></div>
      </div>
    `,
    mount: () => {
      const renderGate = (mode) => {
        const isFeature = mode === "feature";
        document.querySelectorAll("[data-gate]").forEach((b) => b.classList.toggle("active", b.dataset.gate === mode));
        document.getElementById("gate-prompt-box").innerHTML = isFeature
          ? `<strong>Add a summary report, with optional filters.</strong>`
          : `<strong>Fix totals so categories accumulate.</strong>`;
        document.getElementById("gate-pipeline").innerHTML = `
          <div class="stage-node">
            <h3 style="font-size:18px;">Triage</h3>
          </div>
          <div class="pipe-arrow">→</div>
          <div class="stage-node ${isFeature ? "active-gate" : "skipped"}">
            <h3 style="font-size:18px;">${isFeature ? "Ask you" : "Skip"}</h3>
          </div>
          <div class="pipe-arrow">→</div>
          <div class="stage-node">
            <h3 style="font-size:18px;">Build</h3>
          </div>
          <div class="pipe-arrow">→</div>
          <div class="stage-node active-gate">
            <h3 style="font-size:18px;">You sign</h3>
          </div>
        `;
      };
      document.querySelectorAll("[data-gate]").forEach((b) => b.addEventListener("click", () => renderGate(b.dataset.gate)));
      renderGate("feature");
    }
  },
  {
    id: "demo",
    title: "Two recursions",
    time: "19:30 to 23:00",
    notes: "Cmd+Tab to SuperQode. Demo 1 is the RLM context engine: sq factory describe --rlm, Monty, read-only. It drafts a Factory spec and writes nothing until you apply it. Monty can run llm_query. It refuses rlm.run. Do not promise 90ms. Demo 2 is the other recursion, spawn_harness, with the host caps in local-recursive-dynamic.yaml. Say the two names out loud so the room does not merge them.",
    render: () => `
      <div class="slide">
        <h2 class="slide-title">Two recursions</h2>
        <div class="grid-2" style="margin-top:28px;">
          <div class="card framed">
            <h3>llm_query</h3>
            <p>Read-only. Draft a spec. Nothing runs until you apply it.</p>
          </div>
          <div class="card tinted">
            <h3>spawn</h3>
            <p>A new session, with the host caps on the tree.</p>
          </div>
        </div>
      </div>
    `
  },
  {
    id: "new-job",
    title: "The new job",
    time: "23:00 to 24:15",
    notes: "Pause 5 seconds for audience photos. Summarize the mindset shift clearly: you design goals, constraints, verification criteria, and stop conditions.",
    render: () => `
      <div class="slide">
        <h2 class="slide-title">The new job</h2>
        <table class="compare-table" style="margin-top:28px;">
          <thead>
            <tr>
              <th>Before</th>
              <th>Now</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>You write every turn</td>
              <td>You set the goal and the constraints</td>
            </tr>
            <tr>
              <td>You paste the repo</td>
              <td>The prompt stays a variable</td>
            </tr>
            <tr>
              <td>You hope it passes</td>
              <td>You sign the diff</td>
            </tr>
          </tbody>
        </table>
      </div>
    `
  },
  {
    id: "qa",
    title: "Questions",
    time: "24:15 to 25:00",
    notes: "Clean, non-promotional closing slide. Thank LLMday London and open the floor for questions.",
    render: () => `
      <div class="slide" style="max-width:960px;">
        <div class="eyebrow">LLMDAY LONDON</div>
        <h1 class="hero-title" style="margin-top:12px;">
          Thank you.<br/>
          <span class="ink-block">Questions?</span>
        </h1>
        <div style="border-top:2px solid #0a0a0a;padding-top:20px;margin-top:34px;display:flex;flex-wrap:wrap;gap:14px;align-items:center;">
          <span class="pill solid">Shashi Jagtap</span>
          <span class="pill">Superagentic AI</span>
          <span class="pill">github.com/SuperagenticAI</span>
          <span class="pill">super-agentic.ai</span>
        </div>
      </div>
    `
  }
];

/* ==========================================================================
   Deck Engine (Navigation, Hash Routing, Notes, Grid Overview, Countdown)
   ========================================================================== */

let current = 0;
let timerSeconds = 25 * 60;
let timerInterval = null;

const stage = document.getElementById("stage");
const counterEl = document.getElementById("slide-counter");
const progressEl = document.getElementById("progress-fill");
const notesDrawer = document.getElementById("notes-drawer");
const notesBody = document.getElementById("notes-body");
const notesTime = document.getElementById("notes-time");
const notesBtn = document.getElementById("notes-btn");
const gridModal = document.getElementById("grid-modal");
const gridCards = document.getElementById("grid-cards");
const timerBtn = document.getElementById("timer-btn");
const timerDisplay = document.getElementById("timer-display");

function pad(n) {
  return String(n).padStart(2, "0");
}

function go(index) {
  current = Math.max(0, Math.min(SLIDES.length - 1, index));
  const slide = SLIDES[current];
  stage.innerHTML = slide.render();
  if (typeof slide.mount === "function") {
    slide.mount();
  }
  counterEl.textContent = "";
  progressEl.style.width = `${((current + 1) / SLIDES.length) * 100}%`;
  notesBody.textContent = slide.notes;
  notesTime.textContent = slide.time;
  history.replaceState(null, "", `#slide-${current + 1}`);
  refreshGridHighlight();
}

function next() { if (current < SLIDES.length - 1) go(current + 1); }
function prev() { if (current > 0) go(current - 1); }

function toggleNotes() {
  const open = notesDrawer.classList.toggle("open");
  notesDrawer.setAttribute("aria-hidden", String(!open));
  notesBtn.classList.toggle("active", open);
}

function toggleGrid(force) {
  const open = force !== undefined ? force : !gridModal.classList.contains("open");
  gridModal.classList.toggle("open", open);
  gridModal.setAttribute("aria-hidden", String(!open));
  if (open) refreshGridHighlight();
}

function refreshGridHighlight() {
  gridCards.querySelectorAll(".grid-card").forEach((card, i) => {
    card.classList.toggle("current", i === current);
  });
}

function buildGrid() {
  gridCards.innerHTML = SLIDES.map((s, i) => `
    <button class="grid-card" data-jump="${i}">
      <div class="grid-card-num">${s.title}</div>
      <div class="grid-card-title">${s.title}</div>
      <div class="grid-card-meta">${s.notes.slice(0, 88)}...</div>
    </button>
  `).join("");
  gridCards.querySelectorAll("[data-jump]").forEach((btn) => {
    btn.addEventListener("click", () => {
      go(Number(btn.dataset.jump));
      toggleGrid(false);
    });
  });
}

function toggleFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen?.().catch(() => {});
  } else {
    document.exitFullscreen?.().catch(() => {});
  }
}

document.addEventListener("fullscreenchange", () => {
  document.body.classList.toggle("is-fullscreen", Boolean(document.fullscreenElement));
});

function toggleTimer() {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
    timerBtn.classList.remove("active");
    return;
  }
  timerBtn.classList.add("active");
  timerInterval = setInterval(() => {
    timerSeconds = Math.max(0, timerSeconds - 1);
    timerDisplay.textContent = `${pad(Math.floor(timerSeconds / 60))}:${pad(timerSeconds % 60)}`;
  }, 1000);
}

document.getElementById("prev-btn").addEventListener("click", prev);
document.getElementById("next-btn").addEventListener("click", next);
notesBtn.addEventListener("click", toggleNotes);
document.getElementById("notes-close").addEventListener("click", toggleNotes);
document.getElementById("grid-btn").addEventListener("click", () => toggleGrid());
document.getElementById("grid-close").addEventListener("click", () => toggleGrid(false));
document.getElementById("fs-btn").addEventListener("click", toggleFullscreen);
timerBtn.addEventListener("click", toggleTimer);

document.addEventListener("keydown", (e) => {
  if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;
  if (e.key === "ArrowRight" || e.key === " " || e.key === "PageDown") {
    if (gridModal.classList.contains("open")) return;
    e.preventDefault();
    next();
  } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
    if (gridModal.classList.contains("open")) return;
    e.preventDefault();
    prev();
  } else if (e.key === "Home") {
    go(0);
  } else if (e.key === "End") {
    go(SLIDES.length - 1);
  } else if (e.key.toLowerCase() === "n") {
    toggleNotes();
  } else if (e.key.toLowerCase() === "g" || e.key.toLowerCase() === "o") {
    toggleGrid();
  } else if (e.key.toLowerCase() === "f") {
    toggleFullscreen();
  } else if (e.key.toLowerCase() === "t") {
    toggleTimer();
  } else if (e.key === "Escape") {
    if (gridModal.classList.contains("open")) toggleGrid(false);
    else if (notesDrawer.classList.contains("open")) toggleNotes();
  }
});

let touchX = 0;
document.addEventListener("touchstart", (e) => { touchX = e.changedTouches[0].clientX; }, { passive: true });
document.addEventListener("touchend", (e) => {
  const dx = e.changedTouches[0].clientX - touchX;
  if (Math.abs(dx) > 60) dx < 0 ? next() : prev();
}, { passive: true });

buildGrid();
const hashMatch = location.hash.match(/^#slide-(\d+)$/);
const startIdx = hashMatch ? Number(hashMatch[1]) - 1 : 0;
go(startIdx);

/* ==========================================================================
   Recursive Prompt Engineering: Who Writes the Next Prompt?
   Shashi Jagtap · Superagentic AI · LLMday + Prompt Engineering London 2026
   Clean monochrome white-and-black editorial print deck
   ========================================================================== */

const ERAS = [
  {
    num: "01",
    name: "Manual Prompts",
    who: "Human writes every turn",
    summary: "Back-and-forth chat with one model window. Works for snippets, breaks on real codebases.",
    limit: "Human becomes the copy-paste glue between terminal, IDE, and browser."
  },
  {
    num: "02",
    name: "Context Engineering",
    who: "Human + RAG / MCP tools",
    summary: "Connect docs, code search, issues, and MCP tools so agents pull external context.",
    limit: "Hits Context Rot: dumping too many tools and logs dilutes signal."
  },
  {
    num: "03",
    name: "Harness Engineering",
    who: "Scaffold wraps the model",
    summary: "Own the runtime around the model: sandboxes, permissions, compaction, and memory.",
    limit: "Still mostly single-session. Humans still babysit 3 to 5 tabs."
  },
  {
    num: "04",
    name: "Super-Agents & Swarms",
    who: "Router delegates child briefs",
    summary: "Give a goal. Always-on routers and swarms spawn isolated workers concurrently.",
    limit: "Unconstrained spawning can cascade or produce unreviewed PR noise."
  },
  {
    num: "05",
    name: "Loop Engineering",
    who: "Feedback loop drives next turn",
    summary: "Stop micromanaging how. Define the loop, verification signal, and exit condition.",
    limit: "Static pipelines are still tedious to hand-author for every repo."
  },
  {
    num: "06",
    name: "Recursive Prompting",
    who: "Agents write next prompt in bounds",
    summary: "The prompt is data. The model slices it and calls itself, inside host limits.",
    kicker: "You still own",
    limit: "Goals, constraints, verification, and the stop condition."
  }
];

const LADDER = [
  {
    level: "L0",
    title: "Static Human Prompt",
    who: "Human writes Turn 1",
    detail: "One instruction string. No runtime adaptation and no verification loop.",
    example: `prompt = "Fix the totals bug in app.py"`
  },
  {
    level: "L1",
    title: "Tool Loop (ReAct)",
    who: "Model appends tool outputs to one history",
    detail: "Single context window calls tools in a loop. Degrades as logs and diffs pile up.",
    example: `while not done:\n    action = llm(history)\n    history.append(run_tool(action))`
  },
  {
    level: "L2",
    title: "Symbolic RLM",
    who: "Root model slices a variable and calls itself",
    detail: "The prompt is an RLMContext in a REPL. llm_query asks one question about a slice. No tools, no session.",
    example: `chunks = context.select("src/**/*.py").chunk(12000)\nfindings = llm_query_batched([c.labelled() for c in chunks])`
  },
  {
    level: "L3",
    title: "Recursive Sub-Agents",
    who: "A router writes a brief and spawns a worker",
    detail: "This is a new session with its own kernel. The host caps depth, children, and parallelism for the whole tree.",
    example: `workflow("diagnose-ci", max_depth=1, max_children=4)\nstep("slice-logs", context_handle="file:ci.log", fanout=True, mode="read-only")`
  },
  {
    level: "L4",
    title: "On-Demand Recursive Systems",
    who: "RLM compiles governed workflows as code",
    detail: "RLM inspects any repo read-only to compile validated specs, checks, and skills on demand.",
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
        <div class="eyebrow">LLMDAY + PROMPT ENGINEERING LONDON · 26 NOV 2026</div>
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
    title: "The Attention Bottleneck",
    time: "1:00 to 2:30",
    notes: "Models are no longer the main bottleneck. Human attention caps out at 3 to 5 concurrent chat sessions. Manual follow-ups throttle autonomous systems down to human typing speed.",
    render: () => `
      <div class="slide">
        <div class="eyebrow">01 · THE SHIFT</div>
        <h2 class="slide-title">The bottleneck is no longer model intelligence.<br/><span class="ink-block">It is human attention.</span></h2>
        <div class="grid-2" style="margin-top:26px;">
          <div class="card">
            <span class="pill">MANUAL TURN LOOP</span>
            <h3 style="margin-top:14px;">Human as Orchestrator</h3>
            <ul>
              <li>You write Turn 1, Turn 2, Turn 14 by hand</li>
              <li>Attention caps out at <strong>3 to 5 active sessions</strong></li>
              <li>Constant tab switching breaks focus</li>
              <li>Decisions stay trapped in chat history</li>
            </ul>
          </div>
          <div class="card inverted">
            <span class="pill inverted-pill">RECURSIVE EXECUTION</span>
            <h3 style="margin-top:14px;">Human as Constraint Architect</h3>
            <ul>
              <li>You define <strong>goal</strong>, <strong>constraints</strong>, and <strong>ideal outcome</strong></li>
              <li>Agents inspect context, write briefs, and delegate</li>
              <li>System speaks up <strong>only when a human must act</strong></li>
              <li>Verification and stop conditions protect the repo</li>
            </ul>
          </div>
        </div>
      </div>
    `
  },
  {
    id: "eras",
    title: "6 Eras of Prompt Engineering",
    time: "2:30 to 5:00",
    notes: "Step through the 6 eras: Manual Prompts, Context Engineering, Harness Engineering, Super-Agents & Swarms, Loop Engineering, Recursive Prompting. Each era moves the human one layer higher.",
    render: () => `
      <div class="slide">
        <div class="eyebrow">02 · EVOLUTION (INTERACTIVE)</div>
        <h2 class="slide-title">6 Eras of Prompt Engineering</h2>
        <div class="era-tabs" id="era-tabs" style="margin-top:22px;">
          ${ERAS.map((e, i) => `
            <button class="era-tab ${i === 5 ? "active" : ""}" data-era="${i}">
              <div class="era-num">${e.num}</div>
              <div class="era-name">${e.name}</div>
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
          <div>
            <span class="pill solid">ERA ${e.num} · ${e.name}</span>
            <h3 style="font-size:24px;margin:14px 0 10px;">${e.summary}</h3>
            <p style="font-size:15px;color:#525252;"><strong>${e.kicker || "Limit"}:</strong> ${e.limit}</p>
          </div>
          <div style="background:#0a0a0a;color:#ffffff;padding:22px;">
            <div style="font-family:var(--font-mono);font-size:11px;color:#d4d4d4;margin-bottom:8px;letter-spacing:0.08em;">WHO WRITES THE NEXT PROMPT?</div>
            <div style="font-size:22px;font-weight:800;line-height:1.25;">${e.who}</div>
          </div>
        `;
      };
      document.querySelectorAll(".era-tab").forEach((btn) => {
        btn.addEventListener("click", () => renderEra(Number(btn.dataset.era)));
      });
      renderEra(5);
    }
  },
  {
    id: "context-rot",
    title: "The Wall: Context Rot",
    time: "5:00 to 6:30",
    notes: "Click 12k, 96k, 420k tokens. Adding more tools and logs degrades reasoning and burns cost. Context engineering fails when everything is stuffed into one flat prompt.",
    render: () => `
      <div class="slide">
        <div class="eyebrow">03 · THE CONTEXT WALL</div>
        <h2 class="slide-title">More tools and logs create <span class="ink-block">Context Rot</span></h2>
        <div class="rot-controls" style="margin-top:22px;">
          <button class="seg-btn" data-rot="0">12k tokens · Focused</button>
          <button class="seg-btn" data-rot="1">96k tokens · Noisy Tools + Logs</button>
          <button class="seg-btn active" data-rot="2">420k tokens · Context Rot</button>
        </div>
        <div class="grid-2">
          <div class="card framed" id="rot-card"></div>
          <div class="card tinted">
            <span class="pill solid">THE FIX</span>
            <h3 style="margin-top:14px;">Keep Context Outside the Prompt</h3>
            <ul>
              <li>Hold large repos and logs as external data handles</li>
              <li>Inspect and slice programmatically inside a sandbox</li>
              <li>Return compact answers, never raw transcript dumps</li>
            </ul>
          </div>
        </div>
      </div>
    `,
    mount: () => {
      const states = [
        { label: "Clean Signal", signal: 92, note: "Model keeps constraints intact, tracks exact failure, edits 1 file cleanly.", tokens: "12,000 tok · 1x cost" },
        { label: "Attention Drift", signal: 54, note: "25 MCP tool schemas and full file dumps push the goal into the middle.", tokens: "96,000 tok · 8x cost" },
        { label: "Severe Context Rot", signal: 18, note: "Agent forgets constraints, misses failures, edits unrelated files, burns budget.", tokens: "420,000 tok · 35x cost" }
      ];
      const renderRot = (idx) => {
        const s = states[idx];
        document.querySelectorAll("[data-rot]").forEach((b, i) => b.classList.toggle("active", i === idx));
        document.getElementById("rot-card").innerHTML = `
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <span class="pill">${s.tokens}</span>
            <span style="font-family:var(--font-mono);font-weight:800;">${s.signal}% Signal</span>
          </div>
          <div class="meter-bar"><div class="meter-fill" style="width:${s.signal}%;"></div></div>
          <h3 style="margin-top:16px;">${s.label}</h3>
          <p style="margin-top:6px;">${s.note}</p>
        `;
      };
      document.querySelectorAll("[data-rot]").forEach((b) => b.addEventListener("click", () => renderRot(Number(b.dataset.rot))));
      renderRot(2);
    }
  },
  {
    id: "harness",
    title: "Harness Engineering",
    time: "6:30 to 8:00",
    notes: "Language models live inside scaffolds. The harness owns execution isolation, context handles, permissions, and budgets so autonomy stays safe.",
    render: () => `
      <div class="slide">
        <div class="eyebrow">04 · HARNESS ENGINEERING</div>
        <h2 class="slide-title">“Language Models Live Inside Scaffolds”</h2>
        <div class="grid-3" style="margin-top:26px;">
          <div class="card framed">
            <span class="pill solid">01 · ISOLATION</span>
            <h3 style="margin-top:14px;">Sandboxes &amp; Worktrees</h3>
            <p>OS sandboxes, Monty/Docker REPLs, and isolated Git worktrees keep your checkout safe.</p>
          </div>
          <div class="card framed">
            <span class="pill solid">02 · MEMORY</span>
            <h3 style="margin-top:14px;">Handles &amp; Compaction</h3>
            <p>Lazy file handles and bounded summaries keep working memory small and sharp.</p>
          </div>
          <div class="card framed">
            <span class="pill solid">03 · GOVERNANCE</span>
            <h3 style="margin-top:14px;">Host-Owned Limits</h3>
            <p>Hard caps on tokens, wall-clock time, tool calls, and credentials live in host code.</p>
          </div>
        </div>
      </div>
    `
  },
  {
    id: "deepseek-superagent",
    title: "DeepSeek Harness: Super-Agent Architecture",
    time: "8:00 to 10:30",
    notes: "DeepSeek Harness super-agent, 31 Oct 2026, is a different mechanism from an RLM: one router, isolated workers. Their preliminary scheduling test, five runs, timer workload: system p50 12.4 min versus about 20.4 min for a single session that never delegated. The workers themselves are not 40% faster. Say preliminary, then move on.",
    render: () => `
      <div class="slide">
        <div class="eyebrow">05 · DEEPSEEK HARNESS (dsh) · SUPER-AGENT ARCHITECTURE</div>
        <h2 class="slide-title">Two-Layer Router and Worker Fabric</h2>
        <div class="card framed" style="padding:18px 22px;margin:22px 0 18px;">
          <svg viewBox="0 0 1120 228" width="100%" height="auto" role="img" aria-label="DeepSeek Harness Super-Agent Router and Worker Architecture">
            <rect x="10" y="20" width="210" height="154" fill="#f7f7f7" stroke="#0a0a0a" stroke-width="1.8"/>
            <text x="115" y="48" text-anchor="middle" fill="#0a0a0a" font-size="12.5" font-weight="800" font-family="ui-monospace, monospace">EVENT TRIGGERS</text>
            <line x1="28" y1="58" x2="202" y2="58" stroke="#d4d4d4" stroke-width="1"/>
            <text x="115" y="86" text-anchor="middle" fill="#262626" font-size="14">GitHub Issues &amp; PRs</text>
            <text x="115" y="112" text-anchor="middle" fill="#262626" font-size="14">CI / Test Failures</text>
            <text x="115" y="138" text-anchor="middle" fill="#262626" font-size="14">Chat &amp; Webhooks</text>

            <line x1="220" y1="97" x2="288" y2="97" stroke="#0a0a0a" stroke-width="2"/>
            <polygon points="288,91 300,97 288,103" fill="#0a0a0a"/>

            <rect x="302" y="12" width="290" height="170" fill="#0a0a0a" stroke="#0a0a0a" stroke-width="2"/>
            <text x="447" y="42" text-anchor="middle" fill="#d4d4d4" font-size="12" font-weight="700" font-family="ui-monospace, monospace">LIGHT ROUTER (CONTROL PLANE)</text>
            <text x="447" y="74" text-anchor="middle" fill="#ffffff" font-size="16" font-weight="800">Always-on human interface</text>
            <text x="447" y="102" text-anchor="middle" fill="#e5e5e5" font-size="13.5">Triages events · routes sessions</text>
            <text x="447" y="126" text-anchor="middle" fill="#e5e5e5" font-size="13.5">Spawns &amp; coordinates workers</text>
            <rect x="328" y="142" width="238" height="26" fill="#ffffff"/>
            <text x="447" y="159" text-anchor="middle" fill="#0a0a0a" font-size="11.5" font-weight="800">“Speaks only when a person must act”</text>

            <line x1="592" y1="60" x2="668" y2="42" stroke="#0a0a0a" stroke-width="1.8"/>
            <line x1="592" y1="97" x2="668" y2="97" stroke="#0a0a0a" stroke-width="1.8"/>
            <line x1="592" y1="134" x2="668" y2="152" stroke="#0a0a0a" stroke-width="1.8"/>

            <rect x="672" y="16" width="218" height="48" fill="#ffffff" stroke="#0a0a0a" stroke-width="1.8"/>
            <text x="781" y="37" text-anchor="middle" fill="#0a0a0a" font-size="13" font-weight="800">Worker 1 · Bug Fix</text>
            <text x="781" y="54" text-anchor="middle" fill="#525252" font-size="11.5">Isolated context + sandbox</text>

            <rect x="672" y="73" width="218" height="48" fill="#ffffff" stroke="#0a0a0a" stroke-width="1.8"/>
            <text x="781" y="94" text-anchor="middle" fill="#0a0a0a" font-size="13" font-weight="800">Worker 2 · Feature PR</text>
            <text x="781" y="111" text-anchor="middle" fill="#525252" font-size="11.5">Concurrent isolated session</text>

            <rect x="672" y="130" width="218" height="48" fill="#ffffff" stroke="#0a0a0a" stroke-width="1.8"/>
            <text x="781" y="151" text-anchor="middle" fill="#0a0a0a" font-size="13" font-weight="800">Worker N · Verification</text>
            <text x="781" y="168" text-anchor="middle" fill="#525252" font-size="11.5">Async checks &amp; evidence</text>

            <rect x="914" y="16" width="196" height="162" fill="#f7f7f7" stroke="#0a0a0a" stroke-width="1.8" stroke-dasharray="5 3"/>
            <text x="1012" y="44" text-anchor="middle" fill="#0a0a0a" font-size="12" font-weight="800" font-family="ui-monospace, monospace">OS INFRASTRUCTURE</text>
            <text x="1012" y="76" text-anchor="middle" fill="#262626" font-size="13.5">Event-sourced logs</text>
            <text x="1012" y="102" text-anchor="middle" fill="#262626" font-size="13.5">Prefix-cache layer</text>
            <text x="1012" y="128" text-anchor="middle" fill="#262626" font-size="13.5">Watchdog recovery</text>
            <text x="1012" y="154" text-anchor="middle" fill="#262626" font-size="13.5">Storage / compute split</text>

            <text x="560" y="212" text-anchor="middle" fill="#525252" font-size="12.5" font-family="ui-monospace, monospace">
              Preliminary test · p50 12.4 min vs 20.4 min · five runs
            </text>
          </svg>
        </div>
        <div class="grid-3">
          <div class="card"><p><strong>Protects attention:</strong> One control plane instead of 10 noisy tabs.</p></div>
          <div class="card"><p><strong>True concurrency:</strong> Ephemeral workers run in parallel.</p></div>
          <div class="card"><p><strong>Watchdog recovery:</strong> Handles stalls and crashes asynchronously.</p></div>
        </div>
      </div>
    `
  },
  {
    id: "rlm",
    title: "Recursive Language Models (RLMs)",
    time: "10:30 to 12:30",
    notes: "Say this before the code. An ordinary prompt puts the whole input in the window. Quality rots before the window fills. A recursive language model stores the prompt as a Python variable. The root model sees the length and the shape, writes code to slice it, and calls itself on each slice with llm_query. From outside it is still one model: string in, string out. llm_query has no tools and no session. A spawned worker is the next rung, and only when the child needs its own repository. The host owns the budget. Cite Zhang, Kraska, and Khattab, MIT CSAIL, arXiv 2512.24601: more than an order of magnitude past the context window. Their RLM-Qwen3-8B beat base Qwen3-8B by a median of 28% and approached GPT-5 on three long-context tasks. Do not say 100x.",
    render: () => `
      <div class="slide">
        <div class="eyebrow">06 · RECURSIVE LANGUAGE MODELS · ZHANG, KRASKA, KHATTAB</div>
        <h2 class="slide-title">The prompt is a <span class="ink-block">Python variable</span></h2>
        <p class="lead">The root model sees the length and the shape, slices the variable, and calls itself with <code>llm_query</code>. Each answer comes back short. From the outside it is still one model.</p>
        <div class="grid-2">
          <div class="card framed">
            <span class="pill solid">THREE MOVES</span>
            <ul>
              <li><strong>Size, then slice.</strong> The corpus stays out of the window.</li>
              <li><strong>Call itself on one slice.</strong> No tools and no session.</li>
              <li><strong>Spawn later.</strong> Only when a child needs its own repository.</li>
            </ul>
          </div>
          <div class="card">
            <span class="pill">REPL</span>
            <div class="code-box" style="margin-top:14px;"><span class="cmt"># paths and sizes, file contents unread</span>
context.stats()
auth = context.select("src/auth/**").chunk(12000)

finding = llm_query(
    "Which auth checks are missing?",
    context=auth[0].labelled()
)
<span class="cmt"># RLMResponse(id='query-3', chars=340, preview='...')</span></div>
          </div>
        </div>
      </div>
    `
  },
  {
    id: "ladder",
    title: "The Recursion Ladder",
    time: "12:30 to 14:00",
    notes: "Open on L2 and stay there until the room can say what llm_query is. Then click L3: a spawned worker is a new session, and the host caps the tree. L4 is the product, sq factory describe --rlm. Click L0 and L1 only if someone asks how this differs from a normal tool loop.",
    render: () => `
      <div class="slide">
        <div class="eyebrow">07 · FROM LOOPS TO FULL AGENTS (INTERACTIVE)</div>
        <h2 class="slide-title">The Recursion Ladder</h2>
        <div class="ladder-wrap" style="margin-top:22px;">
          <div class="ladder-list" id="ladder-list">
            ${LADDER.map((item, i) => `
              <button class="ladder-item ${i === 2 ? "active" : ""}" data-ladder="${i}">
                <span class="ladder-badge">${item.level}</span>
                <div>
                  <div style="font-size:16px;font-weight:800;">${item.title}</div>
                  <div class="ladder-sub">${item.who}</div>
                </div>
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
          <span class="pill solid">${l.level} · ${l.title}</span>
          <h3 style="font-size:24px;">${l.who}</h3>
          <p>${l.detail}</p>
          <div class="code-box">${l.example}</div>
        `;
      };
      document.querySelectorAll("[data-ladder]").forEach((b) => b.addEventListener("click", () => renderLevel(Number(b.dataset.ladder))));
      renderLevel(2);
    }
  },
  {
    id: "swarms-vs-factories",
    title: "Swarms vs. Software Factories",
    time: "14:00 to 15:30",
    notes: "Swarms offer dynamic runtime decomposition; Software Factories offer isolation, repeatability, and verification. Recursive Prompt Engineering bridges both.",
    render: () => `
      <div class="slide">
        <div class="eyebrow">08 · THE 2026 DEBATE</div>
        <h2 class="slide-title">Agent Swarms vs. Software Factories? <span class="ink-block">Fuse Them.</span></h2>
        <div class="grid-3" style="margin-top:26px;">
          <div class="card">
            <span class="pill">SWARMS / SUPER-AGENTS</span>
            <h3 style="margin-top:14px;">Emergent &amp; Fast</h3>
            <ul>
              <li>Dynamic decomposition at runtime</li>
              <li>Zero upfront YAML authoring</li>
              <li><strong>Risk:</strong> Hard to audit, unrepeatable PR noise</li>
            </ul>
          </div>
          <div class="card inverted">
            <span class="pill inverted-pill">THE SYNTHESIS</span>
            <h3 style="margin-top:14px;">Recursive Prompt Systems</h3>
            <ul>
              <li>RLM compiles <strong>versioned specs</strong> on demand</li>
              <li>Router gates ambiguity &amp; coordinates workers</li>
              <li>Every run stays <strong>isolated and verified</strong></li>
            </ul>
          </div>
          <div class="card">
            <span class="pill">SOFTWARE FACTORIES</span>
            <h3 style="margin-top:14px;">Governed &amp; Verifiable</h3>
            <ul>
              <li>Versioned specs in Git</li>
              <li>Isolated worktrees &amp; hidden evaluators</li>
              <li><strong>Risk:</strong> Rigid to hand-author upfront</li>
            </ul>
          </div>
        </div>
      </div>
    `
  },
  {
    id: "failure-modes",
    title: "What Goes Wrong Without Boundaries",
    time: "15:30 to 16:45",
    notes: "Cite DeepSeek-Reasonix issue 2272, May 2026. One /autoresearch question spawned 12,744 subagents and 235,681,715 tokens. A nested skill bypassed a depth cap that lived in the tool list. Most tokens were cache hits, so the bill was about $3.40. The scare is the fan-out. Say that if someone asks about cost. The rule stands: the host owns depth and budget.",
    render: () => `
      <div class="slide">
        <div class="eyebrow">09 · FAILURE MODES</div>
        <h2 class="slide-title">When Nobody Owns the Stop Condition</h2>
        <div class="grid-2" style="margin-top:26px;">
          <div class="card inverted">
            <span class="pill inverted-pill">FAILURE MODE 1 · RECURSIVE EXPLOSION</span>
            <h3 style="font-size:38px;margin:16px 0 10px;">12,744 Sub-Agents</h3>
            <p>One question spawned <strong>12,744 child agents</strong> and 236 million tokens. A nested skill walked past a depth cap that lived in the tool list.</p>
            <p style="margin-top:14px;"><strong>Rule:</strong> The host owns depth and budget. Reasonix #2272.</p>
          </div>
          <div class="card framed">
            <span class="pill solid">FAILURE MODE 2 · THE “SLOP CANNON”</span>
            <h3 style="font-size:38px;margin:16px 0 10px;">100 PRs Nobody Trusts</h3>
            <p>Pushing ambiguous tickets straight to coding workers produces plausible diffs that miss product intent or silently modify auth and migrations.</p>
            <p style="margin-top:14px;"><strong>Rule:</strong> Gate ambiguity upfront and verify with hidden checks.</p>
          </div>
        </div>
      </div>
    `
  },
  {
    id: "five-laws",
    title: "The 5 Laws of Safe Recursion",
    time: "16:45 to 18:30",
    notes: "Practical architecture checklist for taking recursive prompt engineering into production tomorrow morning.",
    render: () => `
      <div class="slide">
        <div class="eyebrow">10 · PRACTICAL FRAMEWORK</div>
        <h2 class="slide-title">The 5 Laws of Safe Recursion</h2>
        <div class="grid-5" style="margin-top:26px;">
          <div class="card framed">
            <span class="pill solid">LAW 1</span>
            <h3 style="margin-top:12px;font-size:18px;">Read-only Mount</h3>
            <p style="font-size:14px;">Read-only mount. Name the secrets and checks you exclude.</p>
          </div>
          <div class="card framed">
            <span class="pill solid">LAW 2</span>
            <h3 style="margin-top:12px;font-size:18px;">Host Caps</h3>
            <p style="font-size:14px;">Depth, children, tokens, and time live in the runtime.</p>
          </div>
          <div class="card framed">
            <span class="pill solid">LAW 3</span>
            <h3 style="margin-top:12px;font-size:18px;">Two Gates</h3>
            <p style="font-size:14px;">Pause for an open spec, and again before ship.</p>
          </div>
          <div class="card framed">
            <span class="pill solid">LAW 4</span>
            <h3 style="margin-top:12px;font-size:18px;">Hidden Checks</h3>
            <p style="font-size:14px;">The agent never sees the acceptance probes.</p>
          </div>
          <div class="card inverted">
            <span class="pill inverted-pill">LAW 5</span>
            <h3 style="margin-top:12px;font-size:18px;">Stop and Sign</h3>
            <p style="font-size:14px;">Halt on budget or conflict. A human signs the release.</p>
          </div>
        </div>
      </div>
    `
  },
  {
    id: "interactive-gates",
    title: "Interactive: Conditional Human Gating",
    time: "18:30 to 19:30",
    notes: "Toggle live between Ambiguous Feature and Clear Bug Fix to show typed Triage routing: pause before coding when intent is open; take the fast path when scope is clear.",
    render: () => `
      <div class="slide">
        <div class="eyebrow">11 · STRATEGIC HUMAN GATES (LIVE TOGGLE)</div>
        <h2 class="slide-title">When Should the System Pause for a Human?</h2>
        <div class="rot-controls" style="margin-top:20px;">
          <button class="seg-btn active" data-gate="feature">Ambiguous Feature (needs-spec: true)</button>
          <button class="seg-btn" data-gate="bug">Clear Bug Fix (needs-spec: false)</button>
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
          ? `<span class="pill solid">TASK</span> <strong style="margin-left:10px;">“Add a summary report mode with optional filtering and sorting.”</strong>`
          : `<span class="pill solid">TASK</span> <strong style="margin-left:10px;">“Fix totals so repeated categories accumulate instead of overwriting.”</strong>`;
        document.getElementById("gate-pipeline").innerHTML = `
          <div class="stage-node">
            <span class="pill">1 · TRIAGE</span>
            <h3 style="margin-top:10px;font-size:17px;">Inspect &amp; Classify</h3>
            <p style="font-size:13.5px;margin-top:6px;">Outputs <code>needs-spec: ${isFeature}</code></p>
          </div>
          <div class="pipe-arrow">→</div>
          <div class="stage-node ${isFeature ? "active-gate" : "skipped"}">
            <span class="pill ${isFeature ? "inverted-pill" : ""}">2 · SPEC ${isFeature ? "(HUMAN GATE 1)" : "(SKIPPED)"}</span>
            <h3 style="margin-top:10px;font-size:17px;">${isFeature ? "Clarify &amp; Sign Off" : "Fast Path Skipped"}</h3>
            <p style="font-size:13.5px;margin-top:6px;">${isFeature ? "Asks questions and pauses BEFORE any code is written." : "Goes straight to implementation."}</p>
          </div>
          <div class="pipe-arrow">→</div>
          <div class="stage-node">
            <span class="pill">3 · IMPLEMENT</span>
            <h3 style="margin-top:10px;font-size:17px;">Isolated Worktree</h3>
            <p style="font-size:13.5px;margin-top:6px;">Applies bounded fix with risk &amp; proof skills.</p>
          </div>
          <div class="pipe-arrow">→</div>
          <div class="stage-node active-gate">
            <span class="pill inverted-pill">4 · VERIFY (HUMAN GATE 2)</span>
            <h3 style="margin-top:10px;font-size:17px;">Protected Verify &amp; Sign</h3>
            <p style="font-size:13.5px;margin-top:6px;">Hidden probes + 5-Dim Merge Risk + Visual Proof.</p>
          </div>
        `;
      };
      document.querySelectorAll("[data-gate]").forEach((b) => b.addEventListener("click", () => renderGate(b.dataset.gate)));
      renderGate("feature");
    }
  },
  {
    id: "demo",
    title: "Live Demo",
    time: "19:30 to 23:00",
    notes: "Cmd+Tab to SuperQode. Demo 1 is the RLM context engine: sq factory describe --rlm, Monty, read-only. It drafts a Factory spec and writes nothing until you apply it. Monty can run llm_query. It refuses rlm.run. Do not promise 90ms. Demo 2 is the other recursion, spawn_harness, with the host caps in local-recursive-dynamic.yaml. Say the two names out loud so the room does not merge them.",
    render: () => `
      <div class="slide">
        <div class="eyebrow">12 · LIVE DEMO</div>
        <h2 class="slide-title">Two recursions, <span class="ink-block">side by side</span></h2>
        <div class="grid-2" style="margin-top:26px;">
          <div class="card framed">
            <span class="pill solid">DEMO 1 · LLM_QUERY IN MONTY</span>
            <h3 style="margin-top:14px;">Inspect, then draft</h3>
            <ul>
              <li>Read-only repository in the <strong>Monty REPL</strong></li>
              <li>Detect stack, tests, and risky paths</li>
              <li>Draft a Factory spec you can edit</li>
              <li>Nothing runs until you apply it</li>
            </ul>
          </div>
          <div class="card tinted">
            <span class="pill">DEMO 2 · SPAWN_HARNESS CAPS</span>
            <h3 style="margin-top:14px;">A new session, host limits</h3>
            <div class="code-box" style="margin-top:10px;"><span class="cmt"># local-recursive-dynamic.yaml</span>
<span class="kw">recursion</span>:
  enabled: true
  max_depth: 1
  max_children: 8
  max_parallel: 2
  max_wall_seconds: 600
  write_policy: deny</div>
          </div>
        </div>
      </div>
    `
  },
  {
    id: "new-job",
    title: "The New Job of the Prompt Engineer",
    time: "23:00 to 24:15",
    notes: "Pause 5 seconds for audience photos. Summarize the mindset shift clearly: you design goals, constraints, verification criteria, and stop conditions.",
    render: () => `
      <div class="slide">
        <div class="eyebrow">13 · KEY TAKEAWAY</div>
        <h2 class="slide-title">The New Job of the Prompt Engineer</h2>
        <table class="compare-table" style="margin-top:24px;">
          <thead>
            <tr>
              <th>Manual Prompt Engineer (2023 to 2025)</th>
              <th>Recursive Prompt Engineer (2026+)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Writes Turn 1, Turn 2, Turn 15 by hand</td>
              <td>Defines <strong>Goal + Constraints + Ideal Outcome</strong></td>
            </tr>
            <tr>
              <td>Pastes files, docs, and logs into chat</td>
              <td>Keeps context as <strong>lazy data the model can slice</strong></td>
            </tr>
            <tr>
              <td>Babysits 3 to 5 chat tabs manually</td>
              <td>Runs <strong>Router-Worker Super-Agents</strong> that ping only when needed</td>
            </tr>
            <tr>
              <td>Hopes tests pass and skims huge diffs</td>
              <td>Enforces <strong>Hidden Evaluators &amp; 5-Dim Merge Risk</strong></td>
            </tr>
            <tr>
              <td>Discards chat history after merge</td>
              <td>Materializes <strong>Versioned Code &amp; Hard Stop Conditions</strong></td>
            </tr>
          </tbody>
        </table>
      </div>
    `
  },
  {
    id: "qa",
    title: "Thank You & Questions",
    time: "24:15 to 25:00",
    notes: "Clean, non-promotional closing slide. Thank LLMday London and open the floor for questions.",
    render: () => `
      <div class="slide" style="max-width:960px;">
        <div class="eyebrow">14 · Q&amp;A · LLMDAY LONDON 2026</div>
        <h1 class="hero-title" style="margin-top:12px;">
          Thank You.<br/>
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
  counterEl.textContent = `${pad(current + 1)} / ${pad(SLIDES.length)}`;
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
      <div class="grid-card-num">SLIDE ${pad(i + 1)} · ${s.time}</div>
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

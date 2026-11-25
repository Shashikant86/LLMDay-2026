/* ==========================================================================
   Recursive Prompt Engineering: Who Writes the Next Prompt?
   Shashi Jagtap · Superagentic AI · LLMday + Prompt Engineering London 2026
   Pure monochrome white-and-black editorial print aesthetic
   ========================================================================== */

const ERAS = [
  {
    num: "ERA 01",
    name: "Manual Prompts",
    who: "Human writes every single turn",
    summary: "Back-and-forth chat with a single LLM window. Works for one-off snippets, collapses on multi-file engineering.",
    limit: "Human becomes the copy-paste glue between terminal, IDE, and browser."
  },
  {
    num: "ERA 02",
    name: "Context Engineering",
    who: "Human + RAG / MCP connectors",
    summary: "Connect docs, code search, Jira, GitHub, and MCP servers so models pull real external context into the prompt.",
    limit: "Hits Context Rot: dumping more tools & logs dilutes signal and degrades reasoning."
  },
  {
    num: "ERA 03",
    name: "Harness Engineering",
    who: "Structured scaffold wraps the model",
    summary: "Design the runtime around the model: tool policies, sandboxes, compaction, permissions, memory, and observability.",
    limit: "Still mostly single-session — human still supervises 3–5 concurrent tabs manually."
  },
  {
    num: "ERA 04",
    name: "Super-Agents & Swarms",
    who: "Router / Super-Agent delegates briefs",
    summary: "Give a goal; always-on routers (like DeepSeek Harness Super-Agent) and swarms spawn isolated workers concurrently.",
    limit: "Without strict depth caps & verification, swarms can spiral or turn into a 'slop cannon'."
  },
  {
    num: "ERA 05",
    name: "Loop Engineering",
    who: "Outer feedback loop decides next step",
    summary: "Stop micro-managing how; design the verification signal, eval gate, and improvement loop that drives iteration.",
    limit: "Static pipelines are still tedious to hand-author for every unique repository."
  },
  {
    num: "ERA 06",
    name: "Recursive Prompt Engineering",
    who: "Agents write the next prompt inside hard bounds",
    summary: "Prompts & repos become inspectable data objects (RLMs). Agents inspect, decompose, spawn, and build governed systems at runtime.",
    limit: "Human shifts to defining Goals, Constraints, Verification Criteria & Stop Conditions."
  }
];

const LADDER = [
  {
    level: "L0",
    title: "Static Human Prompt",
    who: "Human writes Turn 1",
    detail: "Single instruction string sent to a model. Zero runtime adaptation, zero verification loop.",
    example: `prompt = "Fix the totals bug in app.py"`
  },
  {
    level: "L1",
    title: "Bounded Tool Loop (ReAct)",
    who: "Model appends tool outputs to one history",
    detail: "Single context window calls read/grep/bash in a loop. Degrades quickly as logs and diffs accumulate (context rot).",
    example: `while not done:\n    action = llm(history)\n    history.append(run_tool(action))`
  },
  {
    level: "L2",
    title: "Symbolic RLM (Context as Data)",
    who: "Root LM writes code & spawns llm_query() slices",
    detail: "Repository or 100k-line log stays outside the prompt as an RLMContext variable inside a sandboxed Python/Monty REPL.",
    example: `chunks = context.select("src/**/*.py").chunk(12000)\nfindings = llm_query_batched("Find auth checks", chunks)`
  },
  {
    level: "L3",
    title: "Recursive Sub-Agents & Super-Agents",
    who: "Control plane writes child briefs & spawns isolated workers",
    detail: "Router–Worker Super-Agents & bounded dynamic workflows spawn isolated child harnesses with narrowed scope and budgets.",
    example: `workflow("diagnose-ci", max_depth=1, max_children=4)\nstep("slice-logs", context_handle="file:ci.log", fanout=True, mode="read-only")`
  },
  {
    level: "L4",
    title: "On-Demand & Recursive Systems",
    who: "RLM compiles governed workflows as code at runtime",
    detail: "RLM inspects any repo read-only to compile validated multi-stage specs, checks, and skills on demand — keeping humans in charge of constraints and sign-off.",
    example: `sq factory describe --rlm  # Monty REPL -> validated spec + protected checks`
  }
];

const SLIDES = [
  {
    id: "title",
    title: "Recursive Prompt Engineering",
    time: "0:00 – 1:00",
    notes: "Hook the room immediately: ask who has spent an afternoon babysitting a coding agent turn by turn. State the thesis clearly: for 3 years, YOU wrote the next prompt. Today we examine what happens when agents write the next prompt — safely.",
    render: () => `
      <div class="slide hero-layout">
        <div>
          <div class="eyebrow">PROMPT ENGINEERING &amp; AGENTIC SYSTEMS · LONDON</div>
          <h1 class="hero-title">
            Recursive Prompt Engineering:<br/>
            <span class="ink-block">Who Writes the Next Prompt?</span>
          </h1>
          <p class="lead">
            Linking Recursive Language Models, DeepSeek’s Super-Agent harness architecture, dynamic agent spawning, and runtime verification — when humans no longer write every turn.
          </p>
          <div class="speaker-strip">
            <span class="pill solid">Shashi Jagtap</span>
            <span class="pill">Founder, Superagentic AI</span>
            <span class="pill">Everyman Canary Wharf · 26 Nov 2026</span>
          </div>
          <div class="hero-quote">
            “Stop babysitting every turn. Define the <strong>goal</strong>, <strong>constraints</strong>, <strong>verification criteria</strong>, and <strong>stop conditions</strong> — and let recursive systems write every prompt in between.”
          </div>
        </div>
        <div style="display:flex;justify-content:center;">
          <svg viewBox="0 0 360 360" width="330" height="330" role="img" aria-label="Recursive Prompt Engineering concentric print diagram">
            <circle cx="180" cy="180" r="160" fill="none" stroke="#0a0a0a" stroke-width="1.5" stroke-dasharray="5 5"/>
            <circle cx="180" cy="180" r="120" fill="#f7f7f7" stroke="#0a0a0a" stroke-width="1.5"/>
            <circle cx="180" cy="180" r="80" fill="#ffffff" stroke="#0a0a0a" stroke-width="2"/>
            <circle cx="180" cy="180" r="42" fill="#0a0a0a"/>
            <text x="180" y="176" text-anchor="middle" fill="#ffffff" font-size="14" font-weight="800" font-family="ui-monospace, monospace">GOAL</text>
            <text x="180" y="193" text-anchor="middle" fill="#d4d4d4" font-size="10" font-family="ui-monospace, monospace">+ BOUNDS</text>
            <text x="180" y="114" text-anchor="middle" fill="#0a0a0a" font-size="10.5" font-weight="700" font-family="ui-monospace, monospace">RLM · CONTEXT AS DATA</text>
            <text x="180" y="75" text-anchor="middle" fill="#0a0a0a" font-size="10.5" font-weight="700" font-family="ui-monospace, monospace">SUPER-AGENT ROUTER &amp; WORKERS</text>
            <text x="180" y="34" text-anchor="middle" fill="#525252" font-size="10.5" font-weight="700" font-family="ui-monospace, monospace">VERIFICATION &amp; STOP CONDITIONS</text>
            <rect x="175" y="15" width="10" height="10" fill="#0a0a0a"/>
            <rect x="295" y="175" width="10" height="10" fill="#0a0a0a"/>
            <rect x="175" y="335" width="10" height="10" fill="#0a0a0a"/>
            <rect x="55" y="175" width="10" height="10" fill="#0a0a0a"/>
          </svg>
        </div>
      </div>
    `
  },
  {
    id: "bottleneck",
    title: "The Attention Bottleneck",
    time: "1:00 – 2:30",
    notes: "Highlight why this matters right now: models are no longer the sole limiting factor. Human attention caps out at 3 to 5 concurrent agent chats. Babysitting Turn 1, Turn 2, Turn 14 is the real ceiling.",
    render: () => `
      <div class="slide">
        <div class="eyebrow">01 · THE SHIFT</div>
        <h2 class="slide-title">The bottleneck is no longer model intelligence.<br/><span class="ink-block">It is human attention.</span></h2>
        <p class="lead">Every manual follow-up prompt, stack trace paste, ticket split, and tab switch throttles autonomous systems down to human typing speed.</p>
        <div class="grid-2">
          <div class="card">
            <span class="pill">2023 – 2025 · MANUAL TURN LOOP</span>
            <h3 style="margin-top:14px;">Human as the Orchestrator</h3>
            <ul>
              <li>You write Turn 1, inspect output, write Turn 2, paste logs on Turn 3</li>
              <li>Human attention caps out supervising <strong>3–5 active sessions</strong></li>
              <li>Context-switching destroys deep engineering flow</li>
              <li>Knowledge stays trapped inside ephemeral chat transcripts</li>
            </ul>
          </div>
          <div class="card inverted">
            <span class="pill inverted-pill">2026+ · RECURSIVE EXECUTION</span>
            <h3 style="margin-top:14px;">Human as the Constraint Architect</h3>
            <ul>
              <li>You define the <strong>goal</strong>, <strong>constraints</strong>, and <strong>ideal outcome</strong></li>
              <li>Agents inspect context as data, generate child briefs, and delegate</li>
              <li>System speaks up <strong>only when human judgment is needed</strong></li>
              <li>Deterministic verification &amp; stop conditions protect the repo</li>
            </ul>
          </div>
        </div>
      </div>
    `
  },
  {
    id: "eras",
    title: "The 6 Eras of Prompt Engineering",
    time: "2:30 – 5:00",
    notes: "Click through all 6 eras on stage to narrate the progression: Manual Prompting -> Context Engineering -> Harness Engineering -> Super-Agents & Swarms -> Loop Engineering -> Recursive Prompt Engineering. Emphasize how each era lifted the human one level higher.",
    render: () => `
      <div class="slide">
        <div class="eyebrow">02 · EVOLUTION (INTERACTIVE)</div>
        <h2 class="slide-title">How Prompt Engineering Evolved in 6 Eras</h2>
        <p class="lead">Select any era to trace how control shifted from hand-crafted strings to runtime recursion.</p>
        <div class="era-tabs" id="era-tabs">
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
            <span class="pill solid">${e.num} · ${e.name}</span>
            <h3 style="font-size:25px;margin:14px 0 10px;">${e.summary}</h3>
            <p style="font-size:15px;color:#525252;"><strong>Ceiling:</strong> ${e.limit}</p>
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
    time: "5:00 – 6:30",
    notes: "Use the interactive buttons (12k -> 96k -> 420k tokens) to show why naively adding more MCP tools, logs, and files causes Context Rot. The model forgets what actually matters — losing the very value of Context Engineering.",
    render: () => `
      <div class="slide">
        <div class="eyebrow">03 · WHY CONTEXT ENGINEERING ALONE BREAKS</div>
        <h2 class="slide-title">Add enough tools &amp; logs and you hit <span class="ink-block">Context Rot</span></h2>
        <p class="lead">Stuffing entire repositories, dozens of MCP tool schemas, and raw CI traces into one flat window dilutes attention and spikes cost.</p>
        <div class="rot-controls">
          <button class="seg-btn" data-rot="0">12k tokens · Focused</button>
          <button class="seg-btn" data-rot="1">96k tokens · Noisy Tools + Logs</button>
          <button class="seg-btn active" data-rot="2">420k tokens · Context Rot</button>
        </div>
        <div class="grid-2">
          <div class="card framed" id="rot-card"></div>
          <div class="card tinted">
            <span class="pill solid">THE RLM INSIGHT</span>
            <h3 style="margin-top:14px;">Stop Treating Context as Text</h3>
            <ul>
              <li>Keep the 500k-line repo &amp; 50k-line CI log <strong>outside the prompt</strong></li>
              <li>Expose it as an inspectable data handle in a sandboxed REPL</li>
              <li>Let the model slice, grep, and query only what matters</li>
              <li>Return compact symbolic answers — never raw transcript dumps</li>
            </ul>
          </div>
        </div>
      </div>
    `,
    mount: () => {
      const states = [
        { label: "Clean Signal", signal: 92, note: "Model remembers constraints, tracks exact failing assertion, edits 1 file cleanly.", tokens: "12,000 tok · 1× cost" },
        { label: "Attention Drift", signal: 54, note: "25 MCP tool definitions + 3 full file reads push original goal to the middle of context.", tokens: "96,000 tok · 8× cost" },
        { label: "Severe Context Rot", signal: 18, note: "Agent forgets stop conditions, hallucinates passing checks, edits unrelated files, burns budget.", tokens: "420,000 tok · 35× cost" }
      ];
      const renderRot = (idx) => {
        const s = states[idx];
        document.querySelectorAll("[data-rot]").forEach((b, i) => b.classList.toggle("active", i === idx));
        document.getElementById("rot-card").innerHTML = `
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <span class="pill">${s.tokens}</span>
            <span style="font-family:var(--font-mono);font-weight:800;">${s.signal}% Effective Signal</span>
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
    time: "6:30 – 8:00",
    notes: "Transition to Harness Engineering: 'Language Models live inside scaffolds'. Performance in production is increasingly governed by the harness wrapping the model — tools, sandboxes, permissions, compaction, and evals.",
    render: () => `
      <div class="slide">
        <div class="eyebrow">04 · HARNESS ENGINEERING</div>
        <h2 class="slide-title">“Language Models Live Inside Scaffolds”</h2>
        <p class="lead">Before agents can safely write the next prompt, the <strong>harness</strong> must own execution boundaries, state, and verification.</p>
        <div class="grid-3">
          <div class="card framed">
            <span class="pill solid">01 · EXECUTION</span>
            <h3 style="margin-top:14px;">Sandboxes &amp; Worktrees</h3>
            <p>OS sandboxes, Monty / Docker REPLs, and isolated Git worktrees prevent agents from mutating your checkout silently.</p>
          </div>
          <div class="card framed">
            <span class="pill solid">02 · CONTEXT CONTROL</span>
            <h3 style="margin-top:14px;">Compaction &amp; Handles</h3>
            <p>Lazy corpus handles, selective reads, and structured summaries keep working memory small and sharp.</p>
          </div>
          <div class="card framed">
            <span class="pill solid">03 · GOVERNANCE</span>
            <h3 style="margin-top:14px;">Permissions &amp; Budgets</h3>
            <p>Host-owned caps on tokens, wall-clock time, tool calls, and credentials — never trusted to model self-restraint.</p>
          </div>
        </div>
      </div>
    `
  },
  {
    id: "deepseek-superagent",
    title: "DeepSeek Harness: Super-Agent Architecture",
    time: "8:00 – 10:30",
    notes: "Give DeepSeek's Harness (dsh) team full credit for their Super-Agent blueprint ('Exploring Super-agent Design'). Walk left-to-right across the Router-Worker architecture: Triggers -> Light Router (Control Plane: speaks only when a human must act) -> Isolated Ephemeral Workers (Execution Plane: ~40% faster p50) + Event-Sourced Storage & Watchdog recovery.",
    render: () => `
      <div class="slide">
        <div class="eyebrow">05 · DEEPSEEK HARNESS (dsh) · SUPER-AGENT ARCHITECTURE</div>
        <h2 class="slide-title">Always-On Control Plane, Isolated Execution Plane</h2>
        <p class="lead">DeepSeek’s Super-Agent blueprint replaces manual multi-tab babysitting with an OS-inspired <strong>Two-Layer Router–Worker</strong> fabric.</p>
        <div class="card framed" style="padding:18px 22px;margin-bottom:18px;">
          <svg viewBox="0 0 1120 232" width="100%" height="auto" role="img" aria-label="DeepSeek Harness Super-Agent Router-Worker Architecture">
            <!-- Triggers -->
            <rect x="10" y="22" width="210" height="154" fill="#f7f7f7" stroke="#0a0a0a" stroke-width="1.8"/>
            <text x="115" y="50" text-anchor="middle" fill="#0a0a0a" font-size="12.5" font-weight="800" font-family="ui-monospace, monospace">EVENT TRIGGERS</text>
            <line x1="28" y1="60" x2="202" y2="60" stroke="#d4d4d4" stroke-width="1"/>
            <text x="115" y="88" text-anchor="middle" fill="#262626" font-size="14">GitHub Issues &amp; PRs</text>
            <text x="115" y="114" text-anchor="middle" fill="#262626" font-size="14">CI / Test Failures</text>
            <text x="115" y="140" text-anchor="middle" fill="#262626" font-size="14">Chat &amp; Webhooks</text>

            <!-- Arrow -->
            <line x1="220" y1="99" x2="288" y2="99" stroke="#0a0a0a" stroke-width="2"/>
            <polygon points="288,93 300,99 288,105" fill="#0a0a0a"/>

            <!-- Light Router (Solid Ink Block) -->
            <rect x="302" y="14" width="290" height="170" fill="#0a0a0a" stroke="#0a0a0a" stroke-width="2"/>
            <text x="447" y="44" text-anchor="middle" fill="#d4d4d4" font-size="12" font-weight="700" font-family="ui-monospace, monospace">LIGHT ROUTER (CONTROL PLANE)</text>
            <text x="447" y="76" text-anchor="middle" fill="#ffffff" font-size="16" font-weight="800">Always-on human interface</text>
            <text x="447" y="104" text-anchor="middle" fill="#e5e5e5" font-size="13.5">Triages events · routes to sessions</text>
            <text x="447" y="128" text-anchor="middle" fill="#e5e5e5" font-size="13.5">Spawns &amp; coordinates workers</text>
            <rect x="328" y="144" width="238" height="26" fill="#ffffff"/>
            <text x="447" y="161" text-anchor="middle" fill="#0a0a0a" font-size="11.5" font-weight="800">“Speaks only when a person must act”</text>

            <!-- Arrows to workers -->
            <line x1="592" y1="62" x2="668" y2="44" stroke="#0a0a0a" stroke-width="1.8"/>
            <line x1="592" y1="99" x2="668" y2="99" stroke="#0a0a0a" stroke-width="1.8"/>
            <line x1="592" y1="136" x2="668" y2="154" stroke="#0a0a0a" stroke-width="1.8"/>

            <!-- Workers -->
            <rect x="672" y="18" width="218" height="48" fill="#ffffff" stroke="#0a0a0a" stroke-width="1.8"/>
            <text x="781" y="39" text-anchor="middle" fill="#0a0a0a" font-size="13" font-weight="800">Worker 1 · Bug Fix</text>
            <text x="781" y="56" text-anchor="middle" fill="#525252" font-size="11.5">Isolated context + sandbox</text>

            <rect x="672" y="75" width="218" height="48" fill="#ffffff" stroke="#0a0a0a" stroke-width="1.8"/>
            <text x="781" y="96" text-anchor="middle" fill="#0a0a0a" font-size="13" font-weight="800">Worker 2 · Feature PR</text>
            <text x="781" y="113" text-anchor="middle" fill="#525252" font-size="11.5">Concurrent (~40% faster p50)</text>

            <rect x="672" y="132" width="218" height="48" fill="#ffffff" stroke="#0a0a0a" stroke-width="1.8"/>
            <text x="781" y="153" text-anchor="middle" fill="#0a0a0a" font-size="13" font-weight="800">Worker N · Verification</text>
            <text x="781" y="170" text-anchor="middle" fill="#525252" font-size="11.5">Async checks &amp; evidence</text>

            <!-- Storage / Watchdog -->
            <rect x="914" y="18" width="196" height="162" fill="#f7f7f7" stroke="#0a0a0a" stroke-width="1.8" stroke-dasharray="5 3"/>
            <text x="1012" y="46" text-anchor="middle" fill="#0a0a0a" font-size="12" font-weight="800" font-family="ui-monospace, monospace">OS INFRASTRUCTURE</text>
            <text x="1012" y="78" text-anchor="middle" fill="#262626" font-size="13.5">Event-sourced logs</text>
            <text x="1012" y="104" text-anchor="middle" fill="#262626" font-size="13.5">Prefix-cache layer</text>
            <text x="1012" y="130" text-anchor="middle" fill="#262626" font-size="13.5">Watchdog recovery</text>
            <text x="1012" y="156" text-anchor="middle" fill="#262626" font-size="13.5">Storage / compute split</text>

            <text x="560" y="216" text-anchor="middle" fill="#525252" font-size="12.5" font-family="ui-monospace, monospace">
              DeepSeek Harness (dsh) · Exploring Super-agent Design: Towards a More Autonomous Agent System
            </text>
          </svg>
        </div>
        <div class="grid-3">
          <div class="card"><p><strong>Protects human attention:</strong> One control plane instead of 10 noisy chat tabs.</p></div>
          <div class="card"><p><strong>True concurrency:</strong> Ephemeral workers run in parallel without blocking you or each other.</p></div>
          <div class="card"><p><strong>Durable recovery:</strong> Watchdogs catch stalled loops, timeouts, and crashes asynchronously.</p></div>
        </div>
      </div>
    `
  },
  {
    id: "rlm",
    title: "Recursive Language Models (RLMs)",
    time: "10:30 – 12:30",
    notes: "Now bring in the second pillar: MIT CSAIL's Recursive Language Models (Alex Zhang, Tim Kraska & Omar Khattab). Explain how prompts and repos become Python variables inside a sandboxed REPL, enabling symbolic recursion via llm_query().",
    render: () => `
      <div class="slide">
        <div class="eyebrow">06 · RECURSIVE LANGUAGE MODELS (MIT CSAIL)</div>
        <h2 class="slide-title">Treat Prompts &amp; Repos as <span class="ink-block">Inspectable Objects</span></h2>
        <p class="lead">Instead of pushing megabytes into attention, an RLM mounts context inside a sandboxed Python REPL and calls itself recursively on exact slices.</p>
        <div class="grid-2">
          <div class="card framed">
            <span class="pill solid">THE RLM PATTERN</span>
            <h3 style="margin-top:14px;">Context as Data + Symbolic Recursion</h3>
            <ul>
              <li><strong>Lazy mounting:</strong> <code>len(context)</code> measures metadata without reading files</li>
              <li><strong>Programmatic slicing:</strong> Model writes Python to filter, grep, and chunk</li>
              <li><strong>Bounded sub-calls:</strong> <code>llm_query(question, chunk)</code> returns a compact handle</li>
              <li><strong>100× scale:</strong> Small 8B models inside RLM scaffolds rival monolithic frontier runs</li>
            </ul>
          </div>
          <div class="card">
            <span class="pill">SANDBOXED MONTY REPL</span>
            <div class="code-box" style="margin-top:14px;"><span class="cmt"># Repo mounted read-only; secrets &amp; evaluators masked</span>
stats = context.stats()            <span class="cmt"># 0 files read yet</span>
manifests = context.select("pyproject.toml", "package.json")
auth_chunks = context.select("src/auth/**").chunk(12000)

<span class="cmt"># Host-enforced budget &amp; provenance ledger</span>
risk = llm_query(
    "Identify auth boundaries and test commands",
    context=manifests.text()
)
<span class="cmt"># Returns RLMResponse(id='sub-1', chars=340) — no bloat</span></div>
          </div>
        </div>
      </div>
    `
  },
  {
    id: "ladder",
    title: "The Recursion Ladder",
    time: "12:30 – 14:00",
    notes: "Click down the 5 rungs (L0 to L4) to fulfill the abstract promise: showing how recursion evolves smoothly from single loops to full recursive agents and runtime-compiled workflows.",
    render: () => `
      <div class="slide">
        <div class="eyebrow">07 · FROM LOOPS TO FULL AGENTS (INTERACTIVE)</div>
        <h2 class="slide-title">The Recursion Ladder</h2>
        <p class="lead">Select any level to see how execution structure emerges at runtime — and who writes the next prompt.</p>
        <div class="ladder-wrap">
          <div class="ladder-list" id="ladder-list">
            ${LADDER.map((item, i) => `
              <button class="ladder-item ${i === 4 ? "active" : ""}" data-ladder="${i}">
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
      renderLevel(4);
    }
  },
  {
    id: "swarms-vs-factories",
    title: "Swarms vs. Software Factories",
    time: "14:00 – 15:30",
    notes: "Address the hottest 2026 architecture debate head-on: Agent Swarms vs. Software Factories. Show why choosing only one fails — and how Recursive Prompt Engineering bridges both.",
    render: () => `
      <div class="slide">
        <div class="eyebrow">08 · THE 2026 ARCHITECTURE DEBATE</div>
        <h2 class="slide-title">Agent Swarms vs. Software Factories? <span class="ink-block">Fuse Them.</span></h2>
        <p class="lead">Emergent runtime autonomy without verification creates chaos. Static pipelines without runtime intelligence create friction.</p>
        <div class="grid-3">
          <div class="card">
            <span class="pill">AGENT SWARMS / SUPER-AGENTS</span>
            <h3 style="margin-top:14px;">Emergent &amp; Fast</h3>
            <ul>
              <li>Dynamic decomposition at runtime</li>
              <li>Zero upfront YAML authoring</li>
              <li>Handles novel, messy problems</li>
              <li><strong>Risk:</strong> Hard to audit, unrepeatable, “slop cannon” PRs</li>
            </ul>
          </div>
          <div class="card inverted">
            <span class="pill inverted-pill">THE SYNTHESIS</span>
            <h3 style="margin-top:14px;">Recursive Prompt Systems</h3>
            <ul>
              <li>RLM inspects repo &amp; compiles <strong>versioned specs</strong> on demand</li>
              <li>Super-Agent router gates ambiguity &amp; coordinates workers</li>
              <li>Every spawned run stays <strong>isolated and verified</strong></li>
              <li>Improves itself via held-out eval suites</li>
            </ul>
          </div>
          <div class="card">
            <span class="pill">SOFTWARE FACTORIES</span>
            <h3 style="margin-top:14px;">Governed &amp; Verifiable</h3>
            <ul>
              <li>Versioned specs committed in Git</li>
              <li>Isolated worktrees &amp; hidden evaluators</li>
              <li>Deterministic verdicts &amp; signing</li>
              <li><strong>Risk:</strong> Rigid &amp; tedious to author by hand</li>
            </ul>
          </div>
        </div>
      </div>
    `
  },
  {
    id: "failure-modes",
    title: "What Goes Wrong Without Boundaries",
    time: "15:30 – 16:45",
    notes: "Tell the real 2026 cautionary story: unconstrained recursive agent spawning triggered 12,000+ child sub-agents from one prompt. And naive backlog automation turns into a PR 'slop cannon'. Autonomy without hard host boundaries is dangerous.",
    render: () => `
      <div class="slide">
        <div class="eyebrow">09 · REAL-WORLD FAILURE MODES</div>
        <h2 class="slide-title">When Nobody Owns the Stop Condition</h2>
        <p class="lead">Giving agents the power to write the next prompt without host-enforced boundaries fails in two predictable ways.</p>
        <div class="grid-2">
          <div class="card inverted">
            <span class="pill inverted-pill">FAILURE MODE 1 · RECURSIVE EXPLOSION</span>
            <h3 style="font-size:38px;margin:16px 0 10px;">12,000+ Sub-Agents</h3>
            <p>Real-world stress tests on unconstrained recursive agent loops bypassed soft prompt-based depth limits — cascading one prompt into <strong>12,000+ spawned child agents</strong> and hundreds of millions of tokens.</p>
            <p style="margin-top:14px;"><strong>Lesson:</strong> Depth caps and budgets cannot live inside the prompt. They must be enforced by the host runtime.</p>
          </div>
          <div class="card framed">
            <span class="pill solid">FAILURE MODE 2 · THE “SLOP CANNON”</span>
            <h3 style="font-size:38px;margin:16px 0 10px;">100 PRs Nobody Trusts</h3>
            <p>Pushing ambiguous tickets straight to coding workers produces plausible-looking diffs that break product intent, weaken tests, or silently touch auth &amp; migrations.</p>
            <p style="margin-top:14px;"><strong>Lesson:</strong> Velocity without upfront spec gates, hidden evaluators, and merge-risk visibility destroys team trust.</p>
          </div>
        </div>
      </div>
    `
  },
  {
    id: "five-laws",
    title: "The 5 Laws of Safe Recursion",
    time: "16:45 – 18:30",
    notes: "Give attendees the exact practical architecture checklist they can take back to work tomorrow morning. Every single one of these 5 laws is enforced in code inside SuperQode.",
    render: () => `
      <div class="slide">
        <div class="eyebrow">10 · PRACTICAL FRAMEWORK</div>
        <h2 class="slide-title">The 5 Laws of Safe Recursive Prompt Engineering</h2>
        <p class="lead">How to let agents decompose, spawn, and continue work — without surrendering control.</p>
        <div class="grid-5">
          <div class="card framed">
            <span class="pill solid">LAW 1</span>
            <h3 style="margin-top:12px;font-size:18px;">Context as Masked Data</h3>
            <p style="font-size:14px;">Mount repos read-only; exclude <code>.env</code>, keys, and protected evaluators before workers start.</p>
          </div>
          <div class="card framed">
            <span class="pill solid">LAW 2</span>
            <h3 style="margin-top:12px;font-size:18px;">Monotonic Budgets</h3>
            <p style="font-size:14px;">Host-owned <code>max_depth</code>, <code>max_children</code>, tokens &amp; wall-clock caps. Children never exceed parent authority.</p>
          </div>
          <div class="card framed">
            <span class="pill solid">LAW 3</span>
            <h3 style="margin-top:12px;font-size:18px;">Strategic Human Gates</h3>
            <p style="font-size:14px;">Gate <strong>ambiguity</strong> (Spec sign-off) and <strong>delivery</strong> (Ship sign-off) — never mundane intermediate turns.</p>
          </div>
          <div class="card framed">
            <span class="pill solid">LAW 4</span>
            <h3 style="margin-top:12px;font-size:18px;">Hidden Evaluators &amp; Risk</h3>
            <p style="font-size:14px;">Agents cannot see or edit acceptance probes. Deterministic verdicts + <strong>5-Dim Merge Risk</strong>.</p>
          </div>
          <div class="card inverted">
            <span class="pill inverted-pill">LAW 5</span>
            <h3 style="margin-top:12px;font-size:18px;">Hard Stop &amp; Signed Ship</h3>
            <p style="font-size:14px;">Fail closed on budget exhaustion or conflicts. Apply only after hardware-bound human release signature.</p>
          </div>
        </div>
      </div>
    `
  },
  {
    id: "interactive-gates",
    title: "Interactive: Conditional Human Gating",
    time: "18:30 – 19:30",
    notes: "Click between 'Ambiguous Feature' and 'Clear Bug Fix' live on stage! Show how Triage emits a typed contract (needs-spec: true/false) so clear bugs take the fast path while ambiguous features pause BEFORE a single line of code is written.",
    render: () => `
      <div class="slide">
        <div class="eyebrow">11 · STRATEGIC HUMAN GATES (LIVE TOGGLE)</div>
        <h2 class="slide-title">When Should the System Pause for a Human?</h2>
        <p class="lead">Toggle the incoming task below to see how typed Triage contracts dynamically route execution.</p>
        <div class="rot-controls">
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
          ? `<span class="pill solid">INCOMING TASK</span> <strong style="margin-left:10px;">“Add a summary report mode with optional filtering and sorting.”</strong> <span style="color:#525252;margin-left:8px;">→ Open product decisions detected.</span>`
          : `<span class="pill solid">INCOMING TASK</span> <strong style="margin-left:10px;">“Fix totals so repeated categories accumulate instead of overwriting.”</strong> <span style="color:#525252;margin-left:8px;">→ Scope is unambiguous.</span>`;
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
            <p style="font-size:13.5px;margin-top:6px;">${isFeature ? "Asks questions &amp; pauses BEFORE any code is written." : "Zero ceremony — goes straight to implementation."}</p>
          </div>
          <div class="pipe-arrow">→</div>
          <div class="stage-node">
            <span class="pill">3 · IMPLEMENT</span>
            <h3 style="margin-top:10px;font-size:17px;">Isolated Worktree</h3>
            <p style="font-size:13.5px;margin-top:6px;">Edits safely with <code>merge-risk</code> &amp; <code>ui-verification</code> skills.</p>
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
    time: "19:30 – 23:00",
    notes: "Switch to SuperQode macOS app (Cmd+Tab). DEMO 1 (90 sec, offline-proof!): Open a repository -> Build On-Demand Software Factory… -> show Monty REPL scanning lazily in ~90ms -> show detected stack, stages/agents, regression check, skills checkboxes -> click Apply & Edit Factory -> show workflow stages! DEMO 2 (optional): Show local-recursive-dynamic.yaml with host-enforced recursion caps.",
    render: () => `
      <div class="slide">
        <div class="eyebrow">12 · LIVE DEMO</div>
        <h2 class="slide-title">Recursive Prompt Engineering <span class="ink-block">in Practice</span></h2>
        <p class="lead">Goal + constraints + verification criteria — let the runtime inspect the repo, compose the workflow, and enforce stop conditions.</p>
        <div class="grid-2">
          <div class="card framed">
            <span class="pill solid">DEMO 1 · RUNTIME REPO INSPECTION (RLM)</span>
            <h3 style="margin-top:14px;">Zero Manual Boilerplate</h3>
            <ul>
              <li>Mount any repository read-only inside the <strong>Monty REPL</strong> (~90 ms)</li>
              <li>Detect stack, test commands, and high-risk paths lazily</li>
              <li>Auto-select stages, agent roles, skills, and human gates</li>
              <li>Materialize reviewable, editable YAML — nothing runs silently</li>
            </ul>
          </div>
          <div class="card tinted">
            <span class="pill">DEMO 2 · BOUNDED RECURSION SPEC</span>
            <h3 style="margin-top:14px;">Host-Enforced Limits</h3>
            <div class="code-box" style="margin-top:10px;"><span class="cmt"># examples/harnesses/local-recursive-dynamic.yaml</span>
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
    time: "23:00 – 24:15",
    notes: "Pause for 5 seconds on this slide — let attendees take a photo! Summarize the exact mindset shift: from typing prompts to designing goals, constraints, verification criteria, and stop conditions.",
    render: () => `
      <div class="slide">
        <div class="eyebrow">13 · KEY TAKEAWAY</div>
        <h2 class="slide-title">The New Job of the Prompt Engineer</h2>
        <p class="lead">No manual ticketing, no turn-by-turn babysitting, no manual process plumbing — you engineer the system’s constraints and truth criteria.</p>
        <table class="compare-table">
          <thead>
            <tr>
              <th>Manual Prompt Engineer (2023–2025)</th>
              <th>Recursive Prompt Engineer (2026+)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Writes Turn 1, Turn 2, Turn 15 by hand</td>
              <td>Defines <strong>Goal + Constraints + Ideal Outcome</strong></td>
            </tr>
            <tr>
              <td>Pastes files, docs &amp; stack traces into chat</td>
              <td>Exposes <strong>Context as Lazy, Masked Data (RLM)</strong></td>
            </tr>
            <tr>
              <td>Supervises 3–5 chat tabs manually</td>
              <td>Runs <strong>Router–Worker Super-Agents</strong> that ping only when needed</td>
            </tr>
            <tr>
              <td>Hopes tests pass &amp; skims huge diffs</td>
              <td>Enforces <strong>Hidden Evaluators, Deterministic Verdicts &amp; Merge Risk</strong></td>
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
    time: "24:15 – 25:00",
    notes: "Clean, non-promotional closing slide. Thank LLMday London and open the floor for questions on RLMs, DeepSeek's Super-Agent architecture, recursion guardrails, and verification.",
    render: () => `
      <div class="slide" style="text-align:left;max-width:960px;">
        <div class="eyebrow">14 · Q&amp;A · LLMDAY LONDON 2026</div>
        <h1 class="hero-title" style="margin-top:8px;">
          Thank You.<br/>
          <span class="ink-block">Questions?</span>
        </h1>
        <p class="lead" style="margin-top:18px;">
          The future isn’t writing better prompts one turn at a time — it is engineering recursive systems that know when to decompose, when to ask a human, how to verify their work, and when to stop.
        </p>
        <div style="border-top:2px solid #0a0a0a;padding-top:20px;margin-top:32px;display:flex;flex-wrap:wrap;gap:14px;align-items:center;">
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
      <div class="grid-card-meta">${s.notes.slice(0, 88)}…</div>
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

// Button bindings
document.getElementById("prev-btn").addEventListener("click", prev);
document.getElementById("next-btn").addEventListener("click", next);
notesBtn.addEventListener("click", toggleNotes);
document.getElementById("notes-close").addEventListener("click", toggleNotes);
document.getElementById("grid-btn").addEventListener("click", () => toggleGrid());
document.getElementById("grid-close").addEventListener("click", () => toggleGrid(false));
document.getElementById("fs-btn").addEventListener("click", toggleFullscreen);
timerBtn.addEventListener("click", toggleTimer);

// Keyboard shortcuts
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

// Touch swipe support
let touchX = 0;
document.addEventListener("touchstart", (e) => { touchX = e.changedTouches[0].clientX; }, { passive: true });
document.addEventListener("touchend", (e) => {
  const dx = e.changedTouches[0].clientX - touchX;
  if (Math.abs(dx) > 60) dx < 0 ? next() : prev();
}, { passive: true });

// Initial load from hash
buildGrid();
const hashMatch = location.hash.match(/^#slide-(\d+)$/);
const startIdx = hashMatch ? Number(hashMatch[1]) - 1 : 0;
go(startIdx);

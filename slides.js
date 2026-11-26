/* ==========================================================================
   Recursive Prompt Engineering: Who Writes the Next Prompt?
   Shashi Jagtap · Superagentic AI · LLMday + Prompt Engineering London 2026
   Clean monochrome white-and-black editorial print deck
   ========================================================================== */

const ERAS = [
  { short: "Prompt", side: "you", who: "Engineer", line: "The engineer writes every turn." },
  { short: "Context", side: "you", who: "Engineer", line: "The engineer selects what enters the window." },
  { short: "Harness", side: "you", who: "Engineer", line: "The engineer sets the limits before the run." },
  { short: "Loop", side: "it", who: "Loop", line: "The loop writes the next action." },
  { short: "Swarms", side: "it", who: "Router", line: "A router writes the worker brief." },
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
    time: "0:00 to 0:45",
    notes: "Do not open on the thesis. The title is the destination. Walk the field first: prompt engineering, context engineering, harness engineering, loop engineering, agent swarms. Then context degradation, the Recursive Language Models paper, the call pattern, then recursive prompting and the stricter techniques. Ask who has written a prompt today only if the room is cold. Stay under a minute.",
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
    id: "prompt-engineering",
    title: "Prompt Engineering",
    time: "0:45 to 2:00",
    notes: "The original craft. You sit in the chat and write every turn: who the model is, the one job, and the shape of the answer. Examples when the form matters. The only point of this slide: the human held the pen. Stay under a minute.",
    render: () => `
      <div class="slide">
        <div class="eyebrow">Discipline · 01</div>
        <h2 class="slide-title">Prompt Engineering</h2>
        <p class="lead">Each turn is authored by the engineer: role, task, and output contract.</p>
        <div class="grid-3">
          <div class="card framed"><h3>System Role</h3><p>The identity assigned to the model for this turn.</p></div>
          <div class="card framed"><h3>Task Statement</h3><p>One job, stated in one sentence.</p></div>
          <div class="card framed"><h3>Output Contract</h3><p>Examples, and the required shape of the answer.</p></div>
        </div>
      </div>
    `
  },
  {
    id: "context-engineering",
    title: "Context Engineering",
    time: "2:00 to 3:15",
    notes: "The prompt stopped being one sentence. You choose the files, the tools, and what is allowed to persist. You still write the instruction, and you still choose the window. If someone says RAG: yes, retrieval is context engineering. So is the system prompt, the tool list, and the memory file. Do not teach context rot here. That failure comes after the map.",
    render: () => `
      <div class="slide">
        <div class="eyebrow">Discipline · 02</div>
        <h2 class="slide-title">Context Engineering</h2>
        <p class="lead">The window is assembled. The engineer selects the corpus, the tools, and persistent state.</p>
        <div class="grid-3">
          <div class="card framed"><h3>Source Corpus</h3><p>The files admitted into the window.</p></div>
          <div class="card framed"><h3>Tool Interface</h3><p>The calls the model is permitted to make.</p></div>
          <div class="card framed"><h3>Persistent State</h3><p>The memory retained across turns.</p></div>
        </div>
      </div>
    `
  },
  {
    id: "harness",
    title: "Harness Engineering",
    time: "3:15 to 4:30",
    notes: "Before the model is allowed to act, you build the scaffold. Sandbox so the checkout stays isolated. Memory as handles and short summaries, not dumps of the repo. Budget so depth, time, and tokens live in the host, not in the model's manners. The harness does not write the next prompt. It holds the limits. That is why it comes before the loop.",
    render: () => `
      <div class="slide">
        <div class="eyebrow">Discipline · 03</div>
        <h2 class="slide-title">Harness Engineering</h2>
        <p class="lead">The model executes inside a scaffold. Limits are fixed before the run starts.</p>
        <div class="grid-3">
          <div class="card framed"><h3>Execution Sandbox</h3><p>The checkout stays isolated from the host.</p></div>
          <div class="card framed"><h3>Context Handles</h3><p>Short summaries, not a dump of the repository.</p></div>
          <div class="card framed"><h3>Resource Budget</h3><p>Depth, time, and tokens are enforced by the host.</p></div>
        </div>
      </div>
    `
  },
  {
    id: "loop-engineering",
    title: "Loop Engineering",
    time: "4:30 to 5:45",
    notes: "Now the pen moves. One window. The model returns an action, the tool result is appended, and the same history is sent back. You stop typing every follow-up. You still own the goal and the stop. Read the three lines if the room is technical. If not, the sentence is enough: the loop writes the next action.",
    render: () => `
      <div class="slide">
        <div class="eyebrow">Discipline · 04</div>
        <h2 class="slide-title">Loop Engineering</h2>
        <p class="lead">One context window. The loop emits the next action. The engineer owns the objective and the stop condition.</p>
        <div class="card">
          <div class="code-box">while not done:
    action = llm(history)
    history.append(run_tool(action))</div>
        </div>
      </div>
    `
  },
  {
    id: "agent-swarms",
    title: "Agent Swarms",
    time: "5:45 to 7:15",
    notes: "A swarm is not a bigger loop. Events arrive. One router writes a brief. Workers run in isolated sessions and do not speak to you. Concrete case, say it as preliminary and move on. DeepSeek Harness super-agent, 31 Oct 2026. Their scheduling test, five runs, timer workload: system p50 12.4 min versus about 20.4 min for a single session that never delegated. The workers themselves are not 40% faster. One router, isolated workers. This is a different mechanism from a recursive language model. That concept is two slides away.",
    render: () => `
      <div class="slide">
        <div class="eyebrow">Discipline · 05</div>
        <h2 class="slide-title">Agent Swarms</h2>
        <p class="lead">A router assigns the work. Worker sessions do not address the user.</p>
        <div class="grid-3">
          <div class="card"><h3>Event Ingress</h3><p>Issues, CI, and chat arrive at the router.</p></div>
          <div class="card inverted"><h3>Router Agent</h3><p>A single agent writes each worker brief.</p></div>
          <div class="card"><h3>Worker Sessions</h3><p>Isolated runs. They do not address the user.</p></div>
        </div>
      </div>
    `
  },
  {
    id: "eras",
    title: "Field Progression",
    time: "7:15 to 8:15",
    notes: "Recap only. Do not re-teach. Amber means you. Blue means the system. Click Prompt, Context, Harness: you hold the pen or the scaffold. Click Loop, then Swarms: the system writes the next action or the worker brief. Land on Recursive and do not explain it. Say that this is the next slide. The slope is the field we just walked.",
    render: () => `
      <div class="slide">
        <h2 class="slide-title">Field Progression</h2>
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
    title: "Context Degradation",
    time: "8:15 to 9:00",
    notes: "This is the limit of context engineering, and the reason for the next slide. Click Small, then Noisy, then Full. Adding tools and logs degrades reasoning and burns cost. The flat prompt fails before the window is full. Say: so keep the corpus outside the prompt. Do not explain how yet.",
    render: () => `
      <div class="slide">
        <h2 class="slide-title">Context Degradation</h2>
        <p class="lead">Added tools and logs displace the objective. Keep the corpus outside the prompt.</p>
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
        { label: "Stable", signal: 92, line: "Constraints stay intact." },
        { label: "Drift", signal: 54, line: "Tools and logs displace the objective." },
        { label: "Failure", signal: 18, line: "The model edits the wrong files." }
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
    id: "rlm-paper",
    title: "Recursive Language Models",
    time: "9:00 to 10:15",
    notes: "Zhang, Kraska, and Khattab, MIT CSAIL, arXiv 2512.24601. Point at the link. The prompt is stored outside the window. The model inspects length and shape, decomposes the input, and calls itself on slices. Two results only: inputs up to two orders of magnitude past the context window, at comparable cost; RLM-Qwen3-8B beat Qwen3-8B by 28.3% on average and approached GPT-5 on three long-context tasks. Do not say 100x. Do not walk the benchmark table. The next slide is the call pattern.",
    render: () => `
      <div class="slide">
        <div class="eyebrow">Zhang, Kraska, Khattab · MIT CSAIL</div>
        <h2 class="slide-title">Recursive Language Models</h2>
        <p class="lead">The prompt is an external environment. The model inspects it, decomposes it, and calls itself on each slice.</p>
        <a class="text-link" href="https://arxiv.org/abs/2512.24601" target="_blank" rel="noopener">arxiv.org/abs/2512.24601</a>
        <div class="grid-3">
          <div class="card framed"><h3>External Prompt</h3><p>The input stays outside the context window. The root call sees shape, not the full text.</p></div>
          <div class="card framed"><h3>Recursive Call</h3><p>The model decomposes the prompt and calls itself on each slice.</p></div>
          <div class="card inverted"><h3>Measured Result</h3><p>Quality holds past the context window, at comparable cost. RLM-Qwen3-8B gains 28.3% over the base model.</p></div>
        </div>
      </div>
    `
  },
  {
    id: "rlm",
    title: "External Context Variable",
    time: "10:15 to 11:15",
    notes: "The call pattern, after the paper. An ordinary prompt puts the whole input in the window. A recursive language model stores the prompt as a variable. The root model sees the length and the shape, writes code to slice it, and calls itself with llm_query. From outside it is still one model: string in, string out. llm_query has no tools and no session. A spawned worker is the next rung, and only when the child needs its own repository. The host owns the budget.",
    render: () => `
      <div class="slide">
        <div class="eyebrow">Call pattern</div>
        <h2 class="slide-title">External Context Variable</h2>
        <p class="lead">The root model reads the shape, selects a slice, and issues a sub-call. From outside it is still one model.</p>
        <div class="card">
          <div class="code-box">context.stats()
auth = context.select("src/auth/**")
llm_query("Which checks are missing?", context=auth.text())</div>
        </div>
      </div>
    `
  },
  {
    id: "recursive-prompting",
    title: "Recursive Prompting",
    time: "11:15 to 12:15",
    notes: "Name the practice now that the room has the map and the mechanism. Recursive prompting means the system writes the next prompt. You write the goal, the constraints, and the stop. The bottleneck was never the model. Human attention caps at about 3 to 5 concurrent chats, and manual follow-ups throttle the system to typing speed. The loop, the router, and the recursive language model are three ways the next prompt gets written. You show up when depth, budget, or judgment requires you. The next slide is the stricter technique.",
    render: () => `
      <div class="slide">
        <div class="eyebrow">Practice</div>
        <h2 class="slide-title">Recursive Prompting</h2>
        <p class="lead">The system writes the next prompt. The engineer returns at the stop condition.</p>
        <div class="grid-3">
          <div class="card framed"><h3>Objective</h3><p>The engineer names the outcome and the constraints.</p></div>
          <div class="card framed"><h3>Generated Prompt</h3><p>The loop, the router, or the model writes the next turn.</p></div>
          <div class="card inverted"><h3>Attention Bound</h3><p>Three to five concurrent sessions is the human limit.</p></div>
        </div>
      </div>
    `
  },
  {
    id: "ladder",
    title: "Recursion Levels",
    time: "12:15 to 13:30",
    notes: "This is the advanced technique. Open on llm_query and stay there until the room can say what it is. Then click Spawn: a new session, and the host caps the tree. Compile is the product, sq factory describe --rlm. Click Prompt and Loop only if someone asks how this differs from a normal tool loop. From here: factory designs, operating constraints, the approval gate, then the demo.",
    render: () => `
      <div class="slide">
        <div class="eyebrow">Technique</div>
        <h2 class="slide-title">Recursion Levels</h2>
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
    title: "Swarm and Factory Designs",
    time: "13:30 to 14:30",
    notes: "A swarm decomposes work at runtime. A software factory is not one settled definition. Say that out loud: everyone has their own definition. In short, it is an agent on the native SDLC. Verification stays in the middle: isolation and checks on every run.",
    render: () => `
      <div class="slide">
        <h2 class="slide-title">Swarm and Factory Designs</h2>
        <p class="lead">A swarm decomposes work at runtime. A factory runs an agent on the software lifecycle.</p>
        <div class="grid-3">
          <div class="card"><h3>Agent Swarm</h3><p>Work is decomposed at runtime.</p></div>
          <div class="card inverted"><h3>Verification</h3><p>Each run stays isolated and checked.</p></div>
          <div class="card"><h3>Software Factory</h3><p>Definitions differ. In short, an agent on the native SDLC.</p></div>
        </div>
      </div>
    `
  },
  {
    id: "five-laws",
    title: "Operating Constraints",
    time: "14:30 to 15:45",
    notes: "The production constraints. Read them left to right. Read-only scope is named in the host. Depth, time, and tokens are host limits, not model manners. Open specifications pause, and release pauses again. Probes stay hidden from the agent. The last gate is a human signature. SuperGauge, next to SuperQode, is the record of that decision.",
    render: () => `
      <div class="slide">
        <h2 class="slide-title">Operating Constraints</h2>
        <p class="lead">Limits enforced by the host, not by the model.</p>
        <div class="grid-5">
          <div class="card framed"><h3>Read-Only Scope</h3><p>Name what the run cannot mutate.</p></div>
          <div class="card framed"><h3>Host Limits</h3><p>Depth, time, and tokens live in the runtime.</p></div>
          <div class="card framed"><h3>Checkpoints</h3><p>Pause on an open spec, and again before release.</p></div>
          <div class="card framed"><h3>Hidden Probes</h3><p>Evaluation probes stay invisible to the agent.</p></div>
          <div class="card inverted"><h3>Sign-Off</h3><p>The final release gate is a human signature.</p></div>
        </div>
      </div>
    `
  },
  {
    id: "interactive-gates",
    title: "Approval Policy",
    time: "15:45 to 16:45",
    notes: "Toggle live between Ambiguous Feature and Clear Bug Fix to show typed Triage routing: pause before coding when intent is open; take the fast path when scope is clear.",
    render: () => `
      <div class="slide">
        <h2 class="slide-title">Approval Policy</h2>
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
            <h3 style="font-size:18px;">${isFeature ? "Clarify" : "Bypass"}</h3>
          </div>
          <div class="pipe-arrow">→</div>
          <div class="stage-node">
            <h3 style="font-size:18px;">Implement</h3>
          </div>
          <div class="pipe-arrow">→</div>
          <div class="stage-node active-gate">
            <h3 style="font-size:18px;">Approve</h3>
          </div>
        `;
      };
      document.querySelectorAll("[data-gate]").forEach((b) => b.addEventListener("click", () => renderGate(b.dataset.gate)));
      renderGate("feature");
    }
  },
  {
    id: "demo",
    title: "Recursion Modes",
    time: "16:45 to 21:15",
    notes: "Cmd+Tab to SuperQode. Demo 1 is the RLM context engine: sq factory describe --rlm, Monty, read-only. It drafts a Factory spec and writes nothing until you apply it. Monty can run llm_query. It refuses rlm.run. Do not promise 90ms. Demo 2 is the other recursion, spawn_harness, with the host caps in local-recursive-dynamic.yaml. Say the two names out loud so the room does not merge them.",
    render: () => `
      <div class="slide">
        <h2 class="slide-title">Recursion Modes</h2>
        <p class="lead">Two mechanisms. Do not merge them.</p>
        <div class="grid-2">
          <div class="card framed">
            <h3>Sub-Query</h3>
            <p><code>llm_query</code> is read-only. It drafts a spec. Nothing runs until the engineer applies it.</p>
          </div>
          <div class="card tinted">
            <h3>Session Spawn</h3>
            <p><code>spawn</code> opens a new session. The host caps depth on the tree.</p>
          </div>
        </div>
      </div>
    `
  },
  {
    id: "new-job",
    title: "Engineering Responsibilities",
    time: "21:15 to 22:15",
    notes: "Pause 5 seconds for audience photos. Summarize the mindset shift clearly: you design goals, constraints, verification criteria, and stop conditions.",
    render: () => `
      <div class="slide">
        <h2 class="slide-title">Engineering Responsibilities</h2>
        <table class="compare-table" style="margin-top:28px;">
          <thead>
            <tr>
              <th>Manual workflow</th>
              <th>Agent-native workflow</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Each turn is authored by hand</td>
              <td>The objective and constraints are specified once</td>
            </tr>
            <tr>
              <td>The repository is pasted into the prompt</td>
              <td>The prompt is held as an external variable</td>
            </tr>
            <tr>
              <td>Output is accepted on inspection</td>
              <td>The diff is signed at the release gate</td>
            </tr>
          </tbody>
        </table>
      </div>
    `
  },
  {
    id: "still-early",
    title: "Field Maturity",
    time: "22:15 to 23:15",
    notes: "This one is yours. Do not read it. The software lifecycle is changing. Software factories and agent swarms are the names showing up for automating that lifecycle. Say that we are still learning, and that we are early. No product names on this slide. SuperQode is next, then questions.",
    render: () => `
      <div class="slide">
        <div class="eyebrow">Current state</div>
        <h2 class="slide-title">Field Maturity</h2>
        <p class="lead">The software lifecycle is being automated. Factory and swarm designs are early, and unsettled.</p>
        <div class="grid-3">
          <div class="card framed"><h3>Software Factories</h3><p>Specify the work, execute it, and verify it.</p></div>
          <div class="card framed"><h3>Agent Swarms</h3><p>Agents decompose the work and write the next brief.</p></div>
          <div class="card inverted"><h3>Open Problems</h3><p>The designs are not settled. The field is early.</p></div>
        </div>
      </div>
    `
  },
  {
    id: "superqode",
    title: "SuperQode",
    time: "23:15 to 24:15",
    notes: "This slide is SuperQode and SuperGauge. Say SuperQode is a research-focused tool, then point at superqode.dev. Second link: SuperGauge, an open record of the release decision, super-agentic.ai/super-gauge. Read both URLs. Architecture is the harness around the model. Recursive agents: a child looks at one slice. Recursive prompting: the system writes the next prompt. Software factories: design the run, measure it, and sign it. Do not install anything. Company links, including GitHub, stay on the next slide.",
    render: () => `
      <div class="slide">
        <div class="eyebrow">Research system</div>
        <h2 class="slide-title">SuperQode</h2>
        <p class="lead">The harness for recursive agents, recursive prompting, and software factories.</p>
        <a class="site-link" href="https://superqode.dev" target="_blank" rel="noopener">superqode.dev</a>
        <a class="text-link" href="https://super-agentic.ai/super-gauge" target="_blank" rel="noopener">SuperGauge · super-agentic.ai/super-gauge</a>
        <div class="grid-2">
          <div class="card framed"><h3>Superagent Architecture</h3><p>The harness around the model.</p></div>
          <div class="card framed"><h3>Recursive Agents</h3><p>A child session inspects one slice of the work.</p></div>
          <div class="card framed"><h3>Recursive Prompting</h3><p>The system writes the next prompt.</p></div>
          <div class="card framed"><h3>Software Factories</h3><p>Design the run, measure it, and sign it.</p></div>
        </div>
      </div>
    `
  },
  {
    id: "qa",
    title: "Questions",
    time: "24:15 to 25:00",
    notes: "Thank LLMday London and open the floor. Leave the links up: Superagentic AI, github.com/SuperagenticAI, super-agentic.ai, and SuperGauge. SuperQode was the previous slide.",
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
          <a class="pill" href="https://super-agentic.ai" target="_blank" rel="noopener">super-agentic.ai</a>
          <a class="pill" href="https://super-agentic.ai/super-gauge" target="_blank" rel="noopener">SuperGauge</a>
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
  if (counterEl) counterEl.textContent = "";
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
  notesBtn?.classList.toggle("active", open);
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
  if (!timerDisplay) return;
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
    timerBtn?.classList.remove("active");
    return;
  }
  timerBtn?.classList.add("active");
  timerInterval = setInterval(() => {
    timerSeconds = Math.max(0, timerSeconds - 1);
    timerDisplay.textContent = `${pad(Math.floor(timerSeconds / 60))}:${pad(timerSeconds % 60)}`;
  }, 1000);
}

document.getElementById("prev-btn").addEventListener("click", prev);
document.getElementById("next-btn").addEventListener("click", next);
notesBtn?.addEventListener("click", toggleNotes);
document.getElementById("notes-close").addEventListener("click", toggleNotes);
document.getElementById("grid-btn")?.addEventListener("click", () => toggleGrid());
document.getElementById("grid-close").addEventListener("click", () => toggleGrid(false));
document.getElementById("fs-btn")?.addEventListener("click", toggleFullscreen);
timerBtn?.addEventListener("click", toggleTimer);

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

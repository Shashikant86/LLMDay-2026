# Recursive Prompt Engineering: Who Writes the Next Prompt?

Interactive white-and-black editorial presentation website for **LLMday + Prompt Engineering Conference London (Q4 2026 · Everyman Canary Wharf)** by **Shashi Jagtap** (Founder, Superagentic AI).

## Features
- **Zero dependencies & 100% offline-proof:** Open `index.html` directly in any browser on stage. Works even without venue Wi-Fi.
- **Interactive slides:** Clickable 6-Era Prompt Evolution timeline, live Context Rot signal meter, interactive 5-level Recursion Ladder, DeepSeek Harness (`dsh`) Super-Agent Router-Worker diagram, and live Conditional Human Gate toggle (`Ambiguous Feature` vs. `Clear Bug`).
- **Built-in Presenter Controls:**
  - `→` / `←` / `Space`: Next / previous slide
  - `F`: Fullscreen mode
  - `N`: Toggle speaker notes & timing drawer
  - `G`: Slide overview grid
  - `T`: 25-minute countdown timer

## Run Locally
```bash
open index.html
# or serve locally
python3 -m http.server 8080
```

## Publish on GitHub Pages
1. Create a GitHub repo (e.g. `recursive-prompt-engineering-london-2026`) and push:
   ```bash
   git remote add origin git@github.com:SuperagenticAI/recursive-prompt-engineering-london-2026.git
   git push -u origin main
   ```
2. In GitHub **Settings -> Pages**, set **Source** to **GitHub Actions** (the included `.github/workflows/pages.yml` deploys automatically on every push to `main`).

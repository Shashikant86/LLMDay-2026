# Recursive Prompt Engineering: Who Writes the Next Prompt?

[![Slides](https://img.shields.io/badge/Slides-GitHub%20Pages-111111?style=flat-square)](https://shashikant86.github.io/LLMDay-2026/)

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
The deck is published from [Shashikant86/LLMDay-2026](https://github.com/Shashikant86/LLMDay-2026). `.github/workflows/pages.yml` deploys `main` to GitHub Pages on every push. The Pages source must be **GitHub Actions**.

Live slides: [shashikant86.github.io/LLMDay-2026](https://shashikant86.github.io/LLMDay-2026/)

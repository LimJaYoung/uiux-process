# Project Status: UIUX Process / AI Portfolio Course

Last updated: 2026-05-18

## 1. Current Goal

This site is being refocused into a course platform for UIUX and product designers who want to complete a high-quality portfolio with AI.

Core promise:

> UIUX / product designers complete the full journey from planning to deployment with clear AI prompts and produce portfolio-ready work.

The intended learning journey is:

1. Planning
2. UX structure
3. UI design
4. AI-assisted coding
5. QA
6. Deployment
7. Portfolio case study

The site should not be framed only around Claude. It can mention Claude, Codex, n8n, and other AI tools where useful, but the broader theme is AI-assisted product/portfolio completion for designers.

## 2. Design Direction

The design reference remains Awesomic.com.

Important visual principles:

- Use Awesomic-style large editorial sections, card mosaics, wide layouts, and restrained black/white/gray palette.
- Do not invent random card styles.
- Avoid drifting away from the originally planned learning/product narrative.
- Section widths, spacing, and card rhythm should feel consistent.
- Portfolio and proof sections should use horizontal infinite marquee-style card movement.

Must-follow section layout references:

- `designer-ai-section` / `디자이너에게 유용한 AI`
  - Use the Awesomic-style `.container-1344` wide editorial layout.
  - This section should feel like a practical designer AI workflow board, not a generic feature grid.

- `designer-reference-section` / `디자이너를 위한 레퍼런스`
  - Use the Awesomic-style `.container-1344` wide editorial layout.
  - References should be framed as design decision material: what to extract, compare, and apply.

- `level-process-section` / `레벨에 맞는 프로세스`
  - Use an Awesomic `.services-tabs`-inspired layout.
  - Keep the levels as Beginner, Intermediate, and Advanced.
  - Beginner: simple MVP course.
  - Intermediate: harness-style production course.
  - Advanced: harness plus n8n automation course.

## 3. Repository / Local State

Workspace:

```text
/Users/limjayoung/Documents/New project
```

Git remote:

```text
origin https://github.com/LimJaYoung/uiux-process.git
```

Current branch:

```text
main
```

Latest visible commits:

```text
33ba2d6 Merge branch 'main' of https://github.com/LimJaYoung/uiux-process
df36f03 Update daily AI design content
2ae0b2d Update daily AI design content
b3bc5a6 Polish hero and portfolio process sections
59eebed Apply Nexon Gothic to hero lede
```

Current working tree has uncommitted changes:

```text
M index.html
M script.js
M styles.css
```

These changes have not yet been QA-tested visually, committed, pushed, or deployed.

## 4. What Was Requested For Revision 3

The user said the 1st and 2nd planning revisions drifted and the content flow no longer has a clear beginning, middle, and end. The 3rd revision should keep the current structure, remove unnecessary sections, and then add the new sections sequentially.

### Sections to remove

Remove these sections from the home page:

- `section.posts-section`
- `section.owner-diagnosis-section`
- `section.portfolio-services.team-portfolio-section`
- `section.personal-brand-section`
- `section.course-diagnosis-section`
- `section.method-section`
- `section.roadmap-section` / `.roadmap.roadmap-detailed`
- `section.prompt-gallery`

### Sections to keep

Keep the main structure and existing useful sections:

- Hero
- Start / guide banner
- Student portfolio service strip
- Portfolio process
- Proof strip
- Daily curation / automation section
- Production flow / completion steps
- Resources
- Testimonials
- FAQ
- Final CTA
- Footer

### Sections to add

After removing the unnecessary sections, add these in sequence:

1. `디자이너에게 유용한 AI`
   - Layout reference: `.container-1344`
   - Purpose: AI tools and workflows useful to designers.

2. `디자이너를 위한 레퍼런스`
   - Layout reference: `.container-1344`
   - Purpose: reference sites and how to use them as design decision material.

3. `레벨에 맞는 프로세스`
   - Layout reference: `.services-tabs`
   - Beginner / Intermediate / Advanced process.
   - Beginner: simple MVP course.
   - Intermediate: harness-style production course.
   - Advanced: harness + n8n automation course.

## 5. Current Implementation Status

The worker agent modified the files before being stopped for being too slow.

Observed from the current HTML:

- Deleted sections are no longer present in `index.html`.
- New sections are present:
  - `designer-ai-section`
  - `designer-reference-section`
  - `level-process-section`
- `portfolio-process-grid` has been changed to use a `.marquee-track`.
- `proof-strip` has been changed to a card marquee layout.
- Level process tabs were added with `data-level-tabs`, `data-level-tab`, and `data-level-panel`.
- Old portfolio process drag/prev-next script was removed.
- New level tab script was added.
- `prompt-gallery` has been removed per latest user instruction.
- `designer-ai-section` and `designer-reference-section` were tightened around `.container-1344` Awesomic-style wide editorial card mosaics.
- `level-process-section` now uses a `.services-tabs`-inspired tab layout with Beginner, Intermediate, and Advanced outputs.
- The old `초급·중급·고급 코스 모듈` framing has been replaced with a shared `완성까지 필요한 제작 단계` production flow so level choice does not conflict with the completion steps.
- Connected pages were aligned to the same planning model:
  - `diagnosis.html` now recommends a production-flow start point rather than a separate course.
  - `orientation.html`, `guide.html`, and lesson pages now describe the shared production flow instead of separate difficulty-based courses.
  - Lesson page meta labels now reinforce the common flow: Planning, UX Structure, UI Design, AI Build, QA, Launch, Workflow.
- AI tool detail pages were added and linked from `designer-ai-section`:
  - `ai-chatgpt.html`
  - `ai-claude.html`
  - `ai-codex.html`
  - `ai-stitch.html`
  - `ai-higgsfield.html`
  - `ai-perplexity-n8n.html`
  - `ai-midjourney.html`
  - `ai-figma-ai.html`
- The AI recommendation cards should be framed as task-based tool combinations, not one-tool-per-task claims. For example, planning and research can use ChatGPT, Claude, and Perplexity together.
- The AI recommendation cards now use Awesomic-inspired large stage numbers (`01`-`08`) so the tool combinations read as a step-by-step designer workflow.

Current section order in `index.html`:

1. Hero
2. `service-strip`
3. `portfolio-process-section`
4. `guide-banner`
5. `proof-strip`
6. `designer-ai-section`
7. `designer-reference-section`
8. `level-process-section`
9. `content-automation-section`
10. `curriculum` / shared production flow
11. `resources`
12. `testimonial-section`
13. `faq-section`
14. `final-home-cta`
15. Footer

## 6. Checks Already Run

These passed:

```text
node --check script.js
git diff --check
```

The local server on port `4173` was not running. Attempting to start `python3 -m http.server 4173` inside the sandbox failed with a permission error, and the approval request was rejected. Because of this, visual QA was not completed.

## 7. Known Risks / Needs Review

Before continuing, verify these carefully:

- The marquee sections should not create horizontal page scroll.
- `portfolio-process-grid` and `proof-strip` should loop smoothly and visually match the Awesomic-inspired card rhythm.
- The new `designer-ai-section` and `designer-reference-section` should not feel generic or disconnected from the original course narrative.
- `level-process-section` tabs should work correctly.
- CSS still contains some old selectors for removed sections, such as:
  - `.owner-diagnosis-section`
  - `.posts-section`
  - `.personal-brand-section`
  - `.course-diagnosis-section`
  - `.roadmap-detailed`
  These may be harmless if unused, but should be cleaned up later if time allows.
- The current changes should be visually reviewed in browser before commit/push/deploy.

## 8. Recommended Next Steps

1. Open the project in a fresh Codex project/thread.
2. Inspect the current uncommitted diff in:
   - `index.html`
   - `styles.css`
   - `script.js`
3. Run local QA:
   - Start a local static server if possible.
   - Open `index.html`.
   - Check desktop and mobile widths.
   - Confirm there is no horizontal body scroll.
   - Confirm marquee movement is smooth.
   - Confirm level tabs work.
4. If visual quality is weak, assign a senior UIUX worker to refine only:
   - `designer-ai-section`
   - `designer-reference-section`
   - `level-process-section`
   - marquee card styling
5. Run:

```text
node --check script.js
git diff --check
```

6. Commit after QA passes:

```text
git add index.html styles.css script.js project-status.md
git commit -m "Refine homepage flow for third revision"
```

7. Push and deploy only after visual QA:

```text
git push origin main
npx vercel@latest --prod --yes
```

## 9. Product Director Notes

Do not restart the strategy from scratch.

The user wants the existing structure preserved, unnecessary sections removed, and the new sections inserted sequentially. The most important thing is to restore narrative flow:

1. What this course is
2. What kind of portfolio students can make
3. What process they follow
4. What proof / outcomes exist
5. What AI and references help them
6. Which level process they should choose
7. How they continue through shared production steps, resources, and curation

The next agent should move quickly, avoid broad rewrites, and treat Awesomic.com as the visual quality bar.

## 10. Beginner MVP Page Update

- Added `beginner-mvp.html` from the downloaded `prompt-guide-beginner-mvp.html` source.
- Preserved the useful original flow and prompt content:
  - AI start/session prompt
  - item selection
  - research and competitor analysis
  - HMW/problem definition
  - solution/value proposition
  - UX journey/IA/screen spec
  - implementation prompt
  - GitHub/Vercel deployment
  - case study and interview answers
- Corrected confusing or stale wording:
  - `Claude 설치` became `AI 시작하기`, because Claude and ChatGPT are web tools.
  - exact paid-plan pricing was removed to avoid stale information.
  - AI research now explicitly asks students to verify current facts and numbers.
  - implementation stage now recommends using Claude/ChatGPT for drafts and Codex for file edits/QA.
- Connected entry points:
  - homepage Beginner card
  - homepage Beginner level panel
  - diagnosis Beginner recommendation
  - resources page

## 11. Container 1344 Homepage Alignment

- Updated the `.container-1344` homepage sections so they connect directly to the Beginner MVP page content.
- `designer-ai-section` now frames AI tools around Beginner MVP stages:
  - item selection
  - research
  - problem definition
  - UX documentation
  - first screen draft
  - implementation
  - deployment/case study
- `designer-reference-section` now explains reference collection as MVP decision support, not generic visual collection.
- `level-process-section` Beginner panel now points to the copied-prompt flow:
  - Claude/ChatGPT for item, research, problem definition
  - Stitch/Figma AI for first screen/state references
  - Codex for implementation, QA, and Vercel deployment

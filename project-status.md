# Project Status: UIUX Process / AI Portfolio Course

Last updated: 2026-05-19

## Current Snapshot

- Production deployment: https://claude-lab-seven.vercel.app
- Latest Vercel deployment: https://claude-e1whc597q-limjayoungs-projects.vercel.app
- Homepage typography pass is complete for the current iteration: main `h2` titles use `NexonLv2Gothic`, key feature-card headings use the same Korean-first type system, and selected emphasis words use smaller block spans.
- `proof-strip` was removed from the homepage flow. The portfolio awards marquee now sits after the guide banner.
- Main homepage sections currently flow as: hero, graduate portfolio strip, guide banner, portfolio awards marquee, designer AI workflow, designer reference board, level process, curation feed, FAQ, final CTA.
- Final CTA has extra bottom spacing for visual breathing room before the footer.

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
D:\uiux-process\New project
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
- Added direct `beginner-mvp.html` anchor links throughout `.container-1344` cards so users can jump into the relevant Beginner MVP page sections:
  - `#item`
  - `#research`
  - `#problem`
  - `#ux`
  - `#build`
  - `#deploy`
  - `#checklist`

## 12. Intermediate Page Update

- Added `intermediate.html` from the downloaded `prompt-guide-intermediate.html` source.
- Preserved the original Intermediate flow:
  - SKILL 4종
  - 에이전트팀 구성
  - PRD 문서 제작
  - 레퍼런스 분석
  - tokens.css 생성
  - Design.md 작성
  - SKILL + Design.md 통합
  - 화면 구현 & QA
  - 포트폴리오 케이스 스터디
- Converted the standalone dark HTML guide into the existing site detail-page pattern using `detail-hero`, `detail-layout`, `detail-toc`, `detail-content`, and `prompt-box`.
- Connected entry points:
  - homepage Intermediate card
  - homepage Intermediate level panel
  - diagnosis Intermediate recommendation
  - resources page
- Updated diagnosis copy for Intermediate so it points to SKILL, PRD, Design.md, and QA rather than only structure/design.

## 13. Advanced Page Update

- Added `advanced.html` from the downloaded `prompt-guide-advanced.html` source.
- Preserved the original Advanced flow:
  - parallel agents
  - coordinator SKILL
  - automation SKILL
  - n8n setup
  - 3 core n8n workflows
  - n8n + Claude/API integration
  - GitHub Actions auto deploy
  - Claude Code / Codex project instructions
  - Advanced case study
- Converted unstable wording into safer guidance:
  - exact model names become current-model placeholders where needed
  - n8n plan details are framed as something to verify before use
  - API keys are always stored in Credentials or GitHub Secrets, never in code
- Connected entry points:
  - homepage Advanced card
  - homepage Advanced level panel
  - diagnosis Advanced recommendation
  - resources page

## 14. Designer Reference Section Update

- Reworked `designer-reference-section` after layout review.
- Homepage now follows the `designer-ai-section` card-board pattern:
  - 1 featured reference guide card
  - 8 curated category cards
  - category-specific CTA links into `designer-reference-sites.html`
- Added `designer-reference-sites.html` as the detailed archive page.
- The detail page contains:
  - 8 reference categories
  - 79 total site cards
  - category quick links
  - site name, URL, free/freemium/paid badge, description, and tags
- Categories included:
  - 디자인 영감
  - 인터랙티브 요소
  - Design System & Design.md
  - 애니메이션
  - 영상 레퍼런스
  - design.md 모두 골라!
  - 타이포그래피
  - 컬러 & 에셋
- Added dedicated responsive CSS for the reference catalog while keeping the `.container-1344` section structure.

## 15. Current Handoff Notes - 2026-05-20 10:21 KST

### Conversation Context

- User was frustrated because previous changes were made too quickly without enough planning/design checking.
- Important user instruction for the next chat:
  - Do not blindly paste standalone Claude-generated page styling into this site.
  - Always compare against `index.html` layout and existing CSS patterns before editing.
  - Preserve the useful interaction/content structure from attachments, but restyle to match the current site.
  - Avoid broad, unrelated changes. Keep edits tightly scoped.

### Uncommitted Files Right Now

- Modified:
  - `index.html`
  - `diagnosis.html`
  - `script.js`
  - `styles.css`
- New/untracked:
  - `harness-uiux-automatic.html`

### Guide Banner Direction

- `guide-banner` should no longer duplicate `level-process-section`.
- It should be a short entry point for **내 AI활용능력 진단하기**.
- Current homepage banner copy now frames the diagnostic around:
  - AI tool usage
  - prompt design
  - workflow integration
  - portfolio storytelling
- `level-process-section` remains the place for actual level/path selection.

### Diagnosis Page Direction

- Source attachment referenced by user:
  - `C:\Users\J.영\Downloads\ai-diagnosis.html`
- Useful structure from that attachment:
  - 12 questions
  - 4 score areas:
    - AI 툴 활용
    - 프롬프트 설계
    - 워크플로우 통합
    - 포트폴리오 연결
  - 5 levels:
    - Lv.1 탐색자
    - Lv.2 실험자
    - Lv.3 적용자
    - Lv.4 통합자
    - Lv.5 선도자
  - Result recommendations by level
- Current `diagnosis.html` was replaced with a site-integrated version using `data-ai-diagnosis`.
- Current `script.js` contains the quiz logic near the top:
  - question rendering
  - choice scoring
  - result calculation
  - recommendation rendering
  - result copy button
- `node --check script.js` has passed after the latest edits.

### Diagnosis Design Corrections Already Made

- User objected that the first imported diagnostic design looked like the Claude standalone dark app and did not match this website.
- Latest CSS changes in `styles.css` attempt to align `.ai-diagnosis-page` with the existing site:
  - page background changed back to white
  - large card background uses `#f4f4f5`, inspired by `.hero-panel`
  - shell uses the 1280 site container width
  - quiz/result width no longer constrained to 900px
  - section/card spacing added
  - `.ai-choice-list` text enlarged to match homepage card typography
  - diagnosis buttons restyled to match `.hero-actions .button`
- User specifically asked:
  - `.ai-diagnosis-page` page background should not be gray
  - the card itself should be gray like `hero-panel`
  - cards should fill the 1280 area, not feel narrow
  - section spacing should be added
  - `.ai-choice-list` text was too small
  - buttons should use `.hero-actions` style

### Important Styling References

- Reference existing patterns before making more changes:
  - `.hero-panel`
  - `.hero-actions`
  - `.button`, `.button.primary`, `.button.secondary`
  - `.designer-tool-card h3`
  - `.designer-tool-card p`
  - `.level-panel`
  - `.container-1344`
- Avoid:
  - dark standalone app styling on `diagnosis.html`
  - purple/teal gradient-heavy UI
  - tiny form-like text in diagnostic choices
  - pill buttons that do not match homepage buttons
  - narrow centered diagnostic cards unless the user explicitly asks for that

### Level Process / Anchor Fix

- User reported that “레벨별 프로세스 보기” seemed to move to `designer-reference-section`.
- Link itself is `index.html#level-process`.
- Added anchor scroll correction:
  - `html { scroll-padding-top: 112px; }`
  - `main > section.level-process-section { scroll-margin-top: 112px; }`
- If the issue persists, inspect actual rendered scroll position in browser rather than assuming the href is wrong.

### Harness UIUX Automatic Work

- Added new level tab/panel in `index.html`:
  - `Harness UIUX Automatic`
  - detail page link: `harness-uiux-automatic.html`
- Added new file:
  - `harness-uiux-automatic.html`
- Added generic detail tab JS in `script.js` for `[data-detail-tabs]`.
- Added related CSS for:
  - `.detail-tabs-shell`
  - `.detail-tab-list`
  - `.detail-tab`
  - `.harness-flow-grid`
  - `.harness-method-grid`
- User did not ask to remove this work, but next agent should verify whether it still fits the intended information architecture before expanding it.

### Caution for Next Chat

- Before editing further, first state what section/file will be touched and why.
- For visual changes, inspect existing `index.html` and `styles.css` nearby patterns before writing CSS.
- Prefer CSS overrides scoped to the relevant section rather than changing global site behavior.
- Do not undo user/previous dirty changes unless explicitly asked.

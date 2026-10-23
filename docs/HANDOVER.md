# Handover — School of Ethics

_Last updated: 2026-10-22_

## Where things stand

- **Platform**: Vue 3 proof-of-concept, live at **https://schoolofethics-73280.web.app**. Implements the full participant flow (scenario → initial decision → AI advice → final decision → complete) for the platform's 2 embedded scenarios (`src/data/scenario.js`): *The Confidential Design Disclosure* (contested) and *The Community Grid Deployment* (high-consensus). Dissent condition set via `?dissent=visible` / `?dissent=hidden`.
- **Ethics approval**: MUHREC Project ID 53838 — approval still pending (see `docs/ENG_FIT_4701_2.tex`, Section III-A). No participant data has been collected yet.
- **Paper**: `docs/ENG_FIT_4701_2.tex` (IEEEtran). Stages 1–4 of the development process (requirements, personas, prototype design, prototype implementation) are marked complete in the paper; stage 5 (survey design) is drafted; stages 6–8 (ethics approval, running the study, analysis) are outstanding.

## What happened this session

1. Built out a 10-case external ethics scenario bank (`ideas/Our Scenario Bank (formatted).docx`) — 6 existing + 4 new NSPE cases, all reformatted to a consistent Source/Context/Dilemma/Options/Ethical Decision structure. **Not yet wired into the platform** — `src/data/scenario.js` still only has the original 2 scenarios.
2. Identified the 5 source orgs used across that bank: ACS/CSIRO, Royal Academy of Engineering, Online Ethics Center (UVA), NSPE, Engineers Australia.
3. Built a Google Apps Script (given to you in-chat, not committed to the repo) that generates a draft participant consent + reflection Google Form. You ran it from a **personal** Google account (school account had permission issues) and copied it into your Monash Drive manually.
   - **Outstanding**: the form is still full of `[PLACEHOLDER]` text (researcher names, MUHREC approval number, platform URL, timing estimates) — not ready to send to anyone yet. Also worth checking against the official MUHREC consent/explanatory-statement templates already sitting in `docs/all google docs/.../Ethics and templates/Templates/` — your custom form may need to match that structure for ethics approval.
4. Set up Firebase Hosting (`firebase.json`, `.firebaserc`) and deployed the platform to https://schoolofethics-73280.web.app. Redeploy with `npm run build && npx firebase-tools deploy --only hosting`.
5. Updated `README.md` with the deployment section and current project structure.

## Likely next steps

- Fill in the Google Form placeholders and reconcile it with the MUHREC templates in `docs/`.
- Decide whether/how the 10-case external scenario bank feeds into the platform (it's currently just a reference document, not loaded by the app).
- Continue chasing MUHREC approval (Project ID 53838) — everything else (survey piloting, recruitment, data analysis) is blocked on this per the paper's Section V.
- LaTeX paper: see starter prompt below.

## Starter prompt for next LaTeX session

```
I'm working on docs/ENG_FIT_4701_2.tex for my FIT4701/2 project (multi-agent AI
ethics-training platform studying dissent visibility and over-reliance). Read the
current draft and docs/ENG_FIT_4701_2.bib first.

Context: MUHREC ethics approval (Project ID 53838) is still pending, so no
participant data exists yet — the paper currently reports completed design/
build artifacts (requirements, personas, prototype, 2-scenario bank) rather than
results. There are a few [REF] placeholders still in the text that need real
citations.

What I want to work on today: <fill in — e.g. "find citations for the [REF]
placeholders in the Introduction", "tighten Section IV", "draft the Semester 2
timeline for Section V">
```

# Handover — School of Ethics

_Last updated: 2026-10-23_

## Where things stand

- **Platform**: Vue 3 proof-of-concept on branch `latex-refinement` (last commit `389332f`, one file still uncommitted — see below). Participant flow: Google Form (info + consent) → platform (scenario choice → two scenarios, each with initial decision → AI advice → final decision → in-platform expert-reference feedback) → back to the same Google Form for the post-task survey (demographics, Jian et al. trust scale, reflection, scenario-quality ratings).
- **Dissent-visibility design**: now a **randomised, counterbalanced within-subjects** manipulation (`src/App.vue`, `assignConditionOrder()`/`conditionForPosition()`). Every participant gets one scenario dissent-hidden and one dissent-visible; which scenario gets which is a coin flip at session start, independent of which scenario content they choose to start with. There is **no participant-facing toggle** — the old "choose whether to view perspectives" opt-in mechanic was removed this session (it would have broken the causal comparison via self-selection).
- **Mock advice data**: `src/data/agentResponses.js` was fixed this session — the contested scenario's Safety and Risk + Professional Ethics agents now converge on a genuinely _incorrect_ option (D), with Stakeholder Impact dissenting to an acceptable one (B). Before this fix, both scenarios' "overall" AI recommendation was already inside the acceptable range, so RO1 (over-reliance on incorrect advice) was **silently unmeasurable** in the build — this was caught by an adversarial fact-check, not visible from reading the paper alone.
- **Trust scale (RO4)**: dropped as a formal research objective. The Jian et al. 12-item scale is **not** in the platform and **not** in the local `docs/all google docs/GoogleForm.js` script — you added it directly to the **live** Google Form through the Forms UI. ⚠️ **Operational risk**: if `createSchoolOfEthicsForm()` in that script is ever re-run, it will generate a fresh form _without_ the trust scale, since the script was never updated to match. Either update the script to match the live form, or make a note never to re-run it.
- **Deployment**: the live site (https://schoolofethics-73280.web.app) has **not** been redeployed since today's `App.vue`/`AdviceScreen.vue`/`agentResponses.js`/`InstructionsScreen.vue` changes. Redeploy with `npm run build && npx firebase-tools deploy --only hosting` before relying on the live URL for anything (demos, the MUHREC advertisement's QR code, piloting).
- **Ethics approval**: MUHREC Project ID 53838, still pending. You've recently updated the advertisement (now correctly says "2" scenarios), the explanatory statement (Supabase/Firestore contradiction resolved — now consistently "Firestore," though that storage layer isn't actually built in `src/firebase/firebase.js` yet), and moved/renamed several files in `docs/all google docs/.../Ethics and templates/`.
- **Paper**: `docs/ENG_FIT_4701_2 (1).tex` — note the filename still has the `(1)` suffix from however it got here (likely an Overleaf re-download). **This should be renamed back to `docs/ENG_FIT_4701_2.tex` before final submission** — nothing depends on the exact name functionally, but it's a loose end worth closing. One edit (today's redundancy trims, see below) is uncommitted on disk.

## What happened this session (2026-10-23)

1. Replaced the old self-selected "view AI perspectives or skip" dissent mechanic with randomised, counterbalanced within-subjects assignment — fixed a real confound (self-selection breaks the causal comparison the paper's RQ depends on).
2. Moved RO4/the trust-in-automation scale fully off the platform and onto the external Google Form; updated every paper section that referenced it (Methodology, Results, Conclusion) to describe the _actual_ location and sequencing (platform feedback happens first, survey — including trust scale — happens after, on return to the form).
3. Resolved four `[REF]` placeholders and wove five previously-uncited `.bib` entries into the literature review; added two new real citations (Ji et al. 2023 on hallucination, the NSPE Board of Ethical Review page) and two more (Dawson et al. 2019 CSIRO/Data61, Royal Academy of Engineering 2011) to correct an inaccurate "grounded only in Engineers Australia" framing in the lit review.
4. Ran three independent background audits against the paper: rubric compliance, adversarial fact-check vs. the actual codebase/docs, and citation accuracy. Findings and fixes:
   - **Critical bug found and fixed**: mock advice data meant RO1 was unmeasurable (see above).
   - **Citation error found and fixed**: `klingbeil2024trustreliance` was cited for trust/reliance _divergence_; the actual paper found they _correlate_. Reworded the claim.
   - Fixed a real contradiction between Section II ("was validated against" the external scenario bank) and Section III-C ("remains subject to formal validation").
   - Removed unused `natbib` package and an orphan, never-cited bib entry (`mitnews2026ainews`).
   - Fixed `InstructionsScreen.vue`'s stale copy describing the old opt-in mechanic.
5. Trimmed redundant prose for the 4-page limit (which, per the teaching team via the forum, **includes the bibliography** — not excluded as the rubric PDF's wording suggested). Defined "the EA Code" short form, cut several sentences that were pure restatements of earlier ones, and compressed Section IV-A's re-derivation of logic already covered in III-C. **Not yet re-verified against an actual compile** — last known count before this trim pass was "just over 4 pages, with bib entries 7–16 spilling onto page 5."

## Final sweep checklist

- [ ] **Recompile in Overleaf and confirm the page count.** If still over 4 pages (bibliography included), the next place to cut is the Section III-A development-stage list — it's the most itemized/verbose block left untouched. Don't cut Section III-E (Experimental Controls and Risks) — it's doing real work for the Methodology rubric score.
- [ ] **Rename `docs/ENG_FIT_4701_2 (1).tex` back to `docs/ENG_FIT_4701_2.tex`** (and the corresponding `git mv`).
- [ ] Only _after_ the page count is confirmed under budget: decide whether there's room for one compact **table** (not a diagram — diagrams cost more space than they're worth right now) — e.g. a scenario × role × recommendation table could replace some existing prose rather than purely add to it.
- [ ] Reconcile remaining cross-document inconsistencies in the MUHREC materials (none of these affect the paper directly, but worth closing before submission):
  - Eligibility: advertisement excludes "NOT a Malaysian citizen"; explanatory statement excludes "Malaysian or Indonesian citizenship."
  - Timing: advertisement says "10 Minutes"; explanatory statement says "approximately 15 minutes."
  - Author affiliation: paper says "Department of Software Engineering"; MUHREC documents list "Department of Human Centred Computing" — confirm which is correct and make them consistent.
- [ ] Independently confirm the real MUHREC application status before the paper calls it "in the final stages" (III-A) — a supervision transcript suggested the Chief Investigator was only starting the application as of 2026-10-20; worth a quick check that this phrase is still accurate.
- [ ] `README.md` is stale (still describes "no backend... hardcoded mock data," predates expert-reference feedback, randomised condition assignment, and JSON session logging). Not paper-critical, but worth a pass since it's the project's front door.
- [ ] A separate, diverged copy of the paper exists at `docs/docs/ENG_FIT_4701_2.tex` on branch `feature/ROfulfilment` (which also has an unmerged trust-scale implementation and the earlier non-counterbalanced randomization). Not urgent, but don't accidentally edit or review that copy instead of this one.

## Starter prompts for the final-sweep session

**Prompt 1 — compile-and-trim loop:**

```
I'm doing the final sweep on docs/ENG_FIT_4701_2.tex for my FIT4701/2 Initial
Paper before submission. Read docs/HANDOVER.md first for full context. I need
to confirm the paper is within the 4-page limit, which includes the
bibliography (confirmed by the teaching team, overriding the rubric PDF's
ambiguous wording).
```

**Prompt 2 — final consistency + rubric re-check:**

```
Read docs/HANDOVER.md for context, then docs/ENG_FIT_4701_2.tex,
docs/ENG_FIT_4701_2.bib, and the rubric at
docs/all google docs/ENG4701 Week 12 Initial Paper Rubric (1).pdf.

This paper went through a heavy edit pass today (see HANDOVER.md "What
happened this session") fixing a real bug in the mock advice data, a citation
pointing the wrong direction, several cross-section contradictions, and a page-
budget trim. Before I submit: re-check the paper is internally consistent
(no leftover references to the old dissent-selection mechanic, no duplicate
content from the trim pass reading awkwardly, all \ref/\label/\cite still
resolve) and re-score it against the rubric one more time. Flag anything that
looks like it regressed from a previous fix, and give a final go/no-go
recommendation for submission.
```

**Prompt 3 — MUHREC cross-document check (optional, lower priority):**

```
Read docs/HANDOVER.md, then compare docs/ENG_FIT_4701_2.tex against the
current MUHREC advertisement, explanatory statement, and consent form under
docs/all google docs/.../Ethics and templates/. Check the open items listed
under HANDOVER.md's "Final sweep checklist" (eligibility, timing, author
affiliation) and tell me exactly what needs to change and where.
```

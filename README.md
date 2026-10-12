# school-of-ethics

A multiagent AI platform for ethics education, built for a Monash FIT4701/2 research project. The research investigates whether making AI-agent disagreement visible (dissent visibility) as a governance mechanism reduces students' over-reliance on AI advice and improves ethical decision-making in a multi-agent AI ethics-training platform.

## Current status

This repository currently contains a proof of concept only, built to test the dissent-visibility manipulation end-to-end: random (or override-able) assignment to a dissent-visible or dissent-hidden condition, two scenarios of differing consensus level, a trust survey, and session data shaped so the research objectives (RO1-RO4) can be computed directly from the exported JSON. It has no backend, no real LLM calls, no authentication, and no persistence beyond the current browser session. Agent advice is hardcoded mock data, not a live model.

## Participant flow

1. **Instructions and scenario choice** - participant reads instructions and picks which of two scenarios to start with.
2. **Scenario** - participant reads a short engineering ethics scenario with a set of options (A/B/C/D).
3. **Initial decision** - participant picks an option and writes short free-text reasoning.
4. **AI advice** - three mock AI agents give advice. The participant's assigned condition (fixed for their whole session, not a choice they make) decides whether this is shown as a genuine split between agents (dissent visible) or collapsed into a single consensus recommendation (dissent hidden).
5. **Final decision** - participant confirms or changes their original decision, with reasoning again. Repeats steps 2-5 for the second scenario.
6. **Trust survey** - after both scenarios, participant rates the Jian et al. (2000) 12-item trust-in-automation scale for the AI advisor panel.
7. **Feedback** - for each scenario, participant sees the expert-reviewed reference answer and how their decisions compared.
8. **Complete** - a confirmation message is shown. The full session record (condition, both trials' decisions/reasoning, derived advice-correctness and over-reliance flags, consensus level, and the trust scale responses/composite score) is logged to the browser console as JSON. Nothing is submitted anywhere.

## Tech stack

- Vue 3 (Composition API)
- Vite
- Plain CSS, no UI framework
- No router, no state management library

## Project structure

```
index.html
src/
  main.js              app entry point
  App.vue              flow orchestration and screen state
  style.css            shared styles
  data/
    scenario.js        the two hardcoded scenarios, options and expert references
    agentResponses.js  the two hardcoded agent response sets
    trustScale.js       Jian et al. (2000) trust scale items and scoring
  components/
    InstructionsScreen.vue
    ScenarioScreen.vue
    InitialDecisionScreen.vue
    AdviceScreen.vue
    FinalDecisionScreen.vue
    TrustScreen.vue
    FeedbackScreen.vue
    CompleteScreen.vue
```

## Running locally

Requires Node.js.

```
npm install
npm run dev
```

Then open the local URL Vite prints (default `http://localhost:5173`).

Other scripts:

```
npm run build     production build
npm run preview   preview a production build locally
```

## Switching the dissent condition

Each session is randomly assigned to `visible` or `hidden` in `assignCondition()` in `src/App.vue`. For manual testing or demos, override the assignment with a query parameter:

```
http://localhost:5173/?dissent=visible
http://localhost:5173/?dissent=hidden
```

## Out of scope for this proof of concept

- Backend, database, or any real API calls
- Real LLM integration
- Authentication or a consent flow
- Persistence beyond the current browser session
- Styling polish beyond a functional, readable layout

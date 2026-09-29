# school-of-ethics

A multiagent AI platform for ethics education, built for a Monash FIT4701/2 research project. The research investigates whether making AI-agent disagreement visible (dissent visibility) as a governance mechanism reduces students' over-reliance on AI advice and improves ethical decision-making in a multi-agent AI ethics-training platform.

## Current status

This repository currently contains a proof of concept only, built to test one thing: whether the dissent-visible vs dissent-hidden distinction can drive a different UI state from the same participant flow. It has no backend, no real LLM calls, no authentication, and no persistence beyond the current browser session. Agent advice is hardcoded mock data, not a live model.

## Participant flow

1. **Scenario** - participant reads a short engineering ethics scenario with a set of options (A/B/C/D).
2. **Initial decision** - participant picks an option and writes short free-text reasoning.
3. **AI advice** - three mock AI agents give advice. Depending on the active condition, this is shown either as a genuine split between agents (dissent visible) or collapsed into a single consensus recommendation (dissent hidden).
4. **Final decision** - participant confirms or changes their original decision, with reasoning again.
5. **Complete** - a confirmation message is shown. The full session record (initial decision, final decision, both reasoning fields, and which condition was shown) is logged to the browser console as JSON. Nothing is submitted anywhere.

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
    scenario.js        the hardcoded scenario and options
    agentResponses.js  the two hardcoded agent response sets
  components/
    ScenarioScreen.vue
    InitialDecisionScreen.vue
    AdviceScreen.vue
    FinalDecisionScreen.vue
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

The dissent visibility condition is set in `src/App.vue` via the `DEFAULT_CONDITION` constant, and can be overridden per session with a query parameter:

```
http://localhost:5173/?dissent=visible
http://localhost:5173/?dissent=hidden
```

## Out of scope for this proof of concept

- Backend, database, or any real API calls
- Real LLM integration
- Authentication or a consent flow
- Multiple scenarios
- Persistence beyond the current browser session
- Styling polish beyond a functional, readable layout

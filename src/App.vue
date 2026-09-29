<script setup>
import { ref } from 'vue'
import { scenario } from './data/scenario.js'
import { dissentVisibleAgents, dissentHiddenConsensus } from './data/agentResponses.js'
import ScenarioScreen from './components/ScenarioScreen.vue'
import InitialDecisionScreen from './components/InitialDecisionScreen.vue'
import AdviceScreen from './components/AdviceScreen.vue'
import FinalDecisionScreen from './components/FinalDecisionScreen.vue'
import CompleteScreen from './components/CompleteScreen.vue'

// --- Dissent visibility condition -----------------------------------------
// Flip this constant to change the default, or override per-run with
// ?dissent=visible / ?dissent=hidden in the URL.
const DEFAULT_CONDITION = 'visible' // 'visible' | 'hidden'

const params = new URLSearchParams(window.location.search)
const queryCondition = params.get('dissent')
const condition =
  queryCondition === 'visible' || queryCondition === 'hidden' ? queryCondition : DEFAULT_CONDITION

// --- Flow state -------------------------------------------------------------
const view = ref('scenario') // scenario | decision | advice | final | complete

const initialDecision = ref({ option: null, reasoning: '' })
const finalDecision = ref({ option: null, reasoning: '' })

function handleInitialSubmit(payload) {
  initialDecision.value = payload
  view.value = 'advice'
}

function handleFinalSubmit(payload) {
  finalDecision.value = payload
  view.value = 'complete'

  console.log(
    'ethics-training-poc session data:',
    JSON.stringify(
      {
        scenarioId: scenario.id,
        condition,
        initialDecision: initialDecision.value,
        finalDecision: finalDecision.value,
        changedMind: initialDecision.value.option !== finalDecision.value.option,
        timestamp: new Date().toISOString(),
      },
      null,
      2
    )
  )
}
</script>

<template>
  <main class="app">
    <ScenarioScreen
      v-if="view === 'scenario'"
      :scenario="scenario"
      @continue="view = 'decision'"
    />

    <InitialDecisionScreen
      v-else-if="view === 'decision'"
      :scenario="scenario"
      @submit="handleInitialSubmit"
    />

    <AdviceScreen
      v-else-if="view === 'advice'"
      :condition="condition"
      :visible-agents="dissentVisibleAgents"
      :hidden-consensus="dissentHiddenConsensus"
      @continue="view = 'final'"
    />

    <FinalDecisionScreen
      v-else-if="view === 'final'"
      :scenario="scenario"
      :initial-decision="initialDecision"
      @submit="handleFinalSubmit"
    />

    <CompleteScreen v-else-if="view === 'complete'" :condition="condition" />
  </main>
</template>

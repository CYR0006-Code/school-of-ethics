<script setup>
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import { isExpertReviewed, scenarios } from './data/scenario.js'
import { adviceVersion, agentResponses } from './data/agentResponses.js'
import InstructionsScreen from './components/InstructionsScreen.vue'
import ScenarioScreen from './components/ScenarioScreen.vue'
import InitialDecisionScreen from './components/InitialDecisionScreen.vue'
import AdviceScreen from './components/AdviceScreen.vue'
import FinalDecisionScreen from './components/FinalDecisionScreen.vue'
import FeedbackScreen from './components/FeedbackScreen.vue'
import CompleteScreen from './components/CompleteScreen.vue'

function newRecord() {
  return {
    id: crypto.randomUUID(),
    contentVersion: 'static-prototype-2',
    startedAt: new Date().toISOString(),
    completedAt: null,
    scenarioOrder: [],
    trials: [],
    events: [],
  }
}

const view = ref('instructions')
const session = ref(newRecord())
const currentIndex = ref(0)
const feedbackIndex = ref(0)
const roundStage = computed(() => ['initial', 'advice', 'final'].includes(view.value))
const currentTrial = computed(() => session.value.trials[currentIndex.value])
const currentScenario = computed(() => scenarios.find(item => item.id === currentTrial.value?.scenarioId))
const currentAdvice = computed(() => agentResponses[currentScenario.value?.id])
const completedCount = computed(() => session.value.trials.filter(trial => trial.finalDecision).length)
const feedbackTrial = computed(() => session.value.trials[feedbackIndex.value])
const feedbackScenario = computed(() => scenarios.find(item => item.id === feedbackTrial.value?.scenarioId))

function log(action, details = {}) {
  const event = {
    action,
    timestamp: new Date().toISOString(),
    ...(roundStage.value ? { scenarioId: currentTrial.value.scenarioId } : {}),
    ...details,
  }
  session.value.events.push(event)
  console.log('ethics-training-poc action:', JSON.stringify({ sessionId: session.value.id, ...event }))
}

watch(() => `${view.value}:${currentIndex.value}:${feedbackIndex.value}`, async () => {
  await nextTick()
  document.querySelector('[data-stage-heading]')?.focus()
}, { immediate: true })

onMounted(() => log('instructions_viewed'))

function begin() {
  if (view.value !== 'instructions') return
  log('instructions_completed')
  view.value = 'selection'
  log('scenario_selection_viewed')
}

function selectScenario(id) {
  if (view.value !== 'selection' || !scenarios.some(item => item.id === id)) return
  session.value.scenarioOrder = [id, ...scenarios.filter(item => item.id !== id).map(item => item.id)]
  session.value.trials = session.value.scenarioOrder.map(scenarioId => ({
    scenarioId,
    scenarioVersion: scenarios.find(item => item.id === scenarioId).version,
    adviceVersion,
    expertReferenceVersion: scenarios.find(item => item.id === scenarioId).expertReference.version,
    expertReviewStatus: isExpertReviewed(scenarios.find(item => item.id === scenarioId)) ? 'reviewed' : 'pending-review',
    initialDecision: null,
    finalDecision: null,
    changedMind: null,
    dissent: { offered: false, required: false, viewed: false, skipped: false },
  }))
  log('scenario_order_selected', { scenarioOrder: [...session.value.scenarioOrder] })
  view.value = 'initial'
  log('scenario_started')
}

function validDecision(decision) {
  return currentScenario.value.options.some(option => option.id === decision?.option) &&
    typeof decision.reasoning === 'string' && decision.reasoning.trim().length > 0
}

function submitInitial(decision) {
  if (view.value !== 'initial' || !validDecision(decision)) return
  const trial = currentTrial.value
  trial.initialDecision = { option: decision.option, reasoning: decision.reasoning, submittedAt: new Date().toISOString() }
  log('initial_submitted', { option: decision.option, reasoning: decision.reasoning })
  view.value = 'advice'
  log('advice_viewed', { adviceVersion, overallRecommendation: currentAdvice.value.overall.recommends })

  trial.dissent.required = currentIndex.value === 1 && !session.value.trials[0].dissent.viewed
  if (trial.dissent.required) {
    log('dissent_required')
    trial.dissent.viewed = true
    log('dissent_viewed', { required: true })
  } else {
    trial.dissent.offered = true
    log('dissent_offered')
  }
}

async function revealPerspectives() {
  if (view.value !== 'advice' || currentTrial.value.dissent.viewed) return
  currentTrial.value.dissent.viewed = true
  log('dissent_viewed', { required: false })
  await nextTick()
  document.querySelector('[data-perspectives-heading]')?.focus()
}

function continueToFinal(skip = false) {
  if (view.value !== 'advice') return
  const dissent = currentTrial.value.dissent
  if (skip) {
    if (dissent.required || dissent.viewed) return
    dissent.skipped = true
    log('dissent_skipped')
  } else if (!dissent.viewed) return
  view.value = 'final'
  log('final_decision_viewed')
}

function submitFinal(decision) {
  if (view.value !== 'final' || !validDecision(decision)) return
  const trial = currentTrial.value
  trial.finalDecision = { option: decision.option, reasoning: decision.reasoning, submittedAt: new Date().toISOString() }
  trial.changedMind = trial.initialDecision.option !== decision.option
  log('final_submitted', { option: decision.option, reasoning: decision.reasoning, changedMind: trial.changedMind })
  if (currentIndex.value === 0) {
    currentIndex.value = 1
    view.value = 'initial'
    log('scenario_started')
  } else {
    view.value = 'feedback'
    logFeedbackViewed()
  }
}

function reviewAdvice(event) {
  if (view.value === 'final' && event.target.open) log('advice_reviewed')
}

function logFeedbackViewed() {
  log('feedback_viewed', {
    scenarioId: feedbackTrial.value.scenarioId,
    referenceVersion: feedbackTrial.value.expertReferenceVersion,
    reviewStatus: feedbackTrial.value.expertReviewStatus,
  })
}

function nextFeedback() {
  if (view.value !== 'feedback') return
  log('feedback_completed', { scenarioId: feedbackTrial.value.scenarioId })
  if (feedbackIndex.value === 0) {
    feedbackIndex.value = 1
    logFeedbackViewed()
  } else {
    session.value.completedAt = new Date().toISOString()
    view.value = 'complete'
    log('session_completed')
    console.log('ethics-training-poc session data:', JSON.stringify(session.value, null, 2))
  }
}

function restart() {
  if (view.value !== 'complete') return
  session.value = newRecord()
  currentIndex.value = 0
  feedbackIndex.value = 0
  view.value = 'instructions'
  log('instructions_viewed')
}
</script>

<template>
  <div class="app">
    <main class="app-content">
      <InstructionsScreen v-if="view === 'instructions'" @begin="begin" />

      <section v-else-if="view === 'selection'" class="screen">
        <h1 tabindex="-1" data-stage-heading>Choose your first scenario</h1>
        <p class="description">You will complete both scenarios. Choose which one you would like to explore first.</p>
        <div class="scenario-choices">
          <article v-for="scenario in scenarios" :key="scenario.id" class="scenario-choice">
            <h2>{{ scenario.title }}</h2>
            <button @click="selectScenario(scenario.id)">Start with this scenario<span class="sr-only">: {{ scenario.title }}</span></button>
          </article>
        </div>
      </section>

      <template v-else-if="roundStage">
        <section class="session-progress" aria-label="Activity progress">
          <strong>Scenario {{ currentIndex + 1 }} of 2</strong>
          <progress :value="completedCount" :max="2" :aria-label="`${completedCount} of 2 scenarios completed`"></progress>
        </section>
        <div class="round-layout">
          <div class="round-context">
            <ScenarioScreen :scenario="currentScenario" />
            <details v-if="view === 'final'" class="saved-advice" @toggle="reviewAdvice">
              <summary>Review AI panel advice</summary>
              <div class="agent-card consensus-card"><strong>Overall recommendation: {{ currentAdvice.overall.recommends }}</strong><p>{{ currentAdvice.overall.reasoning }}</p></div>
              <template v-if="currentTrial.dissent.viewed">
                <div v-for="agent in currentAdvice.agents" :key="agent.id" class="agent-card"><strong>{{ agent.name }} · {{ agent.recommends }}</strong><p>{{ agent.reasoning }}</p></div>
              </template>
            </details>
          </div>
          <InitialDecisionScreen v-if="view === 'initial'" :key="`${currentScenario.id}:initial`" :scenario="currentScenario" @submit="submitInitial" />
          <AdviceScreen v-else-if="view === 'advice'" :advice="currentAdvice" :perspectives-visible="currentTrial.dissent.viewed" :dissent-required="currentTrial.dissent.required" @view-perspectives="revealPerspectives" @skip-perspectives="continueToFinal(true)" @continue="continueToFinal()" />
          <FinalDecisionScreen v-else :key="`${currentScenario.id}:final`" :scenario="currentScenario" :initial-decision="currentTrial.initialDecision" @submit="submitFinal" />
        </div>
      </template>

      <FeedbackScreen v-else-if="view === 'feedback'" :key="feedbackTrial.scenarioId" :scenario="feedbackScenario" :trial="feedbackTrial" :number="feedbackIndex + 1" :total="2" @next="nextFeedback" />
      <CompleteScreen v-else-if="view === 'complete'" @new-session="restart" />
    </main>
  </div>
</template>

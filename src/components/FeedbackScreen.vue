<script setup>
import { computed } from 'vue'
import { isExpertReviewed } from '../data/scenario.js'

const props = defineProps({
  scenario: { type: Object, required: true },
  trial: { type: Object, required: true },
  number: { type: Number, required: true },
  total: { type: Number, required: true },
})
defineEmits(['next'])

const changedMind = computed(() => props.trial.initialDecision.option !== props.trial.finalDecision.option)
const reference = computed(() => props.scenario.expertReference || {})
const expertReviewed = computed(() => isExpertReviewed(props.scenario))
const referenceOptions = computed(() => props.scenario.options.filter(option =>
  Array.isArray(reference.value.acceptableOptions) && reference.value.acceptableOptions.includes(option.id)))
const withinExpertRange = computed(() => referenceOptions.value.some(option => option.id === props.trial.finalDecision.option))
const choiceFeedback = computed(() => reference.value.optionFeedback?.[props.trial.finalDecision.option] || 'Consider how your choice addresses the risks, affected people and uncertainty in this scenario.')
const reviewedDate = computed(() => expertReviewed.value ? new Intl.DateTimeFormat('en-AU', {
  day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Australia/Melbourne',
}).format(new Date(reference.value.reviewedAt)) : '')

function optionLabel(id) {
  const option = props.scenario.options.find((item) => item.id === id)
  return `${id}. ${option?.label || ''}`
}
</script>

<template>
  <section class="screen stage-panel">
    <h1 tabindex="-1" data-stage-heading>Feedback: {{ scenario.title }}</h1>
    <p class="eyebrow">Scenario {{ number }} of {{ total }}</p>

    <section class="expert-reference" aria-labelledby="reference-heading">
      <h2 id="reference-heading">Human expert feedback</h2>
      <template v-if="expertReviewed">
        <p class="review-status">Expert-reviewed reference</p>
        <p v-for="reviewer in reference.reviewers" :key="reviewer.name" class="help-text">Reviewed by {{ reviewer.name }} · {{ reviewer.expertise }}</p>
        <p class="help-text">Reviewed {{ reviewedDate }}.</p>
        <p class="help-text">Review record: <a v-if="reference.reviewSource.url" :href="reference.reviewSource.url" target="_blank" rel="noopener noreferrer">{{ reference.reviewSource.title }}</a><span v-else>{{ reference.reviewSource.title }}</span></p>
      </template>
      <h3>{{ expertReviewed ? 'Approaches within the expert-reviewed range' : 'Reference approaches' }}</h3>
      <ul class="reference-options">
        <li v-for="option in referenceOptions" :key="option.id"><strong>{{ option.id }}.</strong> {{ option.label }}</li>
      </ul>
      <p>{{ reference.rationale }}</p>
    </section>

    <h2>Your decisions</h2>
    <dl class="feedback-decisions">
      <div><dt>Your initial decision</dt><dd>{{ optionLabel(trial.initialDecision.option) }}</dd></div>
      <div><dt>Your final decision</dt><dd>{{ optionLabel(trial.finalDecision.option) }}</dd></div>
    </dl>
    <p>{{ changedMind ? 'You changed your choice after viewing the AI advice.' : 'You kept your initial choice after viewing the AI advice.' }}</p>
    <p class="expert-comparison" :class="withinExpertRange ? 'within-range' : 'outside-range'">{{ withinExpertRange ? 'Within' : 'Outside' }} {{ expertReviewed ? 'the expert-reviewed range' : 'the reference range' }}</p>
    <h3>A point to consider in your final choice</h3>
    <p class="description">{{ choiceFeedback }}</p>

    <section v-if="reference.sources?.length" class="reference-sources" aria-labelledby="sources-heading">
      <h2 id="sources-heading">Basis for this reference</h2>
      <div v-for="source in reference.sources" :key="source.url">
        <p><a :href="source.url" target="_blank" rel="noopener noreferrer">{{ source.title }}</a></p>
        <p>{{ source.summary }}</p>
        <p class="help-text">Relevant sections: {{ source.sections.join(', ') }}.</p>
      </div>
    </section>
    <button @click="$emit('next')">{{ number < total ? 'Next' : 'Finish' }}</button>
  </section>
</template>

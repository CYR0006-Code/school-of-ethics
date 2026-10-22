<script setup>
import { ref, computed } from 'vue'

defineProps({
  scenario: { type: Object, required: true },
})
const emit = defineEmits(['submit'])

const selectedOption = ref(null)
const reasoning = ref('')

const canSubmit = computed(() => selectedOption.value !== null && reasoning.value.trim().length > 0)

function submit() {
  if (!canSubmit.value) return
  emit('submit', { option: selectedOption.value, reasoning: reasoning.value })
}
</script>

<template>
  <section class="screen stage-panel">
    <h1 tabindex="-1" data-stage-heading>What would you do?</h1>
    <p class="description">Pick an option and briefly explain your reasoning.</p>

    <form @submit.prevent="submit">
    <fieldset class="option-list">
      <legend>Your initial decision</legend>
      <label v-for="opt in scenario.options" :key="opt.id" class="option-row">
        <input type="radio" name="initial-option" :value="opt.id" v-model="selectedOption" />
        <span><strong>{{ opt.id }}.</strong> {{ opt.label }}</span>
      </label>
    </fieldset>

    <label class="field-label" for="initial-reasoning">Your reasoning</label>
    <textarea
      id="initial-reasoning"
      v-model="reasoning"
      rows="4"
      placeholder="Why did you choose this option?"
      required
    ></textarea>

    <p class="help-text">You cannot change this initial response after submitting it.</p>
    <button type="submit" :disabled="!canSubmit">Submit initial decision</button>
    </form>
  </section>
</template>

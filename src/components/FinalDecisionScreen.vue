<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  scenario: { type: Object, required: true },
  initialDecision: { type: Object, required: true },
})
const emit = defineEmits(['submit'])

const selectedOption = ref(props.initialDecision.option)
const reasoning = ref('')

const canSubmit = computed(() => selectedOption.value !== null && reasoning.value.trim().length > 0)

function submit() {
  if (!canSubmit.value) return
  emit('submit', { option: selectedOption.value, reasoning: reasoning.value })
}
</script>

<template>
  <section class="screen stage-panel">
    <h1 tabindex="-1" data-stage-heading>Final decision</h1>
    <p class="description">
      Your initial choice was <strong>{{ initialDecision.option }}</strong>. After seeing the AI
      panel's advice, confirm or change your decision and explain why.
    </p>
    <p class="help-text">Your initial choice is preselected. Confirm it or choose a different option, then enter your final reasoning.</p>

    <form @submit.prevent="submit">
    <fieldset class="option-list">
      <legend>Your final decision</legend>
      <label v-for="opt in scenario.options" :key="opt.id" class="option-row">
        <input type="radio" name="final-option" :value="opt.id" v-model="selectedOption" />
        <span><strong>{{ opt.id }}.</strong> {{ opt.label }}</span>
      </label>
    </fieldset>

    <label class="field-label" for="final-reasoning">Your reasoning</label>
    <textarea
      id="final-reasoning"
      v-model="reasoning"
      rows="4"
      placeholder="Did the AI advice change your mind? Why or why not?"
      required
    ></textarea>

    <p class="help-text">You cannot change this final response after submitting it.</p>
    <button type="submit" :disabled="!canSubmit">Confirm final decision</button>
    </form>
  </section>
</template>

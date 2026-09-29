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
  emit('submit', { option: selectedOption.value, reasoning: reasoning.value.trim() })
}
</script>

<template>
  <section class="screen">
    <h1>Final decision</h1>
    <p class="description">
      Your initial choice was <strong>{{ initialDecision.option }}</strong>. After seeing the AI
      panel's advice, confirm or change your decision and explain why.
    </p>

    <div class="option-list">
      <label v-for="opt in scenario.options" :key="opt.id" class="option-row">
        <input type="radio" name="final-option" :value="opt.id" v-model="selectedOption" />
        <span><strong>{{ opt.id }}.</strong> {{ opt.label }}</span>
      </label>
    </div>

    <label class="field-label" for="final-reasoning">Your reasoning</label>
    <textarea
      id="final-reasoning"
      v-model="reasoning"
      rows="4"
      placeholder="Did the AI advice change your mind? Why or why not?"
    ></textarea>

    <button :disabled="!canSubmit" @click="submit">Confirm final decision</button>
  </section>
</template>

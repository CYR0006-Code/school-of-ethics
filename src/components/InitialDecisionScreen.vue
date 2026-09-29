<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  scenario: { type: Object, required: true },
})
const emit = defineEmits(['submit'])

const selectedOption = ref(null)
const reasoning = ref('')

const canSubmit = computed(() => selectedOption.value !== null && reasoning.value.trim().length > 0)

function submit() {
  if (!canSubmit.value) return
  emit('submit', { option: selectedOption.value, reasoning: reasoning.value.trim() })
}
</script>

<template>
  <section class="screen">
    <h1>What would you do?</h1>
    <p class="description">Pick an option and briefly explain your reasoning.</p>

    <div class="option-list">
      <label v-for="opt in scenario.options" :key="opt.id" class="option-row">
        <input type="radio" name="initial-option" :value="opt.id" v-model="selectedOption" />
        <span><strong>{{ opt.id }}.</strong> {{ opt.label }}</span>
      </label>
    </div>

    <label class="field-label" for="initial-reasoning">Your reasoning</label>
    <textarea
      id="initial-reasoning"
      v-model="reasoning"
      rows="4"
      placeholder="Why did you choose this option?"
    ></textarea>

    <button :disabled="!canSubmit" @click="submit">Submit initial decision</button>
  </section>
</template>

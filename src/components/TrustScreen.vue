<script setup>
import { reactive, computed } from 'vue'
import { trustScaleItems } from '../data/trustScale.js'

const emit = defineEmits(['submit'])

const responses = reactive(Object.fromEntries(trustScaleItems.map(item => [item.id, null])))

const canSubmit = computed(() => trustScaleItems.every(item => responses[item.id] !== null))

function submit() {
  if (!canSubmit.value) return
  emit('submit', { ...responses })
}
</script>

<template>
  <section class="screen stage-panel">
    <h1 tabindex="-1" data-stage-heading>How much do you trust the AI advisor panel?</h1>
    <p class="description">Rate each statement about the AI advisor panel you saw during both scenarios, from 1 (not at all) to 7 (extremely). There are no right or wrong answers.</p>

    <form @submit.prevent="submit">
      <fieldset v-for="item in trustScaleItems" :key="item.id" class="likert-item">
        <legend>{{ item.text }}</legend>
        <div class="likert-scale" role="radiogroup" :aria-label="item.text">
          <span class="likert-endpoint">Not at all</span>
          <label v-for="value in 7" :key="value" class="likert-option">
            <input type="radio" :name="item.id" :value="value" v-model.number="responses[item.id]" />
            <span>{{ value }}</span>
          </label>
          <span class="likert-endpoint">Extremely</span>
        </div>
      </fieldset>

      <button type="submit" :disabled="!canSubmit">Submit</button>
    </form>
  </section>
</template>

<script setup>
defineProps({
  scenario: { type: Object, required: true },
})
</script>

<template>
  <section class="scenario-context" aria-label="Scenario facts and options">
    <p class="eyebrow">Scenario facts</p>
    <h2>{{ scenario.title }}</h2>
    <p class="description">{{ scenario.description }}</p>

    <h3>Available options</h3>
    <ul class="options-preview">
      <li v-for="opt in scenario.options" :key="opt.id">
        <strong>{{ opt.id }}.</strong> {{ opt.label }}
      </li>
    </ul>

  </section>
</template>

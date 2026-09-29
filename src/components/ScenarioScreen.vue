<script setup>
defineProps({
  scenario: { type: Object, required: true },
})
defineEmits(['continue'])
</script>

<template>
  <section class="screen">
    <h1>{{ scenario.title }}</h1>
    <p class="description">{{ scenario.description }}</p>

    <h2>Options</h2>
    <ul class="options-preview">
      <li v-for="opt in scenario.options" :key="opt.id">
        <strong>{{ opt.id }}.</strong> {{ opt.label }}
      </li>
    </ul>

    <button @click="$emit('continue')">Continue</button>
  </section>
</template>

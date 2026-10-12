<script setup>
defineEmits(['begin'])
</script>

<template>
  <section class="screen stage-panel">
    <h1 tabindex="-1" data-stage-heading>Instructions</h1>
    <p class="description">Explore two engineering scenarios. Choose which one to start with.</p>
    <ol class="instructions-list">
      <li>Read the facts and options. Make your own initial decision and explain your reasoning before seeing AI advice.</li>
      <li>Read the AI panel's advice.</li>
      <li>Confirm or change your decision and explain your final reasoning. Repeat for the other scenario.</li>
    </ol>
    <p>After both scenarios, you'll answer a short survey about the AI panel, then see feedback on your decisions.</p>
    <p>Submitted decisions cannot be changed.</p>
    <button @click="$emit('begin')">Choose a scenario</button>
  </section>
</template>

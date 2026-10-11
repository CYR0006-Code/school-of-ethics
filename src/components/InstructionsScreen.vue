<script setup>
defineEmits(['begin'])
</script>

<template>
  <section class="screen stage-panel">
    <h1 tabindex="-1" data-stage-heading>Instructions</h1>
    <p class="description">Explore two engineering scenarios. Choose which one to start with.</p>
    <ol class="instructions-list">
      <li>Read the facts and options. Make your own initial decision and explain your reasoning before seeing AI advice.</li>
      <li>Read the AI panel’s overall recommendation. You can also view the individual roles and their differing perspectives.</li>
      <li>Confirm or change your decision and explain your final reasoning. Repeat for the other scenario.</li>
    </ol>
    <p>You can choose whether to view the individual roles in the first scenario. If you skip them, they will be shown in the second scenario. Otherwise, you can choose again.</p>
    <p>Submitted decisions cannot be changed. Feedback follows after you finish both scenarios.</p>
    <button @click="$emit('begin')">Choose a scenario</button>
  </section>
</template>

<script setup>
defineProps({
  condition: { type: String, required: true },
})
</script>

<template>
  <section class="screen">
    <h1>Thanks — your responses have been recorded.</h1>
    <p class="description">
      This is a proof of concept, so nothing was actually submitted anywhere. Open the browser
      console to see the captured data logged as JSON.
    </p>
    <p class="condition-note">Condition shown: <strong>dissent {{ condition }}</strong></p>
  </section>
</template>

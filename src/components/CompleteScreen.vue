<script setup>
defineEmits(['new-session'])
</script>

<template>
  <section class="screen">
    <h1 tabindex="-1" data-stage-heading>Thank you</h1>
    <p class="description">You have completed both scenarios and reviewed the feedback. You can return to the survey or close this window.</p>
    <button class="secondary" @click="$emit('new-session')">Start again</button>
  </section>
</template>

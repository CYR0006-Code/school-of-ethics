<script setup>
defineProps({
  advice: { type: Object, required: true },
  dissentVisible: { type: Boolean, default: false },
})
defineEmits(['continue'])
</script>

<template>
  <section class="screen stage-panel">
    <h1 tabindex="-1" data-stage-heading>AI panel advice</h1>
    <p class="help-text">Consider this advice alongside the scenario facts, then make your own decision.</p>
    <div class="agent-card consensus-card">
      <h2>Overall recommendation</h2>
      <p>Suggested option: <strong>{{ advice.overall.recommends }}</strong></p>
      <p class="agent-reasoning">{{ advice.overall.reasoning }}</p>
    </div>

    <template v-if="dissentVisible">
      <h2 tabindex="-1" data-perspectives-heading>Different AI perspectives</h2>
      <p class="help-text">The roles weigh the situation differently. Their recommendations do not all agree.</p>
      <div class="agent-list">
        <article v-for="agent in advice.agents" :key="agent.id" class="agent-card">
          <h3 class="agent-name">{{ agent.name }}</h3>
          <p class="agent-recommend">Suggested option: <strong>{{ agent.recommends }}</strong></p>
          <p class="agent-reasoning">{{ agent.reasoning }}</p>
        </article>
      </div>
    </template>

    <button @click="$emit('continue')">Continue to final decision</button>
  </section>
</template>

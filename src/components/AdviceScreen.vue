<script setup>
defineProps({
  advice: { type: Object, required: true },
  perspectivesVisible: { type: Boolean, default: false },
  dissentRequired: { type: Boolean, default: false },
})
defineEmits(['view-perspectives', 'skip-perspectives', 'continue'])
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

    <template v-if="perspectivesVisible">
      <h2 tabindex="-1" data-perspectives-heading>Different AI perspectives</h2>
      <p v-if="dissentRequired" class="help-text">You continued without viewing the perspectives in your first scenario. They are shown here so you can consider them at least once.</p>
      <p class="help-text">The roles weigh the situation differently. Their recommendations do not all agree.</p>
      <div class="agent-list">
        <article v-for="agent in advice.agents" :key="agent.id" class="agent-card">
          <h3 class="agent-name">{{ agent.name }}</h3>
          <p class="agent-recommend">Suggested option: <strong>{{ agent.recommends }}</strong></p>
          <p class="agent-reasoning">{{ agent.reasoning }}</p>
        </article>
      </div>
      <button @click="$emit('continue')">Continue to final decision</button>
    </template>
    <template v-else>
      <p>Would you like to view the different AI perspectives before making your final decision?</p>
      <div class="actions">
        <button @click="$emit('view-perspectives')">View AI perspectives</button>
        <button class="secondary" @click="$emit('skip-perspectives')">Continue without viewing</button>
      </div>
    </template>
  </section>
</template>

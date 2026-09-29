<script setup>
defineProps({
  condition: { type: String, required: true }, // 'visible' | 'hidden'
  visibleAgents: { type: Array, required: true },
  hiddenConsensus: { type: Object, required: true },
})
defineEmits(['continue'])
</script>

<template>
  <section class="screen">
    <h1>Advice from the AI panel</h1>

    <!-- Dissent visible: each agent shown separately, split is exposed -->
    <div v-if="condition === 'visible'" class="agent-list">
      <div v-for="agent in visibleAgents" :key="agent.name" class="agent-card">
        <div class="agent-name">{{ agent.name }}</div>
        <div class="agent-recommend">Recommends: <strong>{{ agent.recommends }}</strong></div>
        <p class="agent-reasoning">{{ agent.reasoning }}</p>
      </div>
    </div>

    <!-- Dissent hidden: single blended consensus recommendation -->
    <div v-else class="agent-card consensus-card">
      <div class="agent-name">AI Review Panel</div>
      <div class="agent-recommend">Recommends: <strong>{{ hiddenConsensus.recommends }}</strong></div>
      <p class="agent-reasoning">{{ hiddenConsensus.reasoning }}</p>
    </div>

    <button @click="$emit('continue')">Continue to final decision</button>
  </section>
</template>

<template>
  <div class="stat-card">
    <div>
      <p>{{ title }}</p>
      <strong>{{ value }}</strong>
    </div>

    <div class="stat-icon">
      {{ icon }}
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  value: [String, Number],
  icon: String
})
</script>
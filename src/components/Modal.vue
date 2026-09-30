<template>
  <div v-if="show" class="modal-overlay" @click.self="$emit('close')">
    <div class="modal">
      <div class="modal-header">
        <h2>{{ title }}</h2>

        <button class="close-button" @click="$emit('close')">
          ×
        </button>
      </div>

      <div class="modal-body">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  show: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: 'Formulário'
  }
})

defineEmits(['close'])
</script>
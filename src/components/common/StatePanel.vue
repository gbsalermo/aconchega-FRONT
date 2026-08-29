<script setup lang="ts">
defineProps<{ kind?: 'loading'|'empty'|'error'; title: string; message?: string }>()
</script>
<template>
  <div class="state-panel" :class="`state-panel--${kind||'empty'}`">
    <span v-if="kind==='loading'" class="loader"></span><h3>{{ title }}</h3><p v-if="message">{{ message }}</p><slot/>
  </div>
</template>

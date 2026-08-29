<script setup lang="ts">defineProps<{ compact?: boolean }>()</script>
<template>
  <RouterLink to="/" class="brand" aria-label="Aconchega Aí - início">
    <span class="brand-mark" aria-hidden="true">
      <span class="brand-tile brand-tile--yellow"></span><span class="brand-tile brand-tile--dark"></span>
      <span class="brand-tile brand-tile--dark"></span><span class="brand-tile brand-tile--yellow"></span>
      <span class="brand-home">⌂</span>
    </span>
    <span v-if="!compact" class="brand-name"><strong>Aconchega</strong><em>Aí</em></span>
  </RouterLink>
</template>

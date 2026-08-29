<script setup lang="ts">defineProps<{ value?: string|null }>()</script>
<template><span class="status-badge" :data-status="value">{{ value || '—' }}</span></template>

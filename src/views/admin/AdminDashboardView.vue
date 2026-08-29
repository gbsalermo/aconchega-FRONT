<script setup lang="ts">
import { onMounted,ref } from 'vue'
import { Users,Building2,TrendingUp } from 'lucide-vue-next'
import StatePanel from '../../components/common/StatePanel.vue'
import { platformService } from '../../services/platform.service'
import type { PlatformStatistics } from '../../types/api'
const stats=ref<PlatformStatistics|null>(null),loading=ref(true),error=ref('')
onMounted(async()=>{try{stats.value=await platformService.statistics()}catch{error.value='Não foi possível carregar as estatísticas.'}finally{loading.value=false}})
</script>
<template><section class="section admin-section"><div class="container">
  <div class="section-heading"><div><span class="eyebrow eyebrow--plain">ADMINISTRAÇÃO</span><h1>Painel da plataforma</h1></div><div class="admin-nav"><RouterLink to="/admin/usuarios">Usuários</RouterLink><RouterLink to="/admin/imoveis">Moradias</RouterLink></div></div>
  <StatePanel v-if="loading" kind="loading" title="Carregando indicadores..."/><StatePanel v-else-if="error" kind="error" title="Erro" :message="error"/>
  <template v-else-if="stats">
    <div class="stats-grid"><article class="stat-card"><span><Building2/></span><div><small>Moradias</small><strong>{{ stats.totalDwellings }}</strong></div></article><article class="stat-card"><span><Users/></span><div><small>Usuários</small><strong>{{ stats.totalUsers }}</strong></div></article><article class="stat-card"><span><TrendingUp/></span><div><small>Variação mensal</small><strong>{{ stats.dwellingsMonthPercentage }}%</strong></div></article></div>
    <div class="admin-columns">
      <div class="admin-list-card"><h2>Últimas moradias</h2><div v-for="d in stats.lastDwellings" :key="d.id" class="admin-row"><div><strong>{{ d.title }}</strong><span>{{ d.city }} · {{ d.status }}</span></div><RouterLink :to="`/imoveis/${d.id}`">Abrir</RouterLink></div></div>
      <div class="admin-list-card"><h2>Últimos usuários</h2><div v-for="u in stats.lastUsers" :key="u.id" class="admin-row"><div><strong>{{ u.name }}</strong><span>{{ u.email }} · {{ u.role }}</span></div></div></div>
    </div>
  </template>
</div></section></template>

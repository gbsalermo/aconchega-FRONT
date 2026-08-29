<script setup lang="ts">
import { onMounted,ref } from 'vue'
import { Plus,Pencil,Trash2 } from 'lucide-vue-next'
import StatePanel from '../components/common/StatePanel.vue'
import StatusBadge from '../components/common/StatusBadge.vue'
import { dwellingService } from '../services/dwelling.service'
import type { Dwelling } from '../types/api'
const dwellings=ref<Dwelling[]>([]),loading=ref(true),error=ref('')
async function load(){loading.value=true;error.value='';try{const r=await dwellingService.my({term:'',page:1,orderBy:'createdAt',order:'DESC'});dwellings.value=r.dwellings}catch{error.value='Não foi possível carregar seus anúncios.'}finally{loading.value=false}}
async function remove(id:string){if(!confirm('Excluir este anúncio?'))return;await dwellingService.remove(id);await load()}
onMounted(load)
</script>
<template><section class="section"><div class="container">
  <div class="section-heading"><div><span class="eyebrow eyebrow--plain">ÁREA DO ANUNCIANTE</span><h1>Meus anúncios</h1><p>Crie e gerencie as moradias vinculadas à sua conta.</p></div><RouterLink class="btn btn-primary" to="/anuncios/novo"><Plus :size="18"/> Novo anúncio</RouterLink></div>
  <StatePanel v-if="loading" kind="loading" title="Carregando anúncios..."/><StatePanel v-else-if="error" kind="error" title="Erro" :message="error"/>
  <StatePanel v-else-if="!dwellings.length" kind="empty" title="Você ainda não anunciou nenhuma moradia."><RouterLink class="btn btn-primary" to="/anuncios/novo">Criar primeiro anúncio</RouterLink></StatePanel>
  <div v-else class="management-list"><article v-for="d in dwellings" :key="d.id" class="management-card"><div class="management-info"><StatusBadge :value="d.status"/><h3>{{ d.title }}</h3><p>{{ d.city }} · {{ d.type }} · {{ d.goal }}</p><strong>{{ Number(d.price).toLocaleString('pt-BR',{style:'currency',currency:'BRL'}) }}</strong></div><div class="management-actions"><RouterLink class="btn btn-secondary" :to="`/anuncios/${d.id}/editar`"><Pencil :size="17"/> Editar</RouterLink><button class="btn btn-danger" @click="remove(d.id)"><Trash2 :size="17"/> Excluir</button></div></article></div>
</div></section></template>

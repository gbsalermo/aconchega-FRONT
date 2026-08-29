<script setup lang="ts">
import { onMounted,ref } from 'vue'
import { Trash2,ExternalLink } from 'lucide-vue-next'
import StatePanel from '../../components/common/StatePanel.vue'
import StatusBadge from '../../components/common/StatusBadge.vue'
import { dwellingService } from '../../services/dwelling.service'
import type { Dwelling } from '../../types/api'
const dwellings=ref<Dwelling[]>([]),loading=ref(true),error=ref(''),term=ref('')
async function load(){loading.value=true;error.value='';try{const r=await dwellingService.adminSearch({term:term.value,page:1,orderBy:'createdAt',order:'DESC'});dwellings.value=r.dwellings}catch{error.value='Não foi possível listar as moradias.'}finally{loading.value=false}}
async function remove(id:string){if(!confirm('Excluir esta moradia como administrador?'))return;await dwellingService.adminRemove(id);await load()}
onMounted(load)
</script>
<template><section class="section admin-section"><div class="container">
  <div class="section-heading"><div><span class="eyebrow eyebrow--plain">ADMIN</span><h1>Moradias</h1></div><RouterLink class="text-link" to="/admin">← Painel</RouterLink></div>
  <form class="admin-filters" @submit.prevent="load"><input v-model="term" placeholder="Buscar moradia"/><button class="btn btn-primary">Buscar</button></form>
  <StatePanel v-if="loading" kind="loading" title="Carregando moradias..."/><StatePanel v-else-if="error" kind="error" title="Erro" :message="error"/>
  <div v-else class="table-card"><div class="table-wrap"><table><thead><tr><th>Moradia</th><th>Tipo</th><th>Status</th><th>Proprietário</th><th>Ações</th></tr></thead><tbody>
    <tr v-for="d in dwellings" :key="d.id"><td><strong>{{ d.title }}</strong><small>{{ d.city }}</small></td><td>{{ d.type }}</td><td><StatusBadge :value="d.status"/></td><td>{{ d.owner?.name||'—' }}</td><td class="table-actions"><RouterLink class="icon-button" :to="`/imoveis/${d.id}`"><ExternalLink :size="18"/></RouterLink><button class="icon-button icon-button--danger" @click="remove(d.id)"><Trash2 :size="18"/></button></td></tr>
  </tbody></table></div></div>
</div></section></template>

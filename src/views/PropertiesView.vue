<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { Search, SlidersHorizontal, X } from 'lucide-vue-next'
import { useRoute, useRouter } from 'vue-router'
import PropertyCard from '../components/properties/PropertyCard.vue'
import StatePanel from '../components/common/StatePanel.vue'
import { dwellingService } from '../services/dwelling.service'
import { useAuthStore } from '../stores/auth'
import type { Dwelling, DwellingGoal, DwellingType, SearchDwellingsParams } from '../types/api'

const route=useRoute(), router=useRouter(), auth=useAuthStore()
const dwellings=ref<Dwelling[]>([]), loading=ref(false), error=ref(''), totalPages=ref(1), totalItems=ref(0), filtersOpen=ref(false)
const filters=ref({
  term:String(route.query.term||''), city:String(route.query.city||'Cruz das Almas'),
  type:String(route.query.type||''), goal:String(route.query.goal||''),
  maximumPrice:String(route.query.maximumPrice||''), studentsOnly:route.query.studentsOnly==='true',
  animals:route.query.animals==='true', orderBy:String(route.query.orderBy||'createdAt'), order:String(route.query.order||'DESC')
})
const page=ref(Number(route.query.page||1))
const queryParams=computed<Partial<SearchDwellingsParams>>(()=>({
  page:page.value, term:filters.value.term, city:filters.value.city||undefined,
  type:(filters.value.type||undefined) as DwellingType|undefined,
  goal:(filters.value.goal||undefined) as DwellingGoal|undefined,
  maximumPrice:filters.value.maximumPrice?Number(filters.value.maximumPrice):undefined,
  studentsOnly:filters.value.studentsOnly||undefined, animals:filters.value.animals||undefined,
  orderBy:filters.value.orderBy as 'price'|'createdAt', order:filters.value.order as 'ASC'|'DESC'
}))

async function load(){
  loading.value=true;error.value=''
  try{
    const response=auth.isAuthenticated?await dwellingService.authenticatedSearch(queryParams.value):await dwellingService.publicSearch(queryParams.value)
    dwellings.value=response.dwellings;totalPages.value=response.totalPages||1;totalItems.value=response.totalItems||0
  }catch{error.value='Não foi possível buscar as moradias. Confira se a API está em execução.';dwellings.value=[]}
  finally{loading.value=false}
}
function applyFilters(){
  page.value=1
  router.replace({query:{term:filters.value.term||undefined,city:filters.value.city||undefined,type:filters.value.type||undefined,goal:filters.value.goal||undefined,maximumPrice:filters.value.maximumPrice||undefined,studentsOnly:filters.value.studentsOnly||undefined,animals:filters.value.animals||undefined,orderBy:filters.value.orderBy,order:filters.value.order,page:page.value}})
  filtersOpen.value=false;load()
}
function clearFilters(){filters.value={term:'',city:'Cruz das Almas',type:'',goal:'',maximumPrice:'',studentsOnly:false,animals:false,orderBy:'createdAt',order:'DESC'};applyFilters()}
watch(page,()=>{router.replace({query:{...route.query,page:page.value}});load()})
onMounted(load)
</script>

<template>
  <section class="page-hero page-hero--compact"><div class="container"><span class="eyebrow eyebrow--plain">ENCONTRE SEU LUGAR</span><h1>Moradias em Cruz das Almas</h1><p>Use os filtros públicos ou entre na sua conta para acessar informações adicionais permitidas pela API.</p></div></section>
  <section class="section properties-section"><div class="container">
    <form class="search-toolbar" @submit.prevent="applyFilters">
      <div class="search-input"><Search :size="19"/><input v-model="filters.term" placeholder="Buscar por título, endereço..."/></div>
      <button class="btn btn-secondary filter-mobile-btn" type="button" @click="filtersOpen=true"><SlidersHorizontal :size="18"/> Filtros</button>
      <button class="btn btn-primary" type="submit">Buscar</button>
    </form>
    <div class="properties-layout">
      <aside class="filters-panel" :class="{'filters-panel--open':filtersOpen}">
        <button class="filters-close" @click="filtersOpen=false"><X/></button>
        <div class="filters-title"><h3>Filtros</h3><button @click="clearFilters">Limpar</button></div>
        <label class="field"><span>Cidade</span><input v-model="filters.city"/></label>
        <label class="field"><span>Tipo</span><select v-model="filters.type"><option value="">Todos</option><option value="House">Casa</option><option value="Apartment">Apartamento</option><option value="Kitnet">Kitnet</option><option value="Room">Quarto</option><option value="Republic">República</option></select></label>
        <label class="field"><span>Objetivo</span><select v-model="filters.goal"><option value="">Todos</option><option value="Rent">Aluguel</option><option value="Sell">Venda</option><option value="Vacation Home">Temporada</option></select></label>
        <label class="field"><span>Preço máximo</span><input v-model="filters.maximumPrice" type="number" min="0" placeholder="R$"/></label>
        <template v-if="auth.isAuthenticated">
          <label class="check-row"><input v-model="filters.studentsOnly" type="checkbox"/><span>Apenas estudantes</span></label>
          <label class="check-row"><input v-model="filters.animals" type="checkbox"/><span>Aceita animais</span></label>
        </template>
        <label class="field"><span>Ordenar</span><select v-model="filters.orderBy"><option value="createdAt">Mais recentes</option><option value="price">Preço</option></select></label>
        <label class="field"><span>Ordem</span><select v-model="filters.order"><option value="DESC">Decrescente</option><option value="ASC">Crescente</option></select></label>
        <button class="btn btn-primary btn-block" @click="applyFilters">Aplicar filtros</button>
      </aside>
      <div class="properties-results">
        <div class="results-head"><strong>{{ totalItems }} resultado(s)</strong><span v-if="!auth.isAuthenticated">Entre para acessar a busca autenticada.</span></div>
        <StatePanel v-if="loading" kind="loading" title="Buscando moradias..."/>
        <StatePanel v-else-if="error" kind="error" title="Não foi possível buscar" :message="error"><button class="btn btn-secondary" @click="load">Tentar novamente</button></StatePanel>
        <StatePanel v-else-if="!dwellings.length" kind="empty" title="Nenhuma moradia encontrada" message="Tente alterar os filtros."/>
        <div v-else class="property-grid property-grid--results"><PropertyCard v-for="d in dwellings" :key="d.id" :dwelling="d"/></div>
        <div v-if="totalPages>1" class="pagination"><button :disabled="page<=1" @click="page--">Anterior</button><span>Página {{ page }} de {{ totalPages }}</span><button :disabled="page>=totalPages" @click="page++">Próxima</button></div>
      </div>
    </div>
  </div></section>
</template>

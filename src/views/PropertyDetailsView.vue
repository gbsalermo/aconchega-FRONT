<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { MapPin, PawPrint, GraduationCap, Sofa, Cigarette, Baby, Wifi, Droplets, Zap, Phone, ShieldCheck, CircleDollarSign } from 'lucide-vue-next'
import StatePanel from '../components/common/StatePanel.vue'
import StatusBadge from '../components/common/StatusBadge.vue'
import { dwellingService } from '../services/dwelling.service'
import { useAuthStore } from '../stores/auth'
import type { Dwelling } from '../types/api'

const route=useRoute(), auth=useAuthStore()
const dwelling=ref<Dwelling|null>(null), loading=ref(true), error=ref('')
const images=computed(()=>dwelling.value?.medias?.filter(m=>!m.filename?.endsWith('.mp4'))||[])
const mainImage=computed(()=>images.value.find(m=>m.isCover)?.url||images.value[0]?.url||'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1400&q=85')
const price=computed(()=>dwelling.value?new Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'}).format(Number(dwelling.value.price)):'')
onMounted(async()=>{
  try{
    const id=String(route.params.id)
    if(id.startsWith('demo-')){error.value='Este item é apenas uma prévia visual da Home. Consulte a listagem conectada à API.';return}
    dwelling.value=auth.isAuthenticated?await dwellingService.getAuthenticated(id):await dwellingService.getPublic(id)
  }catch{error.value='Não foi possível carregar esta moradia.'}
  finally{loading.value=false}
})
</script>

<template>
  <section class="section details-section"><div class="container">
    <StatePanel v-if="loading" kind="loading" title="Carregando moradia..."/>
    <StatePanel v-else-if="error" kind="error" title="Moradia indisponível" :message="error"><RouterLink class="btn btn-secondary" to="/imoveis">Voltar</RouterLink></StatePanel>
    <template v-else-if="dwelling">
      <div class="details-head">
        <div>
          <div class="details-tags"><StatusBadge :value="dwelling.status"/><span>{{ dwelling.type }}</span><span>{{ dwelling.goal }}</span></div>
          <h1>{{ dwelling.title }}</h1>
          <p><MapPin :size="17"/>{{ dwelling.address }}, {{ dwelling.city }}{{ dwelling.state?` - ${dwelling.state}`:'' }}</p>
        </div>
        <div class="details-price"><strong>{{ price }}</strong><span>{{ dwelling.paymentConditions }}</span></div>
      </div>

      <div class="details-gallery">
        <img :src="mainImage" :alt="dwelling.title" class="details-main-image"/>
        <div class="details-thumbs"><img v-for="m in images.slice(1,3)" :key="m.id" :src="m.url" :alt="dwelling.title"/></div>
      </div>

      <div class="details-grid">
        <article class="details-content">
          <section class="details-block"><h2>Sobre a moradia</h2><p>{{ dwelling.description }}</p></section>
          <section v-if="auth.isAuthenticated" class="details-block">
            <h2>Características</h2>
            <div class="feature-chips">
              <span v-if="dwelling.studentsOnly"><GraduationCap/> Apenas estudantes</span>
              <span v-if="dwelling.animals"><PawPrint/> Aceita pets</span>
              <span v-if="dwelling.furnished"><Sofa/> Mobiliado</span>
              <span v-if="dwelling.smoker"><Cigarette/> Aceita fumantes</span>
              <span v-if="dwelling.children"><Baby/> Aceita crianças</span>
              <span v-if="dwelling.includeInternetBill"><Wifi/> Internet inclusa</span>
              <span v-if="dwelling.includeWaterBill"><Droplets/> Água inclusa</span>
              <span v-if="dwelling.includeEletricityBill"><Zap/> Luz inclusa</span>
            </div>
          </section>
          <section v-if="auth.isAuthenticated && dwelling.rules" class="details-block"><h2>Regras</h2><p>{{ dwelling.rules }}</p></section>
        </article>

        <aside class="contact-card">
          <span class="contact-icon"><ShieldCheck/></span>
          <h3>{{ auth.isAuthenticated?'Informações do anúncio':'Quer ver mais detalhes?' }}</h3>
          <template v-if="auth.isAuthenticated">
            <p v-if="dwelling.owner">Anunciado por <strong>{{ dwelling.owner.name }}</strong>.</p>
            <p v-if="dwelling.contact"><Phone :size="16"/>{{ dwelling.contact }}</p>
            <p v-if="dwelling.condominiumFee"><CircleDollarSign :size="16"/>Condomínio: {{ Number(dwelling.condominiumFee).toLocaleString('pt-BR',{style:'currency',currency:'BRL'}) }}</p>
          </template>
          <template v-else>
            <p>O backend possui uma visão pública reduzida. Entre para acessar os dados liberados.</p>
            <RouterLink class="btn btn-primary btn-block" :to="{name:'login',query:{redirect:route.fullPath}}">Entrar para continuar</RouterLink>
          </template>
        </aside>
      </div>
    </template>
  </div></section>
</template>

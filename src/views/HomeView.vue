<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { ShieldCheck, SlidersHorizontal, MapPinned } from 'lucide-vue-next'
import HeroSection from '../components/home/HeroSection.vue'
import PropertyCard from '../components/properties/PropertyCard.vue'
import StatePanel from '../components/common/StatePanel.vue'
import { dwellingService } from '../services/dwelling.service'
import type { Dwelling } from '../types/api'

const dwellings = ref<Dwelling[]>([])
const loading = ref(true)
const apiUnavailable = ref(false)

const demoDwellings: Dwelling[] = [
  {id:'demo-1',title:'Kitnet próxima ao centro',description:'Espaço compacto, bem localizado e ideal para uma rotina prática.',price:720,address:'Centro',neighborhood:'Centro',city:'Cruz das Almas',state:'BA',type:'Kitnet',paymentConditions:'Monthly',goal:'Rent',status:'Active',availability:'Available',zipCode:'44380000',studentsOnly:true,animals:false,furnished:true,medias:[]},
  {id:'demo-2',title:'Quarto em casa compartilhada',description:'Ambiente tranquilo com internet e água inclusas.',price:480,address:'Coplan',neighborhood:'Coplan',city:'Cruz das Almas',state:'BA',type:'Room',paymentConditions:'Monthly',goal:'Rent',status:'Active',availability:'Available',zipCode:'44380000',studentsOnly:true,animals:true,furnished:true,medias:[]},
  {id:'demo-3',title:'Casa para dividir',description:'Casa ampla com boa área comum e fácil acesso à cidade.',price:1350,address:'Primavera',neighborhood:'Primavera',city:'Cruz das Almas',state:'BA',type:'House',paymentConditions:'Monthly',goal:'Rent',status:'Active',availability:'Available',zipCode:'44380000',studentsOnly:false,animals:true,furnished:false,medias:[]}
]

onMounted(async()=>{
  try{
    const response=await dwellingService.publicSearch({term:'',page:1,orderBy:'createdAt',order:'DESC'})
    dwellings.value=response.dwellings.slice(0,6)
  }catch{
    apiUnavailable.value=true
    dwellings.value=demoDwellings
  }finally{loading.value=false}
})
</script>

<template>
  <HeroSection/>
  <section class="section featured-section">
    <div class="container">
      <div class="section-heading">
        <div><span class="eyebrow eyebrow--plain">MORADIAS RECENTES</span><h2>Comece por aqui</h2><p>Explore os anúncios mais recentes da plataforma.</p></div>
        <RouterLink class="text-link" to="/imoveis">Ver todas →</RouterLink>
      </div>
      <StatePanel v-if="loading" kind="loading" title="Buscando moradias..."/>
      <div v-else class="property-grid"><PropertyCard v-for="d in dwellings" :key="d.id" :dwelling="d"/></div>
      <p v-if="apiUnavailable" class="demo-note">Prévia visual com dados demonstrativos. Com a API em execução, os anúncios reais entram automaticamente.</p>
    </div>
  </section>

  <section id="como-funciona" class="section how-section">
    <div class="container">
      <div class="section-heading section-heading--center"><div><span class="eyebrow eyebrow--plain">DO JEITO CERTO</span><h2>Menos improviso para encontrar moradia</h2></div></div>
      <div class="feature-grid">
        <article class="feature-card"><span class="feature-icon"><SlidersHorizontal/></span><h3>Filtros que importam</h3><p>Preço, tipo, estudante, pets, contas inclusas, condições de pagamento e regras.</p></article>
        <article class="feature-card"><span class="feature-icon"><ShieldCheck/></span><h3>Visibilidade controlada</h3><p>Visitantes recebem visão pública; usuários autenticados recebem os detalhes permitidos pela API.</p></article>
        <article class="feature-card"><span class="feature-icon"><MapPinned/></span><h3>Contexto local</h3><p>Busca por cidade e, quando autenticado, suporte a latitude, longitude e distância.</p></article>
      </div>
    </div>
  </section>

  <section id="sobre" class="section about-band">
    <div class="container about-band-inner">
      <div><span class="eyebrow eyebrow--dark">ACONCHEGA AÍ</span><h2>Uma ponte entre quem procura e quem tem espaço.</h2></div>
      <p>O front acompanha a API existente: contas, autenticação, anúncios, mídias, restrições, área administrativa e limites da plataforma.</p>
    </div>
  </section>
</template>

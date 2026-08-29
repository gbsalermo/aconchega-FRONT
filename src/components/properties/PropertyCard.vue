<script setup lang="ts">
import { computed } from 'vue'
import { MapPin, PawPrint, GraduationCap, Home } from 'lucide-vue-next'
import type { Dwelling } from '../../types/api'

const props = defineProps<{ dwelling: Dwelling }>()

const cover = computed(() => {
  const medias = props.dwelling.medias || []
  return medias.find((media) => media.isCover)?.url || medias[0]?.url ||
    'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1000&q=80'
})

const price = computed(() => {
  const value = Number(props.dwelling.price)
  if (!Number.isFinite(value)) return 'Consulte'
  return new Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'}).format(value)
})

const paymentLabel = computed(() => ({
  Monthly:'/ mês', Weekly:'/ semana', Daily:'/ dia', Yearly:'/ ano', 'One Time':''
}[props.dwelling.paymentConditions] || ''))
</script>

<template>
  <RouterLink :to="`/imoveis/${dwelling.id}`" class="property-card">
    <div class="property-image-wrap">
      <img :src="cover" :alt="dwelling.title" class="property-image" loading="lazy"/>
      <span class="property-goal">{{ dwelling.goal==='Rent'?'Aluguel':dwelling.goal==='Sell'?'Venda':'Temporada' }}</span>
      <span class="property-type">{{ dwelling.type }}</span>
    </div>
    <div class="property-content">
      <p class="property-location"><MapPin :size="14"/>{{ dwelling.neighborhood ? `${dwelling.neighborhood}, ` : '' }}{{ dwelling.city }}</p>
      <h3>{{ dwelling.title }}</h3>
      <p class="property-description">{{ dwelling.description }}</p>
      <div class="property-features">
        <span v-if="dwelling.studentsOnly"><GraduationCap :size="15"/> Estudantes</span>
        <span v-if="dwelling.animals"><PawPrint :size="15"/> Pets</span>
        <span v-if="dwelling.furnished"><Home :size="15"/> Mobiliado</span>
      </div>
      <div class="property-price-row"><strong>{{ price }}</strong><span>{{ paymentLabel }}</span></div>
    </div>
  </RouterLink>
</template>

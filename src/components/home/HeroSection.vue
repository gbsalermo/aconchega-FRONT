<script setup lang="ts">
import { ArrowRight, Search, MapPin, Home, Sparkles } from 'lucide-vue-next'
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const router = useRouter()
const term = ref('')

function search() {
  router.push({ name: 'properties', query: term.value ? { term: term.value } : {} })
}
</script>

<template>
  <section class="hero">
    <div class="hero-glow hero-glow--one"></div>
    <div class="hero-glow hero-glow--two"></div>

    <div class="container hero-grid">
      <div class="hero-copy">
        <div class="eyebrow"><Sparkles :size="14"/> MORADIA EM CRUZ DAS ALMAS</div>
        <h1>Encontre um lugar<br/>para chamar de <span>casa.</span></h1>
        <p>Quartos, kitnets, repúblicas, casas e apartamentos em um só lugar. Busque com clareza e encontre uma moradia que combine com sua rotina.</p>

        <form class="hero-search" @submit.prevent="search">
          <Search :size="20"/>
          <input v-model="term" placeholder="Bairro, rua, tipo de moradia..." aria-label="Buscar moradia"/>
          <button type="submit">Buscar</button>
        </form>

        <div class="hero-actions">
          <RouterLink class="btn btn-primary" to="/imoveis">Explorar moradias <ArrowRight :size="18"/></RouterLink>
          <RouterLink class="btn btn-secondary" to="/anuncios/novo"><Home :size="18"/> Anunciar moradia</RouterLink>
        </div>

        <div class="hero-proof">
          <div class="proof-dots"><span></span><span></span><span></span></div>
          <div><strong>Feito para a realidade local</strong><small>Filtros de estudante, contas inclusas e regras da moradia.</small></div>
        </div>
      </div>

      <div class="hero-visual">
        <div class="hero-photo">
          <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85" alt="Exemplo de moradia"/>
          <div class="flag-corner flag-corner--a"></div>
          <div class="flag-corner flag-corner--b"></div>
          <div class="featured-card">
            <div><span class="featured-label">DESTAQUE</span><h3>Seu próximo aconchego</h3><p><MapPin :size="14"/> Cruz das Almas · BA</p></div>
            <div class="featured-bottom"><strong>Veja anúncios reais</strong><span>casas · quartos · kitnets</span></div>
          </div>
        </div>
        <div class="floating-badge"><span class="floating-icon"><MapPin :size="18"/></span><div><strong>Cruz das Almas</strong><small>busca focada na cidade</small></div></div>
      </div>
    </div>
  </section>
</template>

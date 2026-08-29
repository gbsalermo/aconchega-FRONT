<script setup lang="ts">
import { ref } from 'vue'
import { Menu, X, Plus, LogIn, UserRound, ShieldCheck } from 'lucide-vue-next'
import { useAuthStore } from '../../stores/auth'
import BrandMark from '../BrandMark.vue'
const auth = useAuthStore()
const menuOpen = ref(false)
</script>

<template>
  <header class="site-header">
    <div class="container header-inner">
      <BrandMark />
      <nav class="desktop-nav">
        <RouterLink to="/">Início</RouterLink>
        <RouterLink to="/imoveis">Moradias</RouterLink>
        <a href="/#como-funciona">Como funciona</a>
        <a href="/#sobre">Sobre</a>
      </nav>

      <div class="header-actions">
        <template v-if="auth.isAuthenticated">
          <RouterLink class="btn btn-primary btn-small" to="/anuncios/novo"><Plus :size="17"/> Anunciar</RouterLink>
          <RouterLink v-if="auth.isAdmin" class="icon-button" to="/admin" title="Admin"><ShieldCheck :size="19"/></RouterLink>
          <RouterLink class="user-pill" to="/perfil"><UserRound :size="17"/><span>{{ auth.user?.name?.split(' ')[0] || 'Perfil' }}</span></RouterLink>
        </template>
        <template v-else>
          <RouterLink class="btn btn-primary btn-small" to="/cadastro"><Plus :size="17"/> Anunciar</RouterLink>
          <RouterLink class="user-pill" to="/login"><LogIn :size="17"/><span>Entrar</span></RouterLink>
        </template>
        <button class="menu-button" @click="menuOpen=!menuOpen" aria-label="Menu"><X v-if="menuOpen"/><Menu v-else/></button>
      </div>
    </div>
    <nav v-if="menuOpen" class="mobile-nav">
      <RouterLink to="/" @click="menuOpen=false">Início</RouterLink>
      <RouterLink to="/imoveis" @click="menuOpen=false">Moradias</RouterLink>
      <RouterLink v-if="auth.isAuthenticated" to="/meus-anuncios" @click="menuOpen=false">Meus anúncios</RouterLink>
      <RouterLink v-if="auth.isAdmin" to="/admin" @click="menuOpen=false">Administração</RouterLink>
      <RouterLink :to="auth.isAuthenticated?'/perfil':'/login'" @click="menuOpen=false">{{ auth.isAuthenticated?'Perfil':'Entrar' }}</RouterLink>
    </nav>
  </header>
</template>

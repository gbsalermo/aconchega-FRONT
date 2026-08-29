<script setup lang="ts">
import { ref } from 'vue'
import { useRoute,useRouter } from 'vue-router'
import { LogIn } from 'lucide-vue-next'
import { useAuthStore } from '../stores/auth'
const auth=useAuthStore(),route=useRoute(),router=useRouter()
const email=ref(''),password=ref(''),error=ref('')
async function submit(){
  error.value=''
  try{await auth.login({email:email.value,password:password.value});await auth.refreshProfile().catch(()=>null);await router.push(String(route.query.redirect||'/'))}
  catch(e:any){error.value=e.response?.data?.message||e.response?.data?.error||'E-mail ou senha inválidos.'}
}
</script>
<template>
  <section class="auth-page">
    <div class="auth-panel auth-panel--visual"><div class="auth-brand-message"><span class="eyebrow eyebrow--dark">BEM-VINDO DE VOLTA</span><h1>Seu próximo lugar pode estar a poucos cliques.</h1><p>Entre para acessar anúncios compatíveis com seu perfil e gerenciar suas moradias.</p></div></div>
    <div class="auth-panel auth-panel--form">
      <form class="auth-card" @submit.prevent="submit">
        <span class="auth-icon"><LogIn/></span><h2>Entrar</h2><p>Use sua conta do Aconchega Aí.</p>
        <div v-if="error" class="alert alert-error">{{ error }}</div>
        <label class="field"><span>E-mail</span><input v-model="email" type="email" required autocomplete="email"/></label>
        <label class="field"><span>Senha</span><input v-model="password" type="password" required autocomplete="current-password"/></label>
        <RouterLink class="form-link" to="/recuperar-senha">Esqueci minha senha</RouterLink>
        <button class="btn btn-primary btn-block" :disabled="auth.loading">{{ auth.loading?'Entrando...':'Entrar' }}</button>
        <p class="auth-switch">Ainda não tem conta? <RouterLink to="/cadastro">Criar conta</RouterLink></p>
      </form>
    </div>
  </section>
</template>

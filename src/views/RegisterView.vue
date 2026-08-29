<script setup lang="ts">
import { ref } from 'vue'
import { UserPlus } from 'lucide-vue-next'
import { useRouter } from 'vue-router'
import { authService } from '../services/auth.service'
import type { Gender } from '../types/api'
const router=useRouter(),loading=ref(false),error=ref(''),success=ref('')
const form=ref({name:'',email:'',password:'',gender:'MALE' as Gender})
async function submit(){
  loading.value=true;error.value='';success.value=''
  try{await authService.register(form.value);success.value='Conta criada. Confira seu e-mail para confirmar o cadastro.';setTimeout(()=>router.push('/login'),900)}
  catch(e:any){error.value=e.response?.data?.message||e.response?.data?.error||'Não foi possível criar a conta.'}
  finally{loading.value=false}
}
</script>
<template>
  <section class="auth-page">
    <div class="auth-panel auth-panel--visual auth-panel--register"><div class="auth-brand-message"><span class="eyebrow eyebrow--dark">CHEGUE E SE ACONCHEGUE</span><h1>Uma conta, duas possibilidades.</h1><p>Procure uma moradia com mais detalhes ou publique seu próprio anúncio.</p></div></div>
    <div class="auth-panel auth-panel--form"><form class="auth-card" @submit.prevent="submit">
      <span class="auth-icon"><UserPlus/></span><h2>Criar conta</h2><p>Campos alinhados ao contrato real da API.</p>
      <div v-if="error" class="alert alert-error">{{ error }}</div><div v-if="success" class="alert alert-success">{{ success }}</div>
      <label class="field"><span>Nome</span><input v-model="form.name" required/></label>
      <label class="field"><span>E-mail</span><input v-model="form.email" type="email" required/></label>
      <label class="field"><span>Senha</span><input v-model="form.password" type="password" required minlength="6"/></label>
      <label class="field"><span>Gênero cadastrado</span><select v-model="form.gender"><option value="MALE">Masculino</option><option value="FEMALE">Feminino</option></select></label>
      <button class="btn btn-primary btn-block" :disabled="loading">{{ loading?'Criando...':'Criar conta' }}</button>
      <p class="auth-switch">Já tem conta? <RouterLink to="/login">Entrar</RouterLink></p>
    </form></div>
  </section>
</template>

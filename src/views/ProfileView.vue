<script setup lang="ts">
import { onMounted,ref } from 'vue'
import { Camera,LogOut,MailCheck } from 'lucide-vue-next'
import { useAuthStore } from '../stores/auth'
import { accountService } from '../services/account.service'
import { authService } from '../services/auth.service'
const auth=useAuthStore(),loading=ref(false),message=ref(''),error=ref('')
const resendEmail=ref(auth.user?.email||'')
const form=ref({password:'',isSmoker:Boolean(auth.user?.isSmoker),isStudent:Boolean(auth.user?.isStudent)})
onMounted(async()=>{await auth.refreshProfile().catch(()=>null);resendEmail.value=auth.user?.email||resendEmail.value;form.value.isSmoker=Boolean(auth.user?.isSmoker);form.value.isStudent=Boolean(auth.user?.isStudent)})
async function save(){loading.value=true;message.value='';error.value='';try{await accountService.update({...form.value,password:form.value.password||undefined});await auth.refreshProfile();form.value.password='';message.value='Perfil atualizado.'}catch(e:any){error.value=e.response?.data?.message||'Não foi possível atualizar.'}finally{loading.value=false}}
async function upload(event:Event){const input=event.target as HTMLInputElement;const file=input.files?.[0];if(!file)return;try{await accountService.uploadPhoto(file);await auth.refreshProfile();message.value='Foto atualizada.'}catch{error.value='Não foi possível enviar a foto. A API aceita JPG e PNG até 16 MB.'}}
async function resend(){try{await authService.resendConfirmation(resendEmail.value);message.value='Novo e-mail de confirmação solicitado.'}catch(e:any){error.value=e.response?.data?.message||'Não foi possível reenviar.'}}
</script>
<template>
  <section class="section profile-section"><div class="container profile-layout">
    <aside class="profile-sidebar">
      <div class="profile-avatar">
        <img v-if="auth.user?.extPhotoUrl||auth.user?.photoUrl" :src="auth.user?.extPhotoUrl||auth.user?.photoUrl||''" alt=""/>
        <span v-else>{{ auth.user?.name?.charAt(0)||'?' }}</span>
        <label class="avatar-upload"><Camera :size="18"/><input type="file" accept="image/png,image/jpeg" @change="upload"/></label>
      </div>
      <h2>{{ auth.user?.name }}</h2><p>{{ auth.user?.email }}</p><span class="role-pill">{{ auth.user?.role }}</span>
      <nav class="profile-nav"><RouterLink to="/perfil">Perfil</RouterLink><RouterLink to="/meus-anuncios">Meus anúncios</RouterLink><RouterLink v-if="auth.isAdmin" to="/admin">Administração</RouterLink><button @click="auth.logout();$router.push('/')"><LogOut :size="17"/> Sair</button></nav>
    </aside>
    <div class="profile-content">
      <div v-if="message" class="alert alert-success">{{ message }}</div><div v-if="error" class="alert alert-error">{{ error }}</div>
      <div v-if="!auth.user?.confirmed" class="confirmation-card"><MailCheck/><div><h3>Confirme seu e-mail para anunciar</h3><p>A API exige conta confirmada para criar moradias e enviar mídias.</p></div><button class="btn btn-secondary" @click="resend">Reenviar confirmação</button></div>
      <form class="form-card" @submit.prevent="save">
        <div class="form-card-heading"><span class="eyebrow eyebrow--plain">MINHA CONTA</span><h1>Preferências do perfil</h1></div>
        <div class="profile-data"><div><span>Nome</span><strong>{{ auth.user?.name }}</strong></div><div><span>E-mail</span><strong>{{ auth.user?.email }}</strong></div><div><span>Gênero</span><strong>{{ auth.user?.gender }}</strong></div></div>
        <div class="form-grid form-grid--2">
          <label class="check-card"><input v-model="form.isStudent" type="checkbox"/><div><strong>Sou estudante</strong><span>Usado pelo perfil da API.</span></div></label>
          <label class="check-card"><input v-model="form.isSmoker" type="checkbox"/><div><strong>Sou fumante</strong><span>Ajuda no contexto de compatibilidade.</span></div></label>
        </div>
        <label class="field"><span>Nova senha (opcional)</span><input v-model="form.password" type="password"/></label>
        <button class="btn btn-primary" :disabled="loading">{{ loading?'Salvando...':'Salvar alterações' }}</button>
      </form>
    </div>
  </div></section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { authService } from '../services/auth.service'
const email=ref(''),loading=ref(false),message=ref(''),error=ref('')
async function submit(){loading.value=true;message.value='';error.value='';try{const r=await authService.requestPasswordRecovery(email.value);message.value=r.message||'Se a conta existir, as instruções foram enviadas.'}catch(e:any){error.value=e.response?.data?.message||'Não foi possível solicitar a recuperação.'}finally{loading.value=false}}
</script>
<template><section class="simple-page"><form class="form-card form-card--narrow" @submit.prevent="submit"><span class="eyebrow eyebrow--plain">RECUPERAÇÃO</span><h1>Esqueceu sua senha?</h1><p>Informe o e-mail cadastrado.</p><div v-if="message" class="alert alert-success">{{ message }}</div><div v-if="error" class="alert alert-error">{{ error }}</div><label class="field"><span>E-mail</span><input v-model="email" type="email" required/></label><button class="btn btn-primary btn-block" :disabled="loading">{{ loading?'Enviando...':'Enviar instruções' }}</button></form></section></template>

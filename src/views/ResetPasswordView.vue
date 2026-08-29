<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { authService } from '../services/auth.service'
const route=useRoute(),token=ref(String(route.query.token||'')),password=ref(''),loading=ref(false),message=ref(''),error=ref('')
async function submit(){loading.value=true;message.value='';error.value='';try{const r=await authService.resetPassword(token.value,password.value);message.value=r.message||'Senha alterada.'}catch(e:any){error.value=e.response?.data?.message||'Não foi possível alterar a senha.'}finally{loading.value=false}}
</script>
<template><section class="simple-page"><form class="form-card form-card--narrow" @submit.prevent="submit"><span class="eyebrow eyebrow--plain">NOVA SENHA</span><h1>Defina sua nova senha</h1><div v-if="message" class="alert alert-success">{{ message }}</div><div v-if="error" class="alert alert-error">{{ error }}</div><label class="field"><span>Token</span><input v-model="token" required/></label><label class="field"><span>Nova senha</span><input v-model="password" type="password" required/></label><button class="btn btn-primary btn-block" :disabled="loading">{{ loading?'Salvando...':'Alterar senha' }}</button></form></section></template>

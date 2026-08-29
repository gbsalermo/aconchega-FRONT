<script setup lang="ts">
import { onMounted,ref } from 'vue'
import { useRoute } from 'vue-router'
import { authService } from '../services/auth.service'
const route=useRoute(),state=ref<'loading'|'success'|'error'>('loading'),message=ref('Confirmando sua conta...')
onMounted(async()=>{const token=String(route.query.token||'');if(!token){state.value='error';message.value='Token não informado.';return}try{await authService.confirm(token);state.value='success';message.value='Conta confirmada com sucesso.'}catch(e:any){state.value='error';message.value=e.response?.data?.message||'Não foi possível confirmar a conta.'}})
</script>
<template><section class="simple-page"><div class="form-card form-card--narrow"><span class="eyebrow eyebrow--plain">CONFIRMAÇÃO DE CONTA</span><h1>{{ state==='success'?'Tudo certo!':state==='error'?'Algo deu errado':'Só um instante' }}</h1><p>{{ message }}</p><RouterLink v-if="state!=='loading'" class="btn btn-primary btn-block" to="/login">Ir para login</RouterLink></div></section></template>

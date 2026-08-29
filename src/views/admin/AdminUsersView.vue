<script setup lang="ts">
import { onMounted,ref } from 'vue'
import { Ban,CheckCircle2,Trash2 } from 'lucide-vue-next'
import StatePanel from '../../components/common/StatePanel.vue'
import { accountService } from '../../services/account.service'
import type { User } from '../../types/api'
const users=ref<User[]>([]),loading=ref(true),error=ref(''),filters=ref({name:'',email:'',role:''})
async function load(){loading.value=true;error.value='';try{const r=await accountService.listUsers({...filters.value,page:1});users.value=r.users}catch{error.value='Não foi possível listar os usuários.'}finally{loading.value=false}}
async function toggleBan(u:User){if(u.banned)await accountService.unbanUser(u.id);else{const reason=prompt('Motivo do banimento:')||'';if(!reason)return;await accountService.banUser(u.id,reason)}await load()}
async function remove(u:User){if(!confirm(`Excluir a conta de ${u.name}?`))return;await accountService.deleteUser(u.id);await load()}
onMounted(load)
</script>
<template><section class="section admin-section"><div class="container">
  <div class="section-heading"><div><span class="eyebrow eyebrow--plain">ADMIN</span><h1>Usuários</h1></div><RouterLink class="text-link" to="/admin">← Painel</RouterLink></div>
  <form class="admin-filters" @submit.prevent="load"><input v-model="filters.name" placeholder="Nome"/><input v-model="filters.email" placeholder="E-mail"/><select v-model="filters.role"><option value="">Todos</option><option value="USER">USER</option><option value="ADMIN">ADMIN</option></select><button class="btn btn-primary">Filtrar</button></form>
  <StatePanel v-if="loading" kind="loading" title="Carregando usuários..."/><StatePanel v-else-if="error" kind="error" title="Erro" :message="error"/>
  <div v-else class="table-card"><div class="table-wrap"><table><thead><tr><th>Usuário</th><th>Perfil</th><th>Confirmado</th><th>Status</th><th>Ações</th></tr></thead><tbody>
    <tr v-for="u in users" :key="u.id"><td><strong>{{ u.name }}</strong><small>{{ u.email }}</small></td><td>{{ u.role }}</td><td>{{ u.confirmed?'Sim':'Não' }}</td><td>{{ u.banned?'Banido':'Ativo' }}</td><td class="table-actions"><button class="icon-button" @click="toggleBan(u)"><CheckCircle2 v-if="u.banned" :size="18"/><Ban v-else :size="18"/></button><button class="icon-button icon-button--danger" @click="remove(u)"><Trash2 :size="18"/></button></td></tr>
  </tbody></table></div></div>
</div></section></template>

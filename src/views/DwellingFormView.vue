<script setup lang="ts">
import { computed,onMounted,ref } from 'vue'
import { useRoute,useRouter } from 'vue-router'
import { ImagePlus,Star,Trash2 } from 'lucide-vue-next'
import { dwellingService } from '../services/dwelling.service'
import { platformService } from '../services/platform.service'
import type { CreateDwellingRequest,DwellingMedia } from '../types/api'

const route=useRoute(),router=useRouter(),editing=computed(()=>Boolean(route.params.id)),loading=ref(false),error=ref(''),message=ref('')
const medias=ref<DwellingMedia[]>([]),maxMedia=ref(5)
const form=ref<CreateDwellingRequest>({
  title:'',description:'',price:0,address:'',neighborhood:'',city:'Cruz das Almas',state:'BA',type:'Kitnet',
  paymentConditions:'Monthly',goal:'Rent',availability:'Available',latitude:-12.67,longitude:-39.10,contact:'',
  animals:true,furnished:true,smoker:true,children:true,rules:'',includeEletricityBill:false,includeWaterBill:false,
  includeInternetBill:false,includeOthersBill:false,condominiumFee:null,studentsOnly:false,status:'Active',zipCode:'44380000'
})
onMounted(async()=>{
  platformService.limits().then(l=>maxMedia.value=l.maxDwellingMedia||5).catch(()=>null)
  if(!editing.value)return
  try{
    const d=await dwellingService.getAuthenticated(String(route.params.id))
    Object.assign(form.value,{title:d.title,description:d.description,price:Number(d.price),address:d.address,neighborhood:d.neighborhood||'',city:d.city,state:d.state||'BA',type:d.type,paymentConditions:d.paymentConditions,goal:d.goal,availability:d.availability||'Available',latitude:Number(d.latitude||0),longitude:Number(d.longitude||0),contact:d.contact||'',animals:d.animals,furnished:d.furnished,smoker:d.smoker,children:d.children,rules:d.rules||'',includeEletricityBill:d.includeEletricityBill,includeWaterBill:d.includeWaterBill,includeInternetBill:d.includeInternetBill,includeOthersBill:d.includeOthersBill,condominiumFee:d.condominiumFee?Number(d.condominiumFee):null,restrictedToSex:d.restrictedToSex||undefined,studentsOnly:d.studentsOnly,status:d.status,zipCode:d.zipCode})
    medias.value=d.medias||[]
  }catch{error.value='Não foi possível carregar o anúncio para edição.'}
})
async function submit(){loading.value=true;error.value='';message.value='';try{if(editing.value){await dwellingService.update(String(route.params.id),form.value);message.value='Anúncio atualizado.'}else{const created=await dwellingService.create(form.value);message.value='Anúncio criado. Agora adicione mídias.';await router.replace(`/anuncios/${created.id}/editar`)}}catch(e:any){error.value=e.response?.data?.message||e.response?.data?.error||'Não foi possível salvar.'}finally{loading.value=false}}
async function upload(event:Event){if(!editing.value){error.value='Salve o anúncio antes de enviar mídias.';return}const input=event.target as HTMLInputElement,file=input.files?.[0];if(!file)return;if(medias.value.length>=maxMedia.value){error.value=`Limite: ${maxMedia.value} mídias.`;return}try{const m=await dwellingService.uploadMedia(String(route.params.id),file);medias.value.push(m);message.value='Mídia enviada.'}catch{error.value='Falha no upload. PNG, JPG/JPEG e MP4 até 16 MB.'}finally{input.value=''}}
async function deleteMedia(id:string){await dwellingService.deleteMedia(String(route.params.id),id);medias.value=medias.value.filter(m=>m.id!==id)}
async function setCover(id:string){await dwellingService.setCover(String(route.params.id),id);medias.value=medias.value.map(m=>({...m,isCover:m.id===id}))}
</script>

<template><section class="section"><div class="container form-page-layout">
  <div class="form-page-head"><span class="eyebrow eyebrow--plain">ANUNCIANTE</span><h1>{{ editing?'Editar anúncio':'Nova moradia' }}</h1><p>O formulário cobre os campos existentes no modelo atual do backend.</p></div>
  <div v-if="message" class="alert alert-success">{{ message }}</div><div v-if="error" class="alert alert-error">{{ error }}</div>
  <form class="form-card form-card--wide" @submit.prevent="submit">
    <div class="form-section"><h2>Informações principais</h2><div class="form-grid form-grid--2">
      <label class="field field--span-2"><span>Título</span><input v-model="form.title" required/></label>
      <label class="field field--span-2"><span>Descrição</span><textarea v-model="form.description" rows="5" required/></label>
      <label class="field"><span>Preço</span><input v-model.number="form.price" type="number" min="0" step="0.01" required/></label>
      <label class="field"><span>Condomínio</span><input v-model.number="form.condominiumFee" type="number" min="0" step="0.01"/></label>
      <label class="field"><span>Tipo</span><select v-model="form.type"><option value="House">Casa</option><option value="Apartment">Apartamento</option><option value="Kitnet">Kitnet</option><option value="Room">Quarto</option><option value="Republic">República</option></select></label>
      <label class="field"><span>Objetivo</span><select v-model="form.goal"><option value="Rent">Aluguel</option><option value="Sell">Venda</option><option value="Vacation Home">Temporada</option></select></label>
      <label class="field"><span>Pagamento</span><select v-model="form.paymentConditions"><option value="Monthly">Mensal</option><option value="Weekly">Semanal</option><option value="Daily">Diário</option><option value="Yearly">Anual</option><option value="One Time">Único</option></select></label>
      <label class="field"><span>Status</span><select v-model="form.status"><option value="Active">Ativo</option><option value="Inactive">Inativo</option><option value="Draft">Rascunho</option><option value="Pending">Pendente</option><option value="Rented">Alugado</option><option value="Sold">Vendido</option></select></label>
    </div></div>

    <div class="form-section"><h2>Localização</h2><div class="form-grid form-grid--2">
      <label class="field field--span-2"><span>Endereço</span><input v-model="form.address" required/></label>
      <label class="field"><span>Bairro</span><input v-model="form.neighborhood" required/></label><label class="field"><span>CEP</span><input v-model="form.zipCode" maxlength="8" required/></label>
      <label class="field"><span>Cidade</span><input v-model="form.city" required/></label><label class="field"><span>Estado</span><input v-model="form.state" required/></label>
      <label class="field"><span>Latitude</span><input v-model.number="form.latitude" type="number" step="any" required/></label><label class="field"><span>Longitude</span><input v-model.number="form.longitude" type="number" step="any" required/></label>
    </div></div>

    <div class="form-section"><h2>Perfil e regras</h2><div class="form-grid form-grid--3">
      <label class="check-card"><input v-model="form.studentsOnly" type="checkbox"/><div><strong>Somente estudantes</strong></div></label>
      <label class="check-card"><input v-model="form.animals" type="checkbox"/><div><strong>Aceita animais</strong></div></label>
      <label class="check-card"><input v-model="form.furnished" type="checkbox"/><div><strong>Mobiliado</strong></div></label>
      <label class="check-card"><input v-model="form.smoker" type="checkbox"/><div><strong>Aceita fumantes</strong></div></label>
      <label class="check-card"><input v-model="form.children" type="checkbox"/><div><strong>Aceita crianças</strong></div></label>
    </div><div class="form-grid form-grid--2">
      <label class="field"><span>Restrição por sexo</span><select v-model="form.restrictedToSex"><option :value="undefined">Sem restrição</option><option value="MALE">Masculino</option><option value="FEMALE">Feminino</option></select></label>
      <label class="field"><span>Contato</span><input v-model="form.contact" required/></label><label class="field field--span-2"><span>Regras</span><textarea v-model="form.rules" rows="3"/></label>
    </div></div>

    <div class="form-section"><h2>Contas inclusas</h2><div class="form-grid form-grid--4">
      <label class="check-card"><input v-model="form.includeEletricityBill" type="checkbox"/><div><strong>Luz</strong></div></label>
      <label class="check-card"><input v-model="form.includeWaterBill" type="checkbox"/><div><strong>Água</strong></div></label>
      <label class="check-card"><input v-model="form.includeInternetBill" type="checkbox"/><div><strong>Internet</strong></div></label>
      <label class="check-card"><input v-model="form.includeOthersBill" type="checkbox"/><div><strong>Outras</strong></div></label>
    </div></div>
    <button class="btn btn-primary" :disabled="loading">{{ loading?'Salvando...':'Salvar anúncio' }}</button>
  </form>

  <section v-if="editing" class="media-manager">
    <div class="section-heading"><div><h2>Mídia</h2><p>{{ medias.length }}/{{ maxMedia }} arquivo(s). PNG, JPG/JPEG ou MP4, até 16 MB.</p></div><label class="btn btn-secondary"><ImagePlus :size="18"/> Adicionar mídia<input class="visually-hidden" type="file" accept="image/png,image/jpeg,video/mp4" @change="upload"/></label></div>
    <div v-if="medias.length" class="media-grid"><article v-for="m in medias" :key="m.id" class="media-card"><video v-if="m.filename.endsWith('.mp4')" :src="m.url" controls/><img v-else :src="m.url" alt="Mídia"/><div class="media-actions"><button class="icon-button" @click="setCover(m.id)"><Star :size="18"/></button><button class="icon-button icon-button--danger" @click="deleteMedia(m.id)"><Trash2 :size="18"/></button></div></article></div>
  </section>
</div></section></template>

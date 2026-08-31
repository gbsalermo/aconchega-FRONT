# Contrato Backend ↔ Frontend — Aconchega Aí

> **Data-base:** 31/08/2026  
> **Objetivo:** registrar o contrato HTTP que o frontend está assumindo hoje e os pontos que ainda precisam ser confirmados contra o backend real.

## 1. Base URL

Frontend atual:

```env
VITE_API_URL=http://localhost:3000/api
```

Axios usa essa variável como `baseURL`.

### Divergência histórica

Documentação Swagger antiga já indicou `/v1`, enquanto a implementação Express analisada montava as rotas em `/api`.

**Até a integração provar o contrário, este frontend usa `/api`.**

---

## 2. Autenticação

Header considerado:

```http
x-access-token: <jwt>
```

Persistência frontend atual:

```text
aconchega_token
aconchega_user
```

Em `401`, o interceptor limpa os dados locais.

### Validar

- nome exato do header;
- formato da resposta de login;
- expiração do token;
- comportamento de usuário banido;
- comportamento de conta não confirmada;
- status HTTP reais.

---

# 3. Accounts

## 3.1 Cadastro

```http
POST /accounts
```

Request frontend esperado:

```ts
{
  name: string
  email: string
  password: string
  gender: 'MALE' | 'FEMALE'
}
```

Validar:

- status de sucesso;
- corpo da resposta;
- mensagens de e-mail duplicado;
- validações de senha;
- validações de nome/gênero.

---

## 3.2 Confirmação

```http
POST /accounts/confirm?token=...
```

Validar:

- se `token` realmente vai em query string;
- status de token inválido/expirado;
- formato da resposta.

---

## 3.3 Reenvio/regeneração de confirmação

Rotas consideradas pelo frontend/histórico:

```http
POST /accounts/recover
POST /accounts/regenerate
```

A nomenclatura histórica precisa ser confirmada para evitar confusão entre confirmação de conta e recuperação de senha.

---

## 3.4 Login

```http
POST /accounts/login
```

Request esperado:

```ts
{
  email: string
  password: string
}
```

Resposta tipada atualmente como:

```ts
interface LoginResponse extends User {
  token: string
}
```

### Validar com prioridade

Pode ser que o backend devolva:

```text
{ token, user }
```

ou outro envelope.

Não manter a tipagem atual por conveniência se a resposta real tiver outro formato.

---

## 3.5 Recuperação/redefinição de senha

Rotas consideradas:

```http
POST /accounts/recover
POST /accounts/password-recovery
```

Validar:

- qual rota solicita recuperação;
- qual rota efetiva a nova senha;
- onde o token é enviado;
- nomes dos campos;
- status e mensagens.

---

## 3.6 Perfil

```http
GET /accounts/profile
PUT /accounts/profile
DELETE /accounts
```

Update frontend atualmente considera:

```ts
{
  password?: string
  isSmoker?: boolean
  isStudent?: boolean
}
```

Validar se nome/e-mail/gênero podem ou não ser alterados.

---

## 3.7 Foto de perfil

```http
PUT /accounts/profile/picture
DELETE /accounts/profile/picture
```

Regras históricas:

```text
PNG/JPEG
até 16 MiB
```

Validar:

- campo multipart exato;
- estrutura da resposta;
- URL final;
- remoção física/assíncrona.

---

# 4. Accounts — Administração

Rotas consideradas:

```http
GET    /accounts
GET    /accounts/profile/:id
PUT    /accounts/:id
POST   /accounts/ban/:id
DELETE /accounts/ban/:id
DELETE /accounts/:id
```

### Validar

- paginação de `GET /accounts`;
- parâmetros de busca;
- formato de `PaginatedUsers`;
- payload de banimento;
- campo `banReason`;
- regras de auto-banimento/admin;
- status de desbanimento;
- campos alteráveis por admin.

---

# 5. Dwellings

## 5.1 Criar anúncio

```http
POST /dwellings
```

Regras históricas:

- autenticado;
- conta confirmada.

Request atual:

```ts
interface CreateDwellingRequest {
  title: string
  description: string
  price: number
  address: string
  neighborhood: string
  city: string
  state: string
  type: DwellingType
  paymentConditions: DwellingPaymentConditions
  goal: DwellingGoal
  availability: DwellingAvailability
  latitude: number
  longitude: number
  contact: string
  animals?: boolean
  furnished?: boolean
  smoker?: boolean
  children?: boolean
  rules?: string
  includeEletricityBill?: boolean
  includeWaterBill?: boolean
  includeInternetBill?: boolean
  includeOthersBill?: boolean
  condominiumFee?: number | null
  restrictedToSex?: Gender
  studentsOnly?: boolean
  status: DwellingStatus
  zipCode: string
}
```

### Validar com prioridade

- campos realmente obrigatórios;
- defaults do backend;
- se `status` pode ser definido pelo usuário;
- se `availability` é obrigatório;
- precisão/formato de latitude/longitude;
- formato de CEP;
- telefone/contato;
- `restrictedToSex` nullable;
- grafia histórica `includeEletricityBill` versus possível correção futura.

---

## 5.2 Meus anúncios

```http
GET /dwellings/my
```

Validar formato.

Frontend espera conceito equivalente a:

```ts
{
  totalItems: number
  totalPages: number
  dwellings: Dwelling[]
}
```

Não assumir esse envelope sem testar.

---

## 5.3 Busca pública

```http
GET /dwellings/public/search
```

Busca atual permite parâmetros equivalentes a:

```ts
page
term
type
address
city
maximumPrice
condominiumFee
goal
children
animals
paymentConditions
includeEletricityBill
includeWaterBill
includeInternetBill
includeOthersBill
studentsOnly
restrictedToSex
ownerId
orderBy
order
```

Parâmetros geográficos podem ser restritos ao fluxo autenticado.

### Regra de negócio

Resposta pública pode esconder dados de contato/proprietário e outros campos sensíveis.

Frontend não deve depender de campos autenticados nessa rota.

---

## 5.4 Busca autenticada

```http
GET /dwellings/search
```

Pode aceitar também:

```text
latitude
longitude
distance
```

Validar quais informações adicionais aparecem no retorno.

---

## 5.5 Detalhe público

```http
GET /dwellings/public/:dwellingId
```

Validar quais campos são ocultados.

---

## 5.6 Detalhe autenticado

```http
GET /dwellings/:dwellingId
```

Validar:

- owner;
- contact;
- mídias;
- campos restritos;
- comportamento para anúncio inativo/pendente.

---

## 5.7 Atualizar anúncio

```http
PUT /dwellings/:dwellingId
```

**Ponto de dívida documental importante:** confirmar exatamente quais campos são aceitos.

Não enviar automaticamente todo `CreateDwellingRequest` como update até validar o backend.

---

## 5.8 Excluir anúncio

```http
DELETE /dwellings/:dwellingId
```

Validar:

- propriedade;
- status HTTP;
- comportamento das mídias;
- remoção assíncrona de objetos no S3.

---

# 6. Mídia de anúncio

## 6.1 Upload

```http
POST /dwellings/upload/:dwellingId
```

Regras históricas:

- autenticação;
- conta confirmada;
- proprietário do anúncio;
- PNG/JPEG/MP4;
- até 16 MiB por arquivo.

Validar:

- nome do campo multipart;
- upload unitário ou múltiplo;
- resposta;
- limites;
- URLs.

---

## 6.2 Remover mídia

```http
DELETE /dwellings/:dwellingId/medias/:mediaId
```

Validar resposta e eventual processamento via fila.

---

## 6.3 Definir capa

```http
PUT /dwellings/:dwellingId/medias/:mediaId/cover
```

O model histórico possui:

```ts
isCover?: boolean
```

Regra esperada:

> somente uma mídia deve ficar marcada como capa por anúncio.

Confirmar comportamento quando a capa atual é excluída.

---

# 7. Dwellings — Administração

Rotas consideradas:

```http
GET    /dwellings/admin/search
PUT    /dwellings/admin/:dwellingId
DELETE /dwellings/admin/:dwellingId/medias/:mediaId
DELETE /dwellings/admin/:dwellingId
```

Validar:

- filtros admin;
- paginação;
- campos editáveis;
- moderação/status;
- regras de exclusão;
- diferença entre dono e admin.

---

# 8. Platform

## 8.1 Limites

```http
GET /platform/limits
```

Frontend tipa:

```ts
interface PlatformLimits {
  paginationLimit: number
  unauthedUserDwellingsPageViewLimit: number
  unauthenticatedUserPageViewLimit: number
  maxDwellingMedia: number
}
```

### Validar

Há dois nomes historicamente semelhantes para limites de visitante. Confirmar campos reais antes de consolidar UI.

---

## 8.2 Estatísticas

```http
GET /platform/statistics
```

Uso: admin.

Frontend tipa campos como:

```text
totalDwellings
totalUsers
dwellingsMonthPercentage
dwellingsCountLastWeek
cityDwellingsRank
userDwellingsRank
dwellingsCountByType
activeDwellingsCount
adminUsersCount
activeUsersCount
bannedUsersCount
lastDwellings
lastUsers
```

Validar quais campos são obrigatórios/opcionais e formato de ranking/dias.

---

# 9. Enums

## User

```text
Gender:
MALE
FEMALE

UserRole:
ADMIN
USER
```

## DwellingType

```text
House
Apartment
Room
Republic
Kitnet
```

## DwellingGoal

```text
Rent
Sell
Vacation Home
```

## DwellingAvailability

```text
Available
Unavailable
```

## DwellingStatus

```text
Active
Inactive
Draft
Pending
Sold
Rented
```

## DwellingPaymentConditions

```text
Monthly
One Time
Daily
Weekly
Yearly
```

### Regra

Confirmar capitalização exata no backend. Não normalizar enums silenciosamente no frontend.

---

# 10. Estrutura `Dwelling` esperada atualmente

```ts
interface Dwelling {
  id: string
  title: string
  description: string
  price: number | string
  address: string
  neighborhood?: string
  city: string
  state?: string
  type: DwellingType
  paymentConditions: DwellingPaymentConditions
  goal: DwellingGoal
  availability?: DwellingAvailability
  latitude?: number | string
  longitude?: number | string
  contact?: string
  animals?: boolean
  furnished?: boolean
  smoker?: boolean
  children?: boolean
  rules?: string | null
  includeEletricityBill?: boolean
  includeWaterBill?: boolean
  includeInternetBill?: boolean
  includeOthersBill?: boolean
  condominiumFee?: number | string | null
  restrictedToSex?: Gender | null
  studentsOnly?: boolean
  status: DwellingStatus
  zipCode: string
  zipCodeFormatted?: string
  owner?: DwellingOwner
  medias?: DwellingMedia[] | null
  createdAt?: string
  updatedAt?: string
}
```

O uso de `number | string` em preço/coordenadas/condomínio existe para tolerar serialização decimal do backend. Durante integração, verificar se é possível normalizar esses campos com segurança no service/mapper do frontend.

---

# 11. Formato de erro

Ainda não há contrato oficial consolidado no frontend.

Durante integração, registrar exemplos reais de:

```text
400 validação
401 não autenticado
403 não autorizado / não confirmado
404 recurso inexistente
409 conflito
413 arquivo grande
422 se usado
500 erro interno
```

Objetivo posterior:

criar uma normalização única de erro para evitar cada view interpretar Axios de forma diferente.

---

# 12. Checklist de integração

## Conta

- [ ] cadastro real;
- [ ] confirmação real;
- [ ] reenvio de confirmação;
- [ ] login;
- [ ] sessão;
- [ ] logout;
- [ ] recuperação;
- [ ] redefinição;
- [ ] perfil;
- [ ] foto;
- [ ] exclusão de conta.

## Moradia

- [ ] busca pública;
- [ ] busca autenticada;
- [ ] filtros;
- [ ] paginação;
- [ ] detalhe público;
- [ ] detalhe autenticado;
- [ ] meus anúncios;
- [ ] criar;
- [ ] editar;
- [ ] excluir.

## Mídia

- [ ] upload PNG;
- [ ] upload JPEG;
- [ ] upload MP4;
- [ ] limite de tamanho;
- [ ] limite de quantidade;
- [ ] capa;
- [ ] remoção.

## Admin

- [ ] estatísticas;
- [ ] usuários;
- [ ] busca/paginação;
- [ ] banir;
- [ ] desbanir;
- [ ] editar usuário;
- [ ] excluir usuário;
- [ ] buscar anúncios;
- [ ] editar/moderar;
- [ ] remover mídia;
- [ ] excluir anúncio.

---

# 13. Regra de atualização deste documento

Quando uma integração confirmar um contrato:

1. atualizar este arquivo;
2. atualizar `src/types/api.ts` se necessário;
3. atualizar o service correspondente;
4. atualizar `CONTINUIDADE_FRONTEND.md` se a descoberta mudar o estado/plano;
5. atualizar backend Swagger/testes quando houver acesso e a inconsistência estiver no servidor.

Não deixar conhecimento importante apenas em conversa/chat.

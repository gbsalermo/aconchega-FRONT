# Continuidade — Aconchega Aí Frontend

> **Última atualização:** 31/08/2026  
> **Repositório:** `gbsalermo/aconchega-FRONT`  
> **Fase atual:** integração real, estabilização do frontend e refinamento da identidade visual  
> **Regra:** não criar um roadmap novo; preservar o planejamento já definido e apenas registrar o estado real.

---

## 1. Resumo executivo

O **Aconchega Aí** é uma plataforma para centralizar anúncios de moradia, inicialmente com foco em Cruz das Almas/BA e no contexto universitário. O produto permite que visitantes pesquisem imóveis/moradias, usuários autenticados tenham acesso a informações adicionais e usuários confirmados publiquem e gerenciem anúncios.

Este repositório contém o **frontend web atual**, implementado em **Vue 3 + TypeScript + Vite**.

Uma primeira implementação ampla foi adiantada para cobrir praticamente todo o escopo do MVP Web. Isso significa que as telas, services, tipos, navegação e fluxos principais já existem em código, mas ainda falta uma rodada sistemática de **validação ponta a ponta com o backend real**.

Portanto, o estado correto não é “frontend concluído”. O estado correto é:

> **estrutura funcional ampla implementada → integração real ainda precisa ser validada → depois estabilização, identidade visual final e testes.**

---

## 2. Objetivo do produto

O problema que o Aconchega Aí tenta resolver é a fragmentação da oferta de moradias em grupos, redes sociais e contatos informais.

O produto deve permitir:

1. visitante pesquisar moradias ativas;
2. visitante receber apenas os dados permitidos publicamente;
3. usuário autenticado receber informações adicionais;
4. usuário com e-mail confirmado publicar anúncios;
5. proprietário gerenciar seus anúncios e mídias;
6. administrador gerenciar usuários, anúncios e indicadores;
7. futuramente, o produto possuir também cliente Android.

O domínio do backend já suporta mais que apenas “aluguel estudantil”: existem tipos de moradia, venda, aluguel e casa de temporada.

---

## 3. Contexto do backend que este frontend consome

O backend histórico correto do Aconchega Aí foi analisado anteriormente como uma aplicação:

- Node.js;
- TypeScript;
- Express;
- Sequelize;
- PostgreSQL;
- JWT;
- Redis + BullMQ;
- Bull Board;
- S3 compatível / LocalStack;
- Nodemailer + Handlebars;
- Sentry;
- Jest + Supertest;
- Swagger/OpenAPI;
- arquitetura inspirada em Clean Architecture / Ports and Adapters.

Estrutura conceitual encontrada no backend:

```text
api/src/
├── domain/
├── data/
├── infra/
├── presentation/
├── validation/
├── main/
└── config/
```

Fluxo arquitetural esperado:

```text
Cliente
  ↓
Express / Routes / Adapters
  ↓
Presentation / Controllers
  ↓
Data / Use Cases
  ↓
Domain

Infra implementa os contratos internos para:
PostgreSQL / JWT / bcrypt / Redis / S3 / SMTP
```

### Regra importante

Não alterar o backend supondo MVC tradicional. A arquitetura existente utiliza casos de uso, protocols, factories e adapters intencionalmente.

### Não confundir com outro projeto

Existe um repositório público chamado `YanAlmeidaVR/aconchega-api`, em Java/Spring Boot, para gestão de pousada, hóspedes, quartos e reservas.

**Esse repositório NÃO é o backend deste frontend.**

Este frontend trabalha com os domínios:

```text
accounts
dwellings
platform
```

Qualquer IA que encontrar um projeto “Aconchega API” com `Hospede`, `Quarto` e `Reserva` deve descartá-lo como referência para este frontend.

---

## 4. Stack do frontend

Dependências principais:

- Vue 3;
- TypeScript 5;
- Vite 7;
- Vue Router 4;
- Pinia 3;
- Axios;
- Lucide Vue;
- CSS próprio.

Scripts disponíveis:

```bash
npm run dev
npm run typecheck
npm run build
npm run preview
```

Ainda não há dependências de Vitest, Vue Test Utils ou Playwright no `package.json`. Portanto, **testes frontend permanecem pendentes**.

---

## 5. Organização atual do frontend

Estrutura principal:

```text
src/
├── components/
│   ├── common/
│   ├── home/
│   ├── layout/
│   └── properties/
├── layouts/
├── router/
├── services/
├── stores/
├── styles/
├── types/
└── views/
    └── admin/
```

Principais responsabilidades:

### `components/`

Componentes reutilizáveis, como:

- marca;
- header/footer;
- Hero;
- cards de imóvel;
- badges;
- painéis de loading/erro/vazio.

### `views/`

Páginas ligadas ao Router:

- Home;
- busca/listagem;
- detalhes;
- login;
- cadastro;
- recuperação e redefinição de senha;
- confirmação de conta;
- perfil;
- meus anúncios;
- formulário de anúncio;
- administração;
- 404.

### `services/`

Separação de acesso HTTP por domínio:

```text
http.ts
account.service.ts
auth.service.ts
dwelling.service.ts
platform.service.ts
```

### `types/api.ts`

Centraliza os principais contratos TypeScript do backend.

### `stores/auth.ts`

Responsável por sessão, usuário atual e restauração da autenticação.

### `router/index.ts`

Define rotas e guards para:

- visitante;
- usuário autenticado;
- usuário confirmado;
- administrador.

---

## 6. Rotas e estado de implementação

### Público

```text
/
/imoveis
/imoveis/:id
/login
/cadastro
/recuperar-senha
/nova-senha
/confirmar-conta
```

### Autenticado

```text
/perfil
/meus-anuncios
/anuncios/novo
/anuncios/:id/editar
```

### Admin

```text
/admin
/admin/usuarios
/admin/imoveis
```

### 404

```text
/:pathMatch(.*)*
```

### Guards já existentes

- `requiresAuth`;
- `guestOnly`;
- `requiresAdmin`;
- `requiresConfirmed`.

**Atenção:** existência de guard em código não substitui validação de segurança no backend. O frontend só controla navegação/UX; autorização real deve continuar no servidor.

---

## 7. Estado real das funcionalidades

### Já estruturado em código

- navegação;
- layout responsivo;
- Home;
- busca/listagem;
- filtros;
- paginação;
- detalhes;
- cadastro;
- confirmação de conta;
- login/logout;
- recuperação de senha;
- store de autenticação;
- interceptor Axios;
- guards de rota;
- perfil;
- foto do usuário;
- meus anúncios;
- criação de anúncio;
- edição de anúncio;
- exclusão de anúncio;
- upload de mídia;
- remoção de mídia;
- definição de capa;
- telas admin;
- estatísticas;
- loading/erro/vazio;
- responsividade.

### Ainda NÃO pode ser considerado validado

- contratos reais de todas as respostas;
- fluxo completo cadastro → confirmação → login;
- persistência de sessão contra backend real;
- diferenças entre busca pública e autenticada;
- todos os filtros;
- paginação;
- criação real de anúncio;
- atualização real;
- exclusão real;
- multipart de imagem/vídeo;
- capa da mídia;
- perfil/foto;
- permissões admin;
- tratamento uniforme dos erros da API.

---

## 8. Fallback de Home

A Home chama a API real:

```text
GET /dwellings/public/search
```

Caso a requisição falhe, a página usa três moradias demonstrativas para manter a interface renderizada.

Isso foi uma decisão temporária para desenvolvimento visual.

### Regra durante a integração

Não interpretar o fallback como sucesso da API.

Durante validação real, observar explicitamente quando:

```text
apiUnavailable === true
```

O fallback pode continuar existindo como modo demonstrativo, mas não deve esconder regressões.

---

## 9. Contrato HTTP considerado

A variável atual é:

```env
VITE_API_URL=http://localhost:3000/api
```

O Axios usa essa URL como `baseURL`.

### Autenticação

Token salvo em:

```text
localStorage: aconchega_token
```

Usuário salvo em:

```text
localStorage: aconchega_user
```

Header enviado:

```http
x-access-token: <token>
```

Em resposta `401`, o interceptor remove os dados locais de sessão.

---

## 10. Endpoints considerados

### Accounts

```text
POST   /accounts
POST   /accounts/confirm?token=...
POST   /accounts/recover
POST   /accounts/regenerate
POST   /accounts/login
POST   /accounts/password-recovery
GET    /accounts/profile
PUT    /accounts/profile
PUT    /accounts/profile/picture
DELETE /accounts/profile/picture
DELETE /accounts
```

Admin:

```text
GET    /accounts
GET    /accounts/profile/:id
PUT    /accounts/:id
POST   /accounts/ban/:id
DELETE /accounts/ban/:id
DELETE /accounts/:id
```

### Dwellings

```text
POST   /dwellings
POST   /dwellings/upload/:dwellingId
GET    /dwellings/my
GET    /dwellings/public/search
GET    /dwellings/search
GET    /dwellings/:dwellingId
GET    /dwellings/public/:dwellingId
PUT    /dwellings/:dwellingId
DELETE /dwellings/:dwellingId
DELETE /dwellings/:dwellingId/medias/:mediaId
PUT    /dwellings/:dwellingId/medias/:mediaId/cover
```

Admin:

```text
GET    /dwellings/admin/search
PUT    /dwellings/admin/:dwellingId
DELETE /dwellings/admin/:dwellingId/medias/:mediaId
DELETE /dwellings/admin/:dwellingId
```

### Platform

```text
GET /platform/limits
GET /platform/statistics
```

---

## 11. Regras de negócio consideradas

- criação de anúncio exige autenticação;
- publicação exige conta confirmada;
- upload exige autenticação, confirmação e propriedade do anúncio;
- visitante recebe menos informações que usuário autenticado;
- número máximo de mídias vem de `/platform/limits`;
- busca pública possui limites específicos configurados no backend;
- foto de perfil aceita PNG/JPEG;
- mídia de anúncio aceita PNG/JPEG/MP4;
- limite histórico identificado por arquivo: 16 MiB;
- proprietário administra os próprios anúncios;
- administrador possui operações específicas de gestão.

---

## 12. Enums atualmente tipados

### Usuário

```text
Gender: MALE | FEMALE
UserRole: ADMIN | USER
```

### Moradia

```text
DwellingType:
House | Apartment | Room | Republic | Kitnet

DwellingGoal:
Rent | Sell | Vacation Home

DwellingAvailability:
Available | Unavailable

DwellingStatus:
Active | Inactive | Draft | Pending | Sold | Rented

DwellingPaymentConditions:
Monthly | One Time | Daily | Weekly | Yearly
```

---

## 13. Divergências conhecidas do backend

Na análise histórica foram encontradas divergências entre Swagger e código real.

### 13.1 Base URL

Swagger histórico indicava `/v1`, enquanto o Express montava as rotas em `/api`.

O frontend atual usa:

```text
/api
```

### 13.2 `Dwelling`

Alguns schemas Swagger não refletiam todos os campos presentes no model Sequelize.

### 13.3 Mídia

O model possui `isCover`, mas a documentação histórica não era totalmente consistente.

### 13.4 Update

Precisamos confirmar os campos realmente aceitos por `PUT /dwellings/:id`.

### 13.5 Erros

O formato das respostas de erro precisa ser normalizado a partir da API real.

### 13.6 Paginação

Confirmar formato de:

- `/dwellings/my`;
- buscas públicas;
- buscas autenticadas;
- buscas admin;
- listagem de usuários admin.

### Ordem de fonte de verdade durante integração

Usar:

```text
1. comportamento da API real
2. rotas/código do backend
3. models/use cases
4. testes do backend
5. Swagger atualizado
6. documentação histórica
```

Se houver conflito, não alterar o frontend “no escuro”. Primeiro identificar qual contrato o backend realmente entrega.

---

## 14. Decisões visuais

### Referência inicial

A Home tomou como referência visual:

```text
AAYUSH412/Real-Estate-Website
```

Elementos usados como direção:

- estrutura de hero;
- navegação;
- CTA;
- composição imobiliária;
- destaque visual de imóvel.

### Identidade local

Paleta atual:

```text
#E6CC27 — amarelo
#302825 — carvão
#FBFAF5 — claro
```

Ela foi inspirada na bandeira de Cruz das Almas.

### Decisão mais recente

A primeira versão foi considerada **boa, porém genérica**.

Logo, a identidade visual atual **não está encerrada**.

Próxima evolução visual deve:

- criar elementos próprios do Aconchega Aí;
- reforçar sensação de comunidade/localidade;
- diferenciar marca de templates imobiliários genéricos;
- preservar simplicidade;
- preservar responsividade;
- preservar a paleta ligada a Cruz das Almas;
- não copiar literalmente o projeto de referência.

Não substituir a identidade por um tema completamente diferente sem registrar nova decisão.

---

## 15. Roadmap oficial e relação com o estado atual

O planejamento original do frontend continha estas etapas:

```text
1. Entender frontend atual
2. Home
3. API real
4. TypeScript
5. Busca/listagem
6. Detalhes
7. Login
8. Cadastro
9. Área autenticada
10. Criar anúncio
11. Upload
12. Editar/excluir
13. UX
14. Testes
15. MVP WEB
16+. Mobile
```

Durante a implementação inicial, várias etapas foram **adiantadas em código**.

Isso não muda o roadmap.

### Interpretação correta

- Etapas 1–13: estrutura majoritariamente implementada;
- Etapas dependentes da API: **não validadas ponta a ponta**;
- Etapa 14: não iniciada de forma formal;
- Marco MVP Web: ainda não validado;
- Mobile: não iniciado.

Consulte `docs/ETAPAS_E_STATUS.md` para a matriz completa.

---

## 16. Planejamento atual de execução

### Foco atual

**Integração e estabilização do MVP Web.**

Ordem operacional:

1. executar backend e frontend simultaneamente;
2. confirmar `VITE_API_URL`;
3. cadastro;
4. confirmação de conta;
5. login;
6. restauração/logout;
7. busca pública;
8. detalhes públicos;
9. busca/detalhes autenticados;
10. perfil;
11. foto do perfil;
12. meus anúncios;
13. criação de anúncio;
14. upload de mídia;
15. capa/remoção de mídia;
16. edição;
17. exclusão;
18. admin;
19. limites/estatísticas;
20. revisar mensagens de erro e UX;
21. refinar identidade visual;
22. configurar testes frontend;
23. validar build/typecheck/testes;
24. fechar o marco MVP Web;
25. iniciar Mobile apenas depois disso.

Essa lista não é um novo roadmap: ela detalha a execução necessária para concluir as etapas já existentes.

---

## 17. Planejamento de aprendizado

A regra definida para o projeto é:

> o projeto dita a ordem; o curso serve como revisão quando necessário.

Não reiniciar HTML/CSS e JavaScript básico como se o desenvolvimento estivesse no zero.

Para dúvidas durante o frontend, revisar apenas o conteúdo necessário sobre:

- módulos;
- async/await;
- Axios;
- TypeScript;
- Vue;
- Pinia;
- Router;
- formulários;
- upload;
- testes.

Após o MVP Web, o Mobile continua planejado com:

- Kotlin;
- Jetpack Compose;
- Retrofit;
- OkHttp;
- Coroutines;
- ViewModel;
- StateFlow;
- DataStore.

---

## 18. Pendências técnicas

### Críticas antes do MVP Web

- [ ] validar integração real;
- [ ] corrigir contratos divergentes;
- [ ] validar autenticação;
- [ ] validar permissões;
- [ ] validar upload;
- [ ] validar admin;
- [ ] configurar testes frontend;
- [ ] garantir `npm run typecheck`;
- [ ] garantir `npm run build`.

### Produto/UX

- [ ] tornar identidade visual menos genérica;
- [ ] substituir imagens temporárias/externas por ativos definitivos;
- [ ] revisar mensagens de erro;
- [ ] revisar feedback de sucesso;
- [ ] revisar acessibilidade básica;
- [ ] revisar experiência mobile real.

### Documentação/contrato

- [ ] reconciliar `/v1` x `/api` no backend;
- [ ] reconciliar schemas Swagger com models;
- [ ] confirmar update de Dwelling;
- [ ] confirmar paginação;
- [ ] registrar formato oficial de erro.

---

## 19. O que uma próxima IA NÃO deve fazer

1. Não criar um roadmap novo sem necessidade.
2. Não considerar o MVP Web concluído só porque as telas existem.
3. Não iniciar Mobile antes de estabilizar o Web.
4. Não trocar Vue por outro framework.
5. Não trocar TypeScript por JavaScript puro.
6. Não reescrever o frontend inteiro para corrigir um fluxo isolado.
7. Não alterar endpoints baseado apenas no Swagger antigo.
8. Não remover a diferença entre dados públicos e autenticados.
9. Não tratar guards frontend como segurança suficiente.
10. Não confundir o backend de moradias com o projeto Java de pousada chamado Aconchega.
11. Não copiar literalmente o projeto `AAYUSH412/Real-Estate-Website`.
12. Não descartar a ligação visual com Cruz das Almas sem uma decisão explícita.
13. Não usar mocks para declarar integração concluída.

---

## 20. O que fazer antes de qualquer alteração grande

Leia nesta ordem:

1. `README.md`;
2. `docs/GUIA_PARA_OUTRA_IA.md`;
3. `docs/DOSSIE_PROJETO_ACONCHEGA.md`;
4. este arquivo;
5. `docs/ETAPAS_E_STATUS.md`;
6. `docs/DECISOES_PROJETO.md`;
7. `docs/CONTRATO_BACKEND_FRONTEND.md`;
8. os arquivos reais de `src/services`, `src/types`, `src/router` e a tela que será alterada.

Depois:

1. identificar a etapa atual;
2. confirmar o contrato real necessário;
3. fazer alteração pequena e rastreável;
4. validar o fluxo;
5. atualizar a documentação se uma decisão mudar.

---

## 21. Definição de pronto do MVP Web

O MVP Web só deve ser marcado como concluído quando:

- [ ] Home funciona com API real;
- [ ] busca/listagem funciona;
- [ ] filtros funcionam;
- [ ] paginação funciona;
- [ ] detalhes funcionam;
- [ ] login funciona;
- [ ] cadastro funciona;
- [ ] confirmação funciona;
- [ ] recuperação funciona;
- [ ] perfil funciona;
- [ ] meus anúncios funciona;
- [ ] criar funciona;
- [ ] editar funciona;
- [ ] excluir funciona;
- [ ] upload funciona;
- [ ] capa/remoção de mídia funciona;
- [ ] guards e permissões estão coerentes;
- [ ] admin funciona;
- [ ] loading/erro/vazio estão consistentes;
- [ ] layout é responsivo;
- [ ] identidade visual foi refinada;
- [ ] typecheck passa;
- [ ] build passa;
- [ ] testes essenciais existem e passam.

---

## 22. Estado final para handoff

Se outra IA assumir o projeto agora, ela deve entender em uma frase:

> **O Aconchega Aí Frontend já possui quase todo o MVP Web estruturado em Vue/TypeScript, mas ainda está na fase de provar que esses fluxos funcionam contra o backend real; depois disso vêm estabilização, identidade visual própria, testes e só então Mobile.**

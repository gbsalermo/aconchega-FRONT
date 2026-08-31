# Aconchega Aí — Frontend

Frontend web do **Aconchega Aí**, plataforma para busca, divulgação e gerenciamento de moradias, com foco inicial em **Cruz das Almas/BA** e no público universitário da região.

> **Última revisão documental:** 31/08/2026  
> **Estado atual:** primeira implementação ampla do frontend concluída em código; próxima fase é **integração real + estabilização + refinamento de identidade visual**.

---

## 1. O que é este repositório

Este repositório contém o **frontend web atual e independente** do Aconchega Aí.

Ele substitui, para a evolução atual do projeto, a dependência do antigo frontend MVP/submódulo existente no repositório original do backend.

O frontend já possui estrutura para:

- Home pública;
- listagem, busca, filtros e paginação de moradias;
- detalhes de anúncio;
- cadastro, confirmação de conta, login e recuperação de senha;
- perfil e foto do usuário;
- área de "meus anúncios";
- criação, edição e exclusão de anúncios;
- upload de imagens/vídeo e escolha de capa;
- guards de autenticação, conta confirmada e administrador;
- administração de usuários e anúncios;
- estatísticas da plataforma;
- estados de loading, erro e vazio;
- responsividade desktop, tablet e mobile.

**Importante:** "estar implementado em código" não significa que todos os fluxos já foram validados contra uma instância real do backend. A integração ponta a ponta é a etapa atual.

---

## 2. Stack

- **Vue 3**
- **TypeScript 5**
- **Vite 7**
- **Vue Router 4**
- **Pinia 3**
- **Axios**
- **Lucide Vue**
- **CSS responsivo próprio**

Neste momento o projeto **não possui suíte de testes frontend configurada**. A etapa de testes permanece pendente no planejamento oficial.

---

## 3. Identidade visual

A direção visual atual usa a bandeira de **Cruz das Almas** como referência cromática:

- `#E6CC27` — amarelo principal;
- `#302825` — carvão;
- `#FBFAF5` — fundo claro.

A primeira composição da Home foi inspirada no projeto público [`AAYUSH412/Real-Estate-Website`](https://github.com/AAYUSH412/Real-Estate-Website), principalmente em:

- navegação superior;
- hero dividido em duas áreas;
- CTA de busca;
- cartão de imóvel em destaque;
- hierarquia visual de landing page imobiliária.

Essa referência é **direção de composição, não identidade final**.

### Decisão atual de design

A primeira versão ficou funcional e visualmente consistente, porém ainda **genérica demais** para o produto. A próxima rodada visual deve tornar o Aconchega Aí reconhecível por si só, preservando:

- a conexão com Cruz das Almas;
- a paleta amarelo/carvão;
- a leveza e responsividade;
- a clareza de uma plataforma de moradia.

Não transformar a interface em uma cópia do projeto de referência.

---

## 4. Executando o frontend

```bash
cp .env.example .env
npm install
npm run dev
```

API esperada atualmente:

```env
VITE_API_URL=http://localhost:3000/api
```

Outros comandos:

```bash
npm run typecheck
npm run build
npm run preview
```

---

## 5. Rotas já preparadas

### Público

- `/` — Home
- `/imoveis` — busca/listagem
- `/imoveis/:id` — detalhes
- `/login`
- `/cadastro`
- `/recuperar-senha`
- `/nova-senha`
- `/confirmar-conta`

### Usuário autenticado

- `/perfil`
- `/meus-anuncios`
- `/anuncios/novo`
- `/anuncios/:id/editar`

### Administração

- `/admin`
- `/admin/usuarios`
- `/admin/imoveis`

### Fallback

- qualquer rota desconhecida → página 404

---

## 6. Integração com o backend correto

O frontend foi construído para o backend histórico do **Aconchega Aí de moradias**, implementado em **Node.js + TypeScript + Express**, com arquitetura baseada em Clean Architecture, Sequelize/PostgreSQL, JWT, Redis/BullMQ e storage S3 compatível.

O contrato considerado pelo frontend possui os domínios:

- `accounts`;
- `dwellings`;
- `platform`.

A autenticação utiliza atualmente:

```http
x-access-token: <token>
```

### Atenção a repositórios com nome parecido

**Não utilizar `YanAlmeidaVR/aconchega-api` como backend deste frontend.** Esse é outro projeto, feito em Java/Spring Boot, voltado a gestão de pousada/hóspedes/quartos/reservas, e não corresponde ao domínio `accounts/dwellings/platform` utilizado aqui.

O backend original do produto foi documentado anteriormente como `aconchega-ai` e deve ser validado diretamente pelo código real antes de qualquer alteração de contrato.

---

## 7. Contrato atual considerado

Base HTTP usada pelo frontend:

```text
/api
```

Principais grupos:

```text
/api/accounts
/api/dwellings
/api/platform
```

O projeto contém tipagem TypeScript para `User`, `Dwelling`, `DwellingMedia`, filtros, paginação, limites e estatísticas.

Há divergências conhecidas entre documentação Swagger histórica e implementação real do backend. Por isso, durante a integração, a prioridade deve ser:

1. código/rotas realmente executadas pelo backend;
2. models e casos de uso reais;
3. testes do backend;
4. Swagger atualizado;
5. documentação histórica.

Consulte [`docs/CONTRATO_BACKEND_FRONTEND.md`](./docs/CONTRATO_BACKEND_FRONTEND.md).

---

## 8. Estado atual do projeto

| Área | Estado |
|---|---|
| Estrutura Vue/TypeScript | concluída |
| Home e componentes base | estruturados |
| Busca/listagem/detalhes | estruturados |
| Autenticação e guards | estruturados |
| Perfil e meus anúncios | estruturados |
| CRUD de anúncios | estruturado |
| Mídia | estruturada |
| Área admin | estruturada |
| Integração real ponta a ponta | **em validação / pendente** |
| Refinamento de identidade própria | **pendente** |
| Testes automatizados frontend | **pendente** |
| MVP Web validado | **ainda não** |
| Mobile Android | **não iniciado** |

A Home possui fallback com dados demonstrativos quando a API está indisponível. Esse fallback existe apenas para permitir desenvolvimento visual sem backend e não deve mascarar falhas de integração durante a etapa de validação.

---

## 9. Próxima ordem de trabalho

Não criar uma nova sequência paralela de etapas. O roadmap original foi preservado e o frontend foi apenas adiantado em implementação.

A retomada deve seguir esta ordem:

1. subir backend e frontend juntos;
2. validar cadastro → confirmação → login;
3. validar busca pública;
4. validar detalhes público e autenticado;
5. validar criação de anúncio;
6. validar upload/remoção/capa de mídia;
7. validar edição e exclusão;
8. validar perfil e meus anúncios;
9. validar administração;
10. corrigir contratos encontrados na integração;
11. refinar a identidade visual para deixá-la menos genérica;
12. configurar testes frontend;
13. validar o marco **MVP Web**;
14. somente depois iniciar a fase Mobile.

---

## 10. Documentação oficial deste frontend

Leia nesta ordem antes de continuar o projeto:

1. [`docs/GUIA_PARA_OUTRA_IA.md`](./docs/GUIA_PARA_OUTRA_IA.md) — instruções rápidas de handoff;
2. [`docs/DOSSIE_PROJETO_ACONCHEGA.md`](./docs/DOSSIE_PROJETO_ACONCHEGA.md) — visão completa do produto e arquitetura;
3. [`CONTINUIDADE_FRONTEND.md`](./CONTINUIDADE_FRONTEND.md) — estado real e próxima execução;
4. [`docs/ETAPAS_E_STATUS.md`](./docs/ETAPAS_E_STATUS.md) — roadmap preservado + situação de cada etapa;
5. [`docs/DECISOES_PROJETO.md`](./docs/DECISOES_PROJETO.md) — decisões que não devem ser desfeitas sem motivo;
6. [`docs/CONTRATO_BACKEND_FRONTEND.md`](./docs/CONTRATO_BACKEND_FRONTEND.md) — contrato HTTP e pontos de validação;
7. [`THIRD_PARTY_NOTICES.md`](./THIRD_PARTY_NOTICES.md) — referência visual de terceiros.

---

## 11. Regra de continuidade

A prioridade agora não é "criar mais telas". É transformar a estrutura já adiantada em um frontend **integrado, confiável, testado e com identidade própria**.

Ao corrigir problemas, preferir ajustes incrementais por fluxo em vez de reescrever o projeto inteiro.

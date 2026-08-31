# Dossiê do Projeto — Aconchega Aí

> **Data-base:** 31/08/2026  
> **Objetivo:** registrar contexto de produto, arquitetura, decisões, estado atual, riscos e continuidade para que outra pessoa ou IA consiga assumir o desenvolvimento sem depender do histórico da conversa.

---

## 1. Resumo do produto

O **Aconchega Aí** é uma plataforma de busca, divulgação e gerenciamento de moradias.

O foco inicial está em **Cruz das Almas/BA**, especialmente no cenário universitário, onde quartos, repúblicas, kitnets, casas e apartamentos costumam ser divulgados em grupos e contatos informais.

A proposta é centralizar essas ofertas e permitir busca estruturada, filtros, controle de visibilidade e gerenciamento dos anúncios.

O domínio já suporta:

- aluguel;
- venda;
- casa de temporada;
- quartos;
- repúblicas;
- kitnets;
- casas;
- apartamentos.

---

## 2. Perfis e comportamento esperado

### Visitante

Pode:

- acessar Home;
- pesquisar moradias;
- usar filtros públicos;
- abrir detalhes públicos;
- cadastrar conta;
- entrar na plataforma.

Recebe um conjunto reduzido de informações quando comparado ao usuário autenticado.

### Usuário autenticado

Pode:

- visualizar dados adicionais permitidos;
- editar perfil;
- gerenciar foto;
- consultar seus anúncios;
- editar/excluir anúncios próprios.

### Usuário autenticado e confirmado

Além do anterior, pode publicar novos anúncios e enviar mídias quando as regras do backend permitirem.

### Administrador

Possui telas para:

- estatísticas;
- usuários;
- banimento/desbanimento;
- anúncios;
- moderação/edição/exclusão administrativa.

---

## 3. Repositórios e escopo

### Frontend atual

```text
gbsalermo/aconchega-FRONT
```

Responsabilidade:

- cliente web atual;
- interface Vue/TypeScript;
- integração HTTP;
- estado de sessão;
- UX e responsividade.

### Backend histórico do produto

A análise anterior do projeto original identificou um repositório `aconchega-ai` com backend Node.js/TypeScript dentro de `api/` e antigos clientes como submódulos.

A documentação histórica registrava o repositório como `dinhostork/aconchega-ai`. A disponibilidade atual desse repositório deve ser confirmada diretamente quando necessário.

O importante para continuidade é identificar o backend pelo domínio e arquitetura:

```text
Node.js + TypeScript + Express
/accounts
/dwellings
/platform
```

### Repositório com nome parecido que NÃO pertence ao produto

```text
YanAlmeidaVR/aconchega-api
```

Esse projeto é Java/Spring Boot e trata:

```text
Hospede
Quarto
Reserva
```

É outro sistema. Não usar como backend deste frontend.

---

## 4. Arquitetura do backend histórico

O backend analisado segue fortemente princípios de:

- Clean Architecture;
- SOLID;
- Dependency Inversion;
- Ports and Adapters;
- factories para composição de dependências;
- controllers independentes de Express;
- protocols para infraestrutura.

Estrutura:

```text
api/src/
├── domain/
│   ├── entities/
│   ├── errors/
│   ├── models/
│   └── useCases/
├── data/
│   ├── protocols/
│   └── usecases/
├── infra/
│   ├── cryptography/
│   ├── db/
│   ├── mail/
│   ├── mappers/
│   ├── queue/
│   ├── token/
│   └── validator/
├── presentation/
├── validation/
├── main/
│   ├── adapters/
│   ├── factories/
│   ├── routes/
│   ├── docs/
│   └── workers/
└── config/
```

Princípio de dependência:

```text
Domain
  ↑
Data
  ↑
Presentation

Infra implementa contratos
Main compõe as dependências
Express fica na borda
```

### Regra para backend

Não mover regras de negócio para controllers/rotas e não acessar Sequelize diretamente a partir da camada HTTP.

Ao criar feature de backend, o padrão esperado é:

1. domínio/contrato;
2. protocol de persistência quando necessário;
3. use case;
4. repository/adapter de infra;
5. controller;
6. validação;
7. factory;
8. rota;
9. Swagger;
10. testes.

---

## 5. Infraestrutura do backend histórico

Tecnologias encontradas:

### API e dados

- Node.js;
- TypeScript;
- Express;
- Sequelize;
- PostgreSQL;
- SQLite em testes;
- JWT;
- bcrypt;
- Yup.

### Filas

- Redis;
- BullMQ;
- Bull Board;
- workers separados.

### Arquivos

- S3 ou storage compatível;
- AWS SDK;
- LocalStack em desenvolvimento.

### E-mail

- Nodemailer;
- Handlebars;
- jobs assíncronos.

### Observabilidade e qualidade

- Sentry;
- Jest;
- Supertest;
- ESLint;
- Prettier;
- Husky;
- GitHub Actions.

---

## 6. Modelo de domínio principal

### User

Campos relevantes identificados historicamente:

- id UUID;
- name;
- email;
- password;
- gender;
- role;
- confirmed;
- tokens de confirmação/recuperação;
- photoUrl;
- isSmoker;
- isStudent;
- banned;
- bannedBy;
- banReason;
- bannedAt.

### Dwelling

Campos relevantes:

- id;
- title;
- description;
- price;
- address;
- neighborhood;
- city;
- state;
- type;
- paymentConditions;
- goal;
- availability;
- latitude;
- longitude;
- contact;
- animals;
- furnished;
- smoker;
- children;
- rules;
- contas inclusas;
- condominiumFee;
- restrictedToSex;
- studentsOnly;
- status;
- ownerId;
- zipCode.

### DwellingMedia

- id;
- dwellingId;
- filename;
- metadata;
- isCover.

Relações conceituais:

```text
User 1 ─── N Dwelling
Dwelling 1 ─── N DwellingMedia
```

---

## 7. Regras importantes do backend

### Conta

- cadastro gera fluxo de confirmação;
- e-mails podem ser processados via fila;
- login usa JWT;
- usuário pode ser banido;
- perfil tem regras próprias de atualização;
- foto tem upload/remoção.

### Autenticação

Header histórico utilizado:

```http
x-access-token: <jwt>
```

### Anúncio

Criar anúncio exige:

- usuário autenticado;
- conta confirmada.

### Mídia

Upload exige:

- autenticação;
- confirmação;
- existência do anúncio;
- propriedade do anúncio.

Tipos historicamente aceitos:

```text
PNG
JPEG
MP4
```

Limite identificado por arquivo:

```text
16 MiB
```

### Público x autenticado

A separação entre:

```text
/dwellings/public/search
/dwellings/search
```

é regra de negócio e não deve ser eliminada apenas para simplificar o frontend.

---

## 8. Arquitetura do frontend atual

Stack:

```text
Vue 3
TypeScript 5
Vite 7
Vue Router 4
Pinia 3
Axios
Lucide Vue
CSS próprio
```

Estrutura:

```text
src/
├── components/
├── layouts/
├── router/
├── services/
├── stores/
├── styles/
├── types/
└── views/
```

### Decisões arquiteturais frontend

- views representam páginas;
- components representam blocos reutilizáveis;
- services concentram HTTP;
- `types/api.ts` concentra contratos principais;
- Pinia concentra sessão de autenticação;
- Router concentra navegação e guards;
- Axios interceptor injeta token;
- CSS próprio preserva controle visual e reduz dependência de framework UI.

---

## 9. Rotas do frontend

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

Fallback global existe.

---

## 10. Contrato frontend/backend atual

Base configurada:

```env
VITE_API_URL=http://localhost:3000/api
```

Domínios:

```text
/accounts
/dwellings
/platform
```

Os endpoints detalhados estão em:

```text
docs/CONTRATO_BACKEND_FRONTEND.md
```

---

## 11. Divergências documentais conhecidas

A análise histórica encontrou pontos que precisam de validação:

1. Swagger indicava `/v1`, Express utilizava `/api`;
2. schemas Swagger de `Dwelling` não refletiam todos os campos do model;
3. `DwellingMedia.isCover` não aparecia consistentemente;
4. campos aceitos no update de anúncio precisam ser confirmados;
5. formato de erros precisa ser padronizado;
6. paginação precisa ser confirmada em vários endpoints.

### Prioridade de fonte de verdade

```text
API real
  ↓
rotas/código do backend
  ↓
models/use cases
  ↓
testes
  ↓
Swagger atualizado
  ↓
documentação antiga
```

---

## 12. Identidade visual

### Direção inicial

Referência:

```text
AAYUSH412/Real-Estate-Website
```

Usada como inspiração de composição, não como identidade a ser copiada.

### Paleta

```text
#E6CC27
#302825
#FBFAF5
```

Baseada na bandeira de Cruz das Almas.

### Estado atual da decisão

A interface inicial foi considerada visualmente boa, mas **genérica**.

A identidade final ainda precisa ser refinada.

Objetivo da próxima rodada:

- reforçar caráter local;
- criar elementos reconhecíveis do Aconchega Aí;
- manter visual leve;
- evitar aparência de template imobiliário genérico;
- manter o amarelo/carvão como ponto de partida;
- preservar responsividade.

---

## 13. Histórico do planejamento de aprendizado

O projeto também é usado como desenvolvimento prático de frontend.

Regra consolidada:

```text
Projeto define a necessidade
        ↓
revisar conteúdo específico quando travar
        ↓
voltar ao projeto
```

O curso JavaScript + TypeScript do Luiz Otávio Miranda funciona como apoio, não como ordem rígida de desenvolvimento.

Não reiniciar HTML/CSS e JavaScript básico desnecessariamente.

---

## 14. Roadmap preservado

Frontend Web:

```text
1. Entender frontend
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
```

Depois:

```text
Mobile Android
```

Detalhamento e status em:

```text
docs/ETAPAS_E_STATUS.md
```

---

## 15. Onde estamos exatamente

A implementação atual adiantou quase todo o frontend Web de uma vez.

Já existem código e telas para a maior parte das etapas 1–13.

Porém, a situação correta é:

```text
Implementação estrutural ampla: SIM
Integração real completa: NÃO VALIDADA
Testes frontend: NÃO CONFIGURADOS
Identidade visual final: NÃO FECHADA
MVP Web: NÃO FECHADO
Mobile: NÃO INICIADO
```

### Fase atual

```text
INTEGRAÇÃO + ESTABILIZAÇÃO DO MVP WEB
```

---

## 16. Próximos passos reais

1. iniciar backend real;
2. iniciar frontend;
3. validar cadastro;
4. validar confirmação;
5. validar login;
6. validar sessão/logout;
7. validar busca pública;
8. validar detalhes;
9. validar comportamento autenticado;
10. validar perfil;
11. validar meus anúncios;
12. validar criar anúncio;
13. validar mídia;
14. validar editar/excluir;
15. validar admin;
16. ajustar contratos;
17. revisar UX;
18. diferenciar identidade visual;
19. configurar testes;
20. garantir typecheck/build/testes;
21. fechar MVP Web;
22. só então iniciar Android.

---

## 17. Riscos atuais

### Risco 1 — documentação dar falsa sensação de conclusão

Mitigação: separar sempre “estruturado” de “validado”.

### Risco 2 — backend errado por nome parecido

Mitigação: identificar backend pelo domínio `/accounts`, `/dwellings`, `/platform`.

### Risco 3 — Swagger antigo gerar contrato incorreto

Mitigação: validar API real e código antes de alterar tipos.

### Risco 4 — fallback da Home esconder backend quebrado

Mitigação: observar estado de indisponibilidade durante integração.

### Risco 5 — frontend virar cópia de referência

Mitigação: usar referência apenas para composição e evoluir marca própria.

### Risco 6 — avançar para Mobile cedo demais

Mitigação: Mobile somente depois do marco MVP Web.

### Risco 7 — reescrita desnecessária

Mitigação: corrigir por fluxo e preservar arquitetura que já funciona.

---

## 18. Definition of Done do projeto Web atual

Antes de declarar MVP Web:

### Funcional

- cadastro;
- confirmação;
- login/logout;
- recuperação;
- Home real;
- busca;
- filtros;
- paginação;
- detalhes;
- perfil;
- meus anúncios;
- criar/editar/excluir;
- mídia;
- admin.

### UX

- loading;
- erro;
- vazio;
- feedback de sucesso;
- responsividade;
- acessibilidade básica;
- identidade visual própria.

### Qualidade

- typecheck;
- build;
- testes essenciais;
- contratos documentados.

---

## 19. Regra de manutenção documental

Se uma decisão mudar, atualizar no mesmo trabalho:

- `CONTINUIDADE_FRONTEND.md`;
- `docs/DECISOES_PROJETO.md` se for decisão arquitetural/produto;
- `docs/CONTRATO_BACKEND_FRONTEND.md` se for contrato HTTP;
- `docs/ETAPAS_E_STATUS.md` se alterar estado de etapa;
- `README.md` se alterar visão geral/setup.

Evitar múltiplos documentos contraditórios.

---

## 20. Resumo de handoff

> Aconchega Aí é uma plataforma de moradias. O frontend atual está em `gbsalermo/aconchega-FRONT`, usa Vue 3 + TypeScript e já possui quase todo o MVP Web estruturado. O backend correto é o histórico Node/TypeScript/Express com `accounts/dwellings/platform`, não o projeto Java de pousada com nome parecido. A prioridade agora é validar a integração real por fluxo, corrigir contratos, tornar a identidade menos genérica, configurar testes e fechar o MVP Web. Mobile só vem depois.

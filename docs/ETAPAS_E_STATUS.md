# Etapas e status — Aconchega Aí

> Este arquivo **não cria um roadmap novo**. Ele preserva o roadmap prático já definido e adiciona apenas o estado atual de cada etapa em 31/08/2026.

## Legenda

- **Concluída:** entrega existe e não depende de validação posterior relevante para ser considerada encerrada.
- **Estruturada:** implementação existe em código, mas depende de validação real/ajustes.
- **Em validação:** é parte direta do foco atual.
- **Pendente:** ainda não foi executada formalmente.
- **Não iniciado:** fase futura.

---

# FASE 1 — FRONTEND WEB

## Etapa 1 — Entender o frontend atual e levantar telas

**Status: Concluída**

Foi definido o frontend atual como repositório independente e mapeadas as principais telas, rotas e domínios da API.

Entregas existentes:

- stack definida;
- estrutura de projeto;
- rotas mapeadas;
- domínios HTTP identificados;
- organização por components/views/services/types/store/router.

---

## Etapa 2 — Criar a Home real do Aconchega

**Status: Estruturada**

Existe Home responsiva com:

- Header;
- Hero;
- busca;
- cards de moradia;
- seções informativas;
- Footer;
- fallback demonstrativo quando API falha.

Pendência ligada à etapa:

- refinar identidade visual própria; a versão atual ainda foi considerada genérica.

---

## Etapa 3 — Consumir a API real

**Status: Em validação**

Services Axios e chamadas reais já existem.

O que falta:

- executar backend e frontend juntos;
- validar request/response;
- corrigir divergências de contrato;
- garantir que mocks/fallback não escondam falhas.

Esta é uma das etapas centrais da fase atual.

---

## Etapa 4 — Tipar os dados do backend

**Status: Estruturada**

`src/types/api.ts` contém tipos para:

- usuário;
- login;
- cadastro;
- moradia;
- mídia;
- filtros;
- paginação;
- limites;
- estatísticas.

Pendência:

- ajustar tipos conforme contratos reais encontrados na integração.

---

## Etapa 5 — Listagem, busca e filtros

**Status: Estruturada / Em validação**

Já existe tela `/imoveis` com estrutura de busca, filtros e paginação.

Pendência:

- provar os filtros e paginação com a API real;
- revisar parâmetros efetivamente aceitos pelo backend.

---

## Etapa 6 — Detalhes do imóvel

**Status: Estruturada / Em validação**

Rota existente:

```text
/imoveis/:id
```

Pendências:

- validar diferença entre detalhe público e autenticado;
- validar mídia/capa;
- validar dados opcionais.

---

## Etapa 7 — Login e sessão

**Status: Estruturada / Em validação**

Já existem:

- tela de login;
- Pinia auth store;
- token em localStorage;
- usuário persistido localmente;
- interceptor Axios;
- `x-access-token`;
- logout/restauração;
- guards.

Pendências:

- validar resposta real do login;
- validar restauração;
- revisar comportamento em 401;
- validar banimento/roles quando aplicável.

---

## Etapa 8 — Cadastro de usuário

**Status: Estruturada / Em validação**

Já existem:

- cadastro;
- confirmação de conta;
- recuperação de senha;
- redefinição;
- regeneração de confirmação considerada no service.

Pendências:

- validar fluxo completo com e-mail/backend real;
- alinhar mensagens e erros.

---

## Etapa 9 — Área autenticada

**Status: Estruturada / Em validação**

Já existem:

```text
/perfil
/meus-anuncios
```

Além de guards e upload/remoção de foto.

Pendências:

- validar contratos reais;
- validar dados opcionais;
- validar paginação de meus anúncios.

---

## Etapa 10 — Criar anúncio

**Status: Estruturada / Em validação**

Já existe:

```text
/anuncios/novo
```

O formulário cobre campos amplos do model `Dwelling`.

Pendências:

- validar campos obrigatórios;
- validar enums;
- validar formatos numéricos;
- validar regra de conta confirmada;
- validar resposta de criação.

---

## Etapa 11 — Upload de fotos e vídeos

**Status: Estruturada / Em validação**

Fluxos já considerados:

- upload multipart;
- imagens e vídeo;
- remoção;
- definição de capa;
- limite vindo da plataforma.

Pendências:

- testar arquivos reais;
- validar nome do campo multipart;
- validar limite real;
- validar tipos MIME;
- validar retorno do backend/S3.

---

## Etapa 12 — Editar e excluir anúncio

**Status: Estruturada / Em validação**

Já existe:

```text
/anuncios/:id/editar
```

Pendências:

- confirmar exatamente quais campos o update aceita;
- validar propriedade do anúncio;
- validar exclusão;
- validar atualização das mídias.

---

## Etapa 13 — Estados e UX

**Status: Estruturada, ainda não encerrada**

Já existem estados de:

- loading;
- erro;
- vazio;
- feedback visual em várias telas;
- responsividade base.

Pendências:

- revisar mensagens após integração;
- revisar sucesso/erro de todos os fluxos;
- revisar acessibilidade;
- revisar mobile real;
- refinar identidade própria.

---

## Etapa 14 — Testes

**Status: Pendente**

O `package.json` ainda não possui uma suíte frontend configurada.

Planejamento original permanece:

- services;
- validadores;
- componentes principais;
- login;
- criação de anúncio;
- fluxos críticos.

Ferramentas candidatas já previstas:

```text
Vitest
Vue Test Utils
Playwright
```

Não marcar esta etapa como iniciada apenas por existir `typecheck`.

---

# MARCO — MVP WEB

**Status: Pendente de validação**

Apesar de quase todas as telas existirem, o MVP Web ainda não está fechado.

Critérios mínimos:

- [ ] Home com API real;
- [ ] listagem;
- [ ] busca;
- [ ] filtros;
- [ ] paginação;
- [ ] detalhes;
- [ ] login;
- [ ] cadastro;
- [ ] confirmação;
- [ ] recuperação;
- [ ] perfil;
- [ ] meus anúncios;
- [ ] criar;
- [ ] editar;
- [ ] excluir;
- [ ] upload;
- [ ] capa/remoção de mídia;
- [ ] admin;
- [ ] estados UX coerentes;
- [ ] responsividade;
- [ ] identidade visual refinada;
- [ ] typecheck;
- [ ] build;
- [ ] testes essenciais.

---

# FASE 2 — MOBILE

A fase Mobile permanece no planejamento original e **não deve ser antecipada**.

Stack definida:

```text
Kotlin
Jetpack Compose
Retrofit
OkHttp
Coroutines
ViewModel
StateFlow
DataStore
```

## Etapa 15 — Kotlin aplicado ao Aconchega

**Status: Não iniciado**

## Etapa 16 — Primeira Home Android

**Status: Não iniciado**

## Etapa 17 — API no Android

**Status: Não iniciado**

## Etapa 18 — Estado e ViewModel

**Status: Não iniciado**

## Etapa 19 — Navegação

**Status: Não iniciado**

## Etapa 20 — Login Android

**Status: Não iniciado**

## Etapa 21 — CRUD de anúncio no Android

**Status: Não iniciado**

## Etapa 22 — Upload Android

**Status: Não iniciado**

---

# MARCO — MVP MOBILE

**Status: Não iniciado**

O Mobile só começa depois do fechamento do MVP Web.

---

# Ordem atual de execução dentro do roadmap existente

A implementação adiantou muitas etapas simultaneamente. Para fechá-las com segurança, a execução atual deve voltar aos fluxos e validá-los nesta sequência:

```text
Cadastro
  ↓
Confirmação
  ↓
Login / sessão
  ↓
Busca pública
  ↓
Detalhes
  ↓
Perfil
  ↓
Meus anúncios
  ↓
Criar anúncio
  ↓
Upload / capa / remoção
  ↓
Editar / excluir
  ↓
Admin
  ↓
UX + identidade
  ↓
Testes
  ↓
MVP WEB
```

Essa sequência é uma **ordem de fechamento das etapas já definidas**, não um novo roadmap.

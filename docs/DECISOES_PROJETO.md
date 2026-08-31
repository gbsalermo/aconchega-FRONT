# Decisões do Projeto — Aconchega Aí

> Registro das decisões já consolidadas. Este arquivo existe para evitar que futuras alterações desfaçam escolhas importantes sem necessidade.

## D-01 — Frontend atual em repositório próprio

**Decisão:** o frontend Web atual é desenvolvido em:

```text
gbsalermo/aconchega-FRONT
```

**Motivo:** permitir evolução independente do antigo frontend MVP/submódulo do repositório original.

**Consequência:** contratos com o backend precisam ser explicitamente sincronizados.

---

## D-02 — Stack Web

**Decisão:**

```text
Vue 3
TypeScript
Vite
Vue Router
Pinia
Axios
Lucide Vue
CSS próprio
```

**Não fazer sem nova decisão:** migrar para React, Angular, JavaScript puro ou outro framework apenas por preferência da pessoa/IA que assumir.

---

## D-03 — TypeScript é parte da arquitetura

**Decisão:** contratos da API devem permanecer tipados.

Arquivo central atual:

```text
src/types/api.ts
```

**Motivo:** reduzir divergências entre frontend e backend e tornar enums/campos explícitos.

**Consequência:** ao descobrir um contrato real diferente, atualizar os tipos em vez de usar `any` como solução permanente.

---

## D-04 — HTTP separado da UI

**Decisão:** componentes e views não devem concentrar toda a lógica HTTP.

Estrutura atual:

```text
src/services/http.ts
src/services/auth.service.ts
src/services/account.service.ts
src/services/dwelling.service.ts
src/services/platform.service.ts
```

**Motivo:** separar responsabilidades e facilitar manutenção/testes.

---

## D-05 — Estado global de autenticação com Pinia

**Decisão:** autenticação global fica em store.

**Motivo:** login, logout, sessão e guards são preocupações transversais.

Não espalhar manipulação de sessão por todas as views.

---

## D-06 — Autenticação HTTP atual

**Decisão considerada pelo frontend:**

```http
x-access-token: <jwt>
```

Token local atual:

```text
aconchega_token
```

Usuário local atual:

```text
aconchega_user
```

Se o backend mudar o mecanismo, registrar explicitamente a decisão e migrar o frontend inteiro de forma coerente.

---

## D-07 — Base da API utilizada pelo frontend

**Decisão atual:**

```text
/api
```

Exemplo:

```env
VITE_API_URL=http://localhost:3000/api
```

**Contexto:** documentação Swagger histórica já indicou `/v1`, enquanto o Express real foi identificado usando `/api`.

**Regra:** durante a integração, comportamento/código real do backend tem prioridade sobre Swagger antigo.

---

## D-08 — Público e autenticado são experiências diferentes

**Decisão de produto/backend:** visitante e usuário autenticado não recebem necessariamente os mesmos dados.

Exemplos:

```text
GET /dwellings/public/search
GET /dwellings/search
```

**Motivo:** limitar exposição de informações mais sensíveis para visitantes.

**Não fazer:** unificar artificialmente os fluxos no frontend ignorando essa regra.

---

## D-09 — Guards frontend não substituem autorização do backend

**Decisão:** guards existem para navegação e UX.

Meta atual:

```text
requiresAuth
requiresConfirmed
requiresAdmin
guestOnly
```

**Regra:** segurança real continua sendo responsabilidade do backend.

---

## D-10 — Conta confirmada para publicação

**Decisão de negócio considerada:** criar/publicar anúncio exige usuário autenticado e conta confirmada.

O frontend já possui `requiresConfirmed` para o fluxo de novo anúncio.

Não remover essa restrição sem confirmar mudança no backend/produto.

---

## D-11 — Mídia segue o backend existente

**Decisão:** usar o fluxo já existente de upload e gerenciamento de mídia do backend.

Formatos historicamente aceitos:

```text
PNG
JPEG
MP4
```

Limite histórico:

```text
16 MiB por arquivo
```

O número máximo de mídias deve vir de:

```text
/platform/limits
```

Não hardcodar limite de quantidade se a API fornece essa configuração.

---

## D-12 — Arquitetura do backend deve ser preservada

**Decisão histórica:** backend usa Clean Architecture/Ports and Adapters.

**Não fazer:**

- acessar Sequelize diretamente de controller;
- colocar Express dentro de use case;
- ignorar protocols/factories;
- reescrever como MVC simples apenas para reduzir arquivos.

---

## D-13 — Referência visual não é produto final

**Referência inicial:**

```text
AAYUSH412/Real-Estate-Website
```

Usos permitidos como inspiração:

- estrutura de Home;
- hierarquia;
- hero;
- CTA;
- card de destaque.

**Decisão:** o Aconchega Aí deve evoluir para identidade própria.

Não copiar literalmente layout, código ou identidade do projeto de referência.

---

## D-14 — Cruz das Almas é parte da identidade

**Decisão:** usar Cruz das Almas como base de identidade local.

Paleta atual:

```text
#E6CC27 — amarelo
#302825 — carvão
#FBFAF5 — fundo claro
```

Essas cores podem ser refinadas em tons e aplicações, mas não devem ser descartadas sem decisão de design explícita.

---

## D-15 — Identidade atual ainda não está fechada

**Decisão mais recente:** a primeira versão foi considerada boa, porém genérica.

Próxima rodada deve buscar:

- personalidade própria;
- elementos locais;
- sensação de comunidade;
- maior diferenciação de templates imobiliários;
- continuidade da paleta e leveza visual.

Logo, não tratar a UI atual como design final.

---

## D-16 — Projeto dita o aprendizado

**Decisão:** o desenvolvimento real define o que precisa ser estudado.

O curso JavaScript + TypeScript é apoio.

Fluxo:

```text
necessidade do projeto
  ↓
revisão pontual
  ↓
implementação
  ↓
validação
```

Não reiniciar etapas básicas já dominadas apenas para seguir linearmente o curso.

---

## D-17 — Roadmap existente deve ser preservado

Ordem macro já definida:

```text
Frontend Web
  ↓
MVP Web validado
  ↓
Mobile Android
```

A implementação adiantou várias etapas do Web, mas isso não autoriza criar outro roadmap paralelo.

---

## D-18 — Mobile somente após MVP Web

**Stack definida:**

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

**Decisão:** não iniciar Mobile enquanto o MVP Web ainda estiver em integração/estabilização.

---

## D-19 — Fallback da Home é demonstrativo

**Decisão:** quando API está indisponível, a Home pode exibir dados demo para permitir desenvolvimento visual.

**Regra:** fallback não conta como integração bem-sucedida.

Durante testes de integração, falha de API deve ser observada explicitamente.

---

## D-20 — Correções incrementais, não reescrita automática

**Decisão:** agora que existe uma base ampla, problemas devem ser corrigidos por fluxo.

Preferir:

```text
identificar contrato
corrigir service/type/view afetados
validar
```

em vez de:

```text
reescrever frontend inteiro
```

---

## D-21 — Testes são etapa obrigatória antes do fechamento do MVP

No estado de 31/08/2026 ainda não existe suíte frontend configurada.

Ferramentas previstas no planejamento:

```text
Vitest
Vue Test Utils
Playwright
```

A configuração final deve priorizar:

- services;
- validadores;
- auth;
- criação de anúncio;
- componentes críticos;
- fluxos ponta a ponta essenciais.

---

## D-22 — Backend correto é identificado pelo domínio, não apenas pelo nome

Para este frontend, backend compatível deve apresentar conceitos equivalentes a:

```text
User
Dwelling
DwellingMedia
/accounts
/dwellings
/platform
```

Um repositório chamado “Aconchega” com domínio de hotel/pousada não é automaticamente parte deste produto.

---

## Como registrar nova decisão

Ao mudar uma decisão relevante, adicionar uma nova entrada com:

```text
ID
Decisão
Motivo
Consequência
Arquivos afetados
Data
```

Não apagar silenciosamente a decisão antiga; registrar substituição para preservar histórico.

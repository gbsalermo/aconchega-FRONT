# Guia para outra IA — Aconchega Aí

> **Objetivo:** permitir que uma nova IA continue o projeto sem reconstruir contexto, inventar etapas ou conectar o frontend ao backend errado.

## 1. Leia nesta ordem

Antes de alterar código:

1. `README.md`
2. `docs/DOSSIE_PROJETO_ACONCHEGA.md`
3. `CONTINUIDADE_FRONTEND.md`
4. `docs/ETAPAS_E_STATUS.md`
5. `docs/DECISOES_PROJETO.md`
6. `docs/CONTRATO_BACKEND_FRONTEND.md`
7. `THIRD_PARTY_NOTICES.md` se a tarefa envolver design
8. arquivos reais envolvidos na mudança (`src/services`, `src/types`, `src/router`, view/componente)

## 2. Entenda o projeto em 30 segundos

**Aconchega Aí** é uma plataforma de anúncios de moradia com foco inicial em Cruz das Almas/BA e contexto universitário.

O frontend atual:

```text
Vue 3 + TypeScript + Vite
Vue Router + Pinia + Axios
CSS próprio + Lucide Vue
```

O backend correto do produto é o backend histórico de moradias:

```text
Node.js + TypeScript + Express
Clean Architecture
Sequelize + PostgreSQL
JWT
Redis + BullMQ
S3 compatível
```

Domínios HTTP esperados:

```text
/accounts
/dwellings
/platform
```

### Não confundir

`YanAlmeidaVR/aconchega-api` é outro projeto chamado Aconchega, em Java/Spring Boot, para pousada/hóspedes/quartos/reservas.

**Não usar esse repositório como backend deste frontend.**

## 3. Onde estamos

A primeira versão do frontend foi adiantada e já contém em código:

- Home;
- listagem/busca/filtros/paginação;
- detalhes;
- autenticação;
- cadastro;
- confirmação/recuperação;
- perfil;
- meus anúncios;
- CRUD de anúncio;
- mídia;
- admin;
- guards;
- tipos e services;
- responsividade.

Mas isso ainda precisa ser **validado ponta a ponta com o backend real**.

Estado correto:

```text
estrutura ampla implementada
        ↓
integração real e correções  ← ESTAMOS AQUI
        ↓
refino de UX/identidade
        ↓
testes
        ↓
MVP WEB validado
        ↓
MOBILE
```

## 4. Próxima tarefa padrão

Se não houver uma instrução mais específica, continuar a integração nesta ordem:

1. cadastro;
2. confirmação de conta;
3. login/sessão;
4. busca pública;
5. detalhes público/autenticado;
6. perfil;
7. meus anúncios;
8. criar anúncio;
9. upload/capa/remoção de mídia;
10. editar/excluir;
11. admin;
12. limites/estatísticas;
13. erros e UX;
14. identidade visual;
15. testes.

## 5. Regras que não devem ser ignoradas

### Planejamento

- não criar roadmap novo;
- não reorganizar as etapas por gosto pessoal;
- não iniciar Mobile antes do MVP Web;
- registrar mudança de decisão na documentação.

### Frontend

- manter Vue 3 + TypeScript;
- manter serviços HTTP separados de componentes;
- manter tipos centrais;
- manter Pinia para estado global de autenticação;
- manter route guards como UX, sem tratá-los como segurança de servidor;
- preferir correções incrementais a reescrita geral.

### Backend

- `x-access-token` é o header atual considerado;
- `/api` é a base usada no frontend;
- há divergência histórica com Swagger `/v1`;
- código/rotas reais têm prioridade sobre documentação velha;
- manter diferença entre resposta pública e autenticada;
- criação/upload têm regras de autenticação/confirmação/propriedade.

### Design

- referência inicial: `AAYUSH412/Real-Estate-Website`;
- paleta local: amarelo + carvão + fundo claro;
- vínculo visual com Cruz das Almas deve permanecer;
- a versão atual foi considerada boa, porém genérica;
- próximo refinamento deve criar identidade própria;
- não copiar literalmente o projeto de referência.

## 6. Fonte de verdade quando houver conflito

Para frontend:

```text
1. código executado do próprio frontend
2. comportamento real do backend
3. rotas/models/use cases do backend
4. testes do backend
5. Swagger atualizado
6. documentação histórica
```

Nunca “corrigir” contrato apenas porque um documento antigo diz algo diferente.

## 7. Como declarar uma etapa concluída

Não usar “arquivo existe” ou “tela abre” como critério suficiente.

Uma feature integrada deve ter:

- request real;
- response real;
- happy path;
- loading;
- erro;
- vazio quando aplicável;
- regra de autorização coerente;
- responsividade;
- contrato atualizado na documentação se necessário.

## 8. Mocks

A Home possui fallback demonstrativo quando a API falha.

Isso serve para desenvolvimento visual.

**Não usar o fallback para dizer que a integração está funcionando.**

## 9. Testes

No estado atual não existe suíte frontend configurada no `package.json`.

A etapa de testes continua pendente e deve usar ferramentas adequadas ao ecossistema Vue, como:

- Vitest;
- Vue Test Utils;
- Playwright para fluxos críticos.

A escolha final deve ser registrada antes de ampliar a suíte.

## 10. Mobile

Mobile está planejado, mas não iniciado.

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

Não começar essa fase enquanto o marco MVP Web não estiver fechado.

## 11. Frase de handoff

> O frontend do Aconchega Aí está estruturalmente adiantado, mas a prioridade atual é validar e corrigir cada fluxo contra a API real, depois consolidar identidade visual e testes; não invente uma nova arquitetura ou roadmap e não avance para Mobile antes do MVP Web.

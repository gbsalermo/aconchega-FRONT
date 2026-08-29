# Continuidade — Aconchega Aí Frontend

## Estado atual

Foi adiantada uma primeira versão funcional ampla do frontend, mantendo a stack definida para o projeto: **Vue 3 + TypeScript + Vite**.

A referência visual principal é `AAYUSH412/Real-Estate-Website`, principalmente sua Home em duas colunas, navegação superior, hero com CTA e cartão de imóvel em destaque. A identidade foi substituída por amarelo/carvão inspirado na bandeira de Cruz das Almas.

## O que já está estruturado

- navegação e layout responsivo;
- Home no estilo visual solicitado;
- listagem, busca, filtros e paginação;
- página de detalhes;
- cadastro, login, confirmação e recuperação de senha;
- store de autenticação;
- guards de rota;
- perfil e upload de foto;
- meus anúncios;
- formulário completo de anúncio;
- upload de fotos/vídeo, capa e exclusão de mídia;
- telas administrativas de usuários, anúncios e estatísticas;
- services Axios separados por domínio;
- tipos TypeScript alinhados ao backend;
- estados de loading/erro/vazio;
- responsividade desktop/tablet/mobile.

## Contrato de API considerado

Base real do Express: `/api`.

### Accounts

- `POST /accounts`
- `POST /accounts/confirm?token=...`
- `POST /accounts/recover`
- `POST /accounts/regenerate`
- `POST /accounts/login`
- `POST /accounts/password-recovery`
- `GET /accounts/profile`
- `PUT /accounts/profile`
- `PUT /accounts/profile/picture`
- `DELETE /accounts/profile/picture`
- `DELETE /accounts`

Admin:

- `GET /accounts`
- `GET /accounts/profile/:id`
- `PUT /accounts/:id`
- `POST /accounts/ban/:id`
- `DELETE /accounts/ban/:id`
- `DELETE /accounts/:id`

### Dwellings

- `POST /dwellings`
- `POST /dwellings/upload/:dwellingId`
- `GET /dwellings/my`
- `GET /dwellings/public/search`
- `GET /dwellings/search`
- `GET /dwellings/:dwellingId`
- `GET /dwellings/public/:dwellingId`
- `PUT /dwellings/:dwellingId`
- `DELETE /dwellings/:dwellingId`
- `DELETE /dwellings/:dwellingId/medias/:mediaId`
- `PUT /dwellings/:dwellingId/medias/:mediaId/cover`

Admin:

- `GET /dwellings/admin/search`
- `PUT /dwellings/admin/:dwellingId`
- `DELETE /dwellings/admin/:dwellingId/medias/:mediaId`
- `DELETE /dwellings/admin/:dwellingId`

### Platform

- `GET /platform/limits`
- `GET /platform/statistics` — admin

## Regras do backend consideradas

- autenticação via `x-access-token`;
- criar anúncio exige usuário autenticado e conta confirmada;
- upload de mídia exige usuário autenticado, confirmado e proprietário do anúncio;
- foto de perfil: PNG/JPEG, até 16 MB;
- mídia de anúncio: PNG/JPEG/MP4, até 16 MB;
- visitante possui busca/detalhes reduzidos;
- usuário autenticado recebe dados/filtros adicionais;
- número máximo de mídias vem de `/platform/limits`;
- visitante possui limite de páginas configurado pelo backend.

## Enums considerados

- Tipo: `House | Apartment | Room | Republic | Kitnet`
- Objetivo: `Rent | Sell | Vacation Home`
- Disponibilidade: `Available | Unavailable`
- Status: `Active | Inactive | Draft | Pending | Sold | Rented`
- Pagamento: `Monthly | One Time | Daily | Weekly | Yearly`
- Sexo: `MALE | FEMALE`
- Perfil: `ADMIN | USER`

## Pontos para validar na primeira integração real

1. O Swagger informa base `/v1`, mas o Express monta as rotas em `/api`.
2. Alguns schemas do Swagger não contêm todos os campos presentes no model real de `Dwelling`.
3. O model de mídia possui `isCover`, mas isso não aparece de forma consistente na documentação.
4. Confirmar exatamente quais campos o update de anúncio aceita.
5. Confirmar mensagens/formato de erro retornados pela API para normalização no frontend.
6. Confirmar comportamento de paginação de `/dwellings/my` e buscas administrativas.
7. Validar cadastro/login contra dados reais antes de consolidar os tipos finais.

## Próxima execução recomendada

Não criar novas telas antes da primeira rodada de correção.

Ordem:

1. subir backend e frontend juntos;
2. validar cadastro → confirmação → login;
3. validar busca pública;
4. validar detalhes público/autenticado;
5. validar criação de anúncio;
6. validar upload de mídia;
7. validar edição/exclusão;
8. validar telas admin;
9. corrigir contratos e UI encontrados;
10. substituir imagens temporárias e refinar identidade visual.

## Regra para as próximas alterações

Agora o foco deixa de ser “criar o máximo” e passa a ser **corrigir por fluxo**, sem reescrever a estrutura inteira a cada ajuste.

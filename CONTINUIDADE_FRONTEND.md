# Continuidade — Aconchega Aí Frontend

## Estado atual

Foi adiantada uma primeira versão funcional ampla do frontend, mantendo a stack definida para o projeto: **Vue 3 + TypeScript + Vite**.

A referência visual principal inicial foi `AAYUSH412/Real-Estate-Website`, principalmente sua Home em duas colunas, navegação superior, hero com CTA e cartão de imóvel em destaque. A partir desta etapa, essa referência deve ser usada apenas para **acabamento, hierarquia, espaçamento, responsividade e qualidade de interação**. O Aconchega Aí não deve continuar copiando sua identidade de “imobiliária premium”.

## Direção oficial de identidade visual

O frontend deve desenvolver uma identidade própria baseada em três pilares:

1. **Cruz das Almas** — referência local e visual;
2. **aconchego** — sensação de pertencimento, simplicidade e proximidade;
3. **moradia local** — produto voltado a quem procura um lugar para morar, não a uma imobiliária de luxo.

Conceito interno do design system: **Aconchego Cruzalmense**.

Objetivo visual:

> regional sem ser folclórico; moderno sem parecer SaaS genérico; acolhedor sem ser infantil; tecnológico sem exagerar em elementos de IA.

### Uso da bandeira de Cruz das Almas

A bandeira não deve servir apenas como fonte de cores. Sua composição em blocos amarelos e escuros deve inspirar elementos recorrentes da interface:

- divisores;
- cantos de cards;
- badges;
- estados ativos;
- favicon/símbolo;
- loading;
- pequenos elementos geométricos;
- detalhes de navegação e seções.

Esses elementos devem criar reconhecimento visual mesmo quando a marca escrita não estiver presente.

### Paleta base

| Função | Cor |
| --- | --- |
| Amarelo principal | `#E6CC27` |
| Carvão | `#282321` |
| Creme | `#F7F3E8` |
| Branco quente | `#FFFDF8` |
| Amarelo claro | `#F5E994` |
| Texto secundário | `#716A61` |

O amarelo deve ser usado com intenção, principalmente para CTA, seleção, destaques e assinatura visual. Evitar transformar todo botão em amarelo para não banalizar a cor da marca.

### Tipografia e tom

Direção desejada:

- títulos com personalidade editorial, usando `Fraunces` ou alternativa semelhante;
- interface e textos com `Manrope`, `Inter` ou equivalente;
- títulos curtos e diretos;
- linguagem próxima e local.

Exemplos de tom:

- **Seu canto em Cruz das Almas.**
- **Ache seu canto.**
- **Um lugar para chamar de seu.**
- **Onde você quer se aconchegar?**
- **Encontrar meu canto →**

Evitar linguagem genérica de template imobiliário, como “Discover your dream home” ou equivalentes excessivamente aspiracionais.

### Home

A Home deve continuar usando uma composição forte em duas colunas, mas ganhar identidade própria.

Estrutura conceitual:

```text
Header
 ↓
Hero
 ├── mensagem curta e local
 ├── busca principal
 └── imóvel/destaque visual
 ↓
Seu próximo canto
 ├── Todos
 ├── Casa
 ├── Apartamento
 ├── Quarto
 └── cards
 ↓
Bloco de orientação/busca
 ↓
Mapa/localização de Cruz das Almas
 ↓
Footer
```

Headline preferencial:

> **Seu canto em Cruz das Almas.**

O hero deve transmitir moradia real e próxima, evitando fotos com estética de mansão de luxo quando isso não representar o produto.

### Cards de imóvel

Os cards não devem parecer cards genéricos de marketplace.

Direção:

- imagem grande;
- pequeno elemento geométrico amarelo/carvão da marca;
- tipo do imóvel em etiqueta curta;
- preço com bastante hierarquia;
- bairro/localidade valorizado;
- informações essenciais sem poluição;
- pequenas assimetrias gráficas inspiradas na bandeira.

Exemplo conceitual:

```text
┌──────────────────────┐
│                  ■ A │
│       FOTO           │
│                      │
├──────────────────────┤
│ CASA PARA ALUGAR     │
│                      │
│ R$ 900 / mês         │
│ Centro               │
│                      │
│ 2 quartos · 1 banho  │
└──────────────────────┘
```

### Localização como parte do produto

Cruz das Almas deve aparecer como parte da experiência e não somente como uma string de endereço.

Evolução desejada:

- mapa ou seção geográfica;
- bairros/localidades como filtros visuais;
- imóveis apresentados em contexto local;
- possibilidade futura de explorar moradias diretamente pelo mapa.

A interface pode usar mapas estilizados, traços de ruas e elementos geográficos discretos como apoio visual.

### Marca

Evitar ícone genérico de casa ou pin com casa.

Direção para futura identidade:

- explorar a palavra **Aconchega Aí** como elemento principal;
- destacar o “Aí” com a cor amarela;
- estudar símbolo próprio combinando formas de `A`, moradia, localização e geometria da bandeira;
- manter o símbolo simples o suficiente para favicon e app mobile.

A identidade definitiva da logo ainda não está fechada e deve ser validada antes de ser consolidada no frontend e no aplicativo mobile.

### Microinterações

As animações devem ser discretas e funcionais.

Possibilidades:

- entrada suave de títulos e cards;
- cards subindo poucos pixels no hover;
- detalhe geométrico amarelo reagindo ao hover;
- preço ou CTA ganhando destaque sem grandes movimentos;
- loader baseado em quatro quadrantes amarelo/carvão inspirados na bandeira;
- respeitar `prefers-reduced-motion`.

Não usar animações apenas para ornamentação.

### Relação com o projeto de referência

`AAYUSH412/Real-Estate-Website` continua válido como referência para:

- proporção do hero;
- hierarquia visual;
- organização de conteúdo;
- densidade de informação;
- responsividade;
- polimento de componentes;
- microinterações.

Não deve mais definir:

- identidade;
- textos;
- marca;
- linguagem de luxo;
- paleta;
- personalidade dos cards;
- posicionamento do produto.

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

1. redesenhar e validar a Home com a identidade **Aconchego Cruzalmense**;
2. propagar tokens visuais aprovados para cards, navegação e autenticação;
3. subir backend e frontend juntos;
4. validar cadastro → confirmação → login;
5. validar busca pública;
6. validar detalhes público/autenticado;
7. validar criação de anúncio;
8. validar upload de mídia;
9. validar edição/exclusão;
10. validar telas admin;
11. corrigir contratos e UI encontrados;
12. substituir imagens temporárias e consolidar logo/identidade definitiva.

## Regra para as próximas alterações

Agora o foco deixa de ser “criar o máximo” e passa a ser **corrigir por fluxo e consolidar identidade**, sem reescrever a estrutura inteira a cada ajuste.

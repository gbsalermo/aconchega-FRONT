# Aconchega Aí — Frontend

Frontend web do **Aconchega Aí**, plataforma de anúncios de moradia com foco inicial em Cruz das Almas/BA.

## Stack

- Vue 3
- TypeScript
- Vite
- Vue Router
- Pinia
- Axios
- Lucide Vue
- CSS responsivo próprio

## Identidade visual

A interface usa a bandeira de Cruz das Almas como referência cromática:

- `#E6CC27` — amarelo principal
- `#302825` — carvão
- `#FBFAF5` — fundo claro

A composição visual e a experiência da página inicial foram inspiradas no projeto público [AAYUSH412/Real-Estate-Website](https://github.com/AAYUSH412/Real-Estate-Website), adaptadas para Vue e para o domínio do Aconchega Aí.

## Executando

```bash
cp .env.example .env
npm install
npm run dev
```

API esperada por padrão:

```env
VITE_API_URL=http://localhost:3000/api
```

## Rotas já preparadas

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

## Integração com o backend

O cliente já está preparado para as rotas atuais da API:

- contas, login, confirmação e recuperação de senha;
- perfil e foto do usuário;
- busca pública e autenticada de moradias;
- detalhes público/autenticado;
- meus anúncios;
- criação, edição e exclusão;
- upload e gerenciamento de mídia;
- administração de usuários e anúncios;
- limites e estatísticas da plataforma.

A autenticação atual do backend utiliza o header:

```http
x-access-token: <token>
```

## Observações

- A Home possui fallback visual com dados mockados caso a API esteja indisponível, apenas para permitir evolução visual independente do backend.
- Imagens temporárias externas devem ser substituídas pelas imagens reais/definitivas do projeto.
- Existem divergências entre o Swagger atual e as rotas/modelos reais do backend. O frontend foi estruturado priorizando o código Express/modelos atuais; os contratos devem ser validados em integração.

Consulte `CONTINUIDADE_FRONTEND.md` antes de continuar o desenvolvimento.

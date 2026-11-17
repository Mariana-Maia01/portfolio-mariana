<h1 align="center">💻 Portfólio | Mariana Dominguez Maia</h1>

<p align="center">
Portfólio profissional com experiência, PDI (Plano de Desenvolvimento Individual), projetos, conhecimentos técnicos e formação.
</p>

🌐 **https://portfolio-mariana-fyk9.vercel.app/**

## 🚀 Tecnologias

React · TypeScript · Vite · Tailwind CSS · shadcn/ui (Radix) · Framer Motion · Lucide · Vitest + Testing Library

## 🧭 Seções

Início · Sobre · Experiência · PDI · Projetos · Conhecimentos · Formação & certificações · Contato

## 🗂️ Estrutura

```
src/
├── data/                 ← TODO o conteúdo do site (edite aqui)
│   ├── profile.ts        nome, resumo, links, CV, textos do "Sobre"
│   ├── experience.ts     experiências profissionais e voluntárias
│   ├── pdi.ts            áreas, objetivos, atividades, evidências e histórico do PDI
│   ├── projects.ts       projetos (problema, funcionalidades, aprendizados, links)
│   ├── skills.ts         tecnologias e nível de domínio
│   ├── education.ts      graduação, cursos, badges, certificações e eventos
│   └── navigation.ts     itens do menu
├── types/portfolio.ts    tipos de todos os dados
├── lib/pdi.ts            cálculos do PDI (progresso, contagens, filtros)
├── components/           componentes visuais (não contêm conteúdo fixo)
│   ├── pdi/              painel do PDI
│   └── shared/           Section, Reveal, badges, ícones
└── test/                 testes de dados e de interação
```

## ✍️ Como atualizar o conteúdo

Todo o conteúdo fica em `src/data/`. Os componentes só exibem esses dados, então para atualizar o site você **edita um arquivo de dados, faz commit e push** — a Vercel publica a nova versão automaticamente.

### PDI (`src/data/pdi.ts`)

| O que fazer | Como |
|---|---|
| Mudar status | `status: "nao-iniciado" \| "em-andamento" \| "concluido"` |
| Registrar progresso | marque ações do `actionPlan` com `done: true` — a barra de progresso é calculada a partir delas |
| Registrar atividade | adicione `{ date: "2027-01", description: "..." }` em `activities` |
| Adicionar evidência | adicione em `evidences` (use `projectId` para ligar a um projeto ou `url` para link externo) |
| Novo objetivo | copie um bloco existente, troque o `id` e preencha os campos |
| Marco de evolução | adicione uma entrada no topo de `pdiHistory` |
| Data de atualização | atualize `updatedAt` do objetivo e `pdiMeta.lastUpdated` |

Os testes (`npm test`) validam a consistência do PDI: por exemplo, um objetivo "concluído" precisa ter todas as ações concluídas, e um "em andamento" precisa ter pelo menos uma evidência.

> **Sobre persistência:** o PDI **não é editável pela interface do site** de propósito. Os dados ficam versionados no Git, o que garante que nada se perde ao recarregar a página e que exista histórico de cada mudança. Edições feitas no navegador não persistem.

### Conhecimentos (`src/data/skills.ts`)

Níveis: `"basico"`, `"em-desenvolvimento"`, `"experiencia-pratica"`. O campo `context` (opcional) mostra onde a tecnologia foi usada.

### Certificações (`src/data/education.ts`)

Só use `kind: "certificacao"` com `status: "concluido"` quando a certificação tiver sido obtida.

## 🔐 Painel de administração do PDI

O PDI pode ser editado direto no site, sem mexer no código: em **`/admin`** você entra com uma senha e passa a ver, na aba PDI, os botões **Novo objetivo**, **Editar**, **Excluir** e as ações do plano viram "clicáveis" (marcar/desmarcar como concluída). As mudanças ficam salvas num banco Redis (Upstash) e aparecem para todos os visitantes na hora.

### Como funciona
- `api/` — funções serverless da Vercel: `login`, `logout`, `session` e `pdi` (GET público, PUT só para a administradora).
- Sessão: cookie `HttpOnly` + `Secure` + `SameSite=Strict`, assinado com HMAC-SHA256, válido por 7 dias.
- Proteções: limite de 5 tentativas de login a cada 15 min por IP, checagem de origem nas escritas, validação de todo o conteúdo no servidor (`src/lib/pdi-schema.ts`).
- Enquanto ninguém salvou nada pelo painel, o site usa `src/data/pdi.ts`. **Depois da primeira edição pelo painel, o banco passa a valer.** Se você editar o `pdi.ts` depois, use o botão **Restaurar do arquivo** no painel para levar o arquivo para o site.

### Configuração na Vercel (uma vez)
1. No projeto da Vercel: **Storage → Create Database → Upstash for Redis** (plano gratuito) e conecte ao projeto. Isso cria `KV_REST_API_URL` e `KV_REST_API_TOKEN` automaticamente.
2. Em **Settings → Environment Variables**, crie:
   - `ADMIN_PASSWORD` — sua senha (longa e única).
   - `SESSION_SECRET` — um texto aleatório longo (ex.: gere com `openssl rand -base64 32`).
3. Faça um novo deploy (push no GitHub ou **Redeploy**).
4. Acesse `https://seu-site/admin`.

### Testar localmente
`npm run dev` não roda as funções da pasta `api/` — o site funciona normalmente, mas sem login. Para testar o painel no seu computador: `npx vercel link`, `npx vercel env pull .env.local` e `npx vercel dev`.

## 🛠️ Rodando localmente

```bash
npm install
npm run dev       # servidor local
npm test          # testes
npm run lint      # lint
npm run build     # build de produção
```

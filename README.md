# Cigana Soraya — Catálogo (v1)

Primeira versão do site de agendamento e catálogo de jogos de cartas (leituras) da Cigana Soraya. Ver [[pmc/README.md]] para o contexto completo dos projetos da marca.

Superada por [`catalogo/v2`](../v2/frontend), que reescreve a mesma ideia com arquitetura mais organizada. Mantida aqui como referência histórica.

## O que tem aqui

- React + Vite + TypeScript, roteamento com `react-router-dom`
- Landing, catálogo de serviços, wizard de agendamento, login, área admin, página "sobre" e página de curso (institucional, sem integração real com o portal de cursos)
- `services/gemini.ts`: chama a API do Gemini **diretamente do navegador** — não existe backend próprio para esta versão. Agendamentos e usuários não persistem em nenhum servidor.
- Tailwind via CDN (não recomendado para produção — corrigido na v2)

## Rodando localmente

**Pré-requisito:** Node.js

1. `npm install`
2. Defina `GEMINI_API_KEY` em `.env.local`
3. `npm run dev`

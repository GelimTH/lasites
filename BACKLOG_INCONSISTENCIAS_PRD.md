# Backlog de Inconsistências — PRD LA Sites

Data: 2026-04-16  
Projeto: `pse`  
Base de comparação: `PRD_LASITES.md`

## Objetivo

Registrar inconsistências entre o PRD e a implementação atual, priorizando correções por impacto em conversão, SEO e performance.

## Escala de Prioridade

- `P0` = crítico (afeta conversão, SEO essencial ou requisito funcional central)
- `P1` = alto (afeta UX, performance percebida ou conformidade relevante)
- `P2` = médio/baixo (alinhamento estrutural, governança e acabamento)

## Backlog Priorizado

| ID | Prioridade | Inconsistência | Evidência Atual | Impacto | Critério de Pronto |
|---|---|---|---|---|---|
| BL-001 | P0 | Meta tags Open Graph não implementadas no site principal | `index.html` contém apenas `charset`, `viewport`, `title` e favicon | Compartilhamento no WhatsApp sem preview profissional (logo/descrição), divergindo do PRD | Incluir OG/Twitter tags mínimas (`og:title`, `og:description`, `og:image`, `og:url`, `twitter:card`) e validar preview |
| BL-002 | P0 | Meta tags Open Graph ausentes nos mockups standalone | `src/mockups/*/index.html` possuem apenas metadados básicos | URLs de mockup compartilhadas sem contexto visual adequado | Definir metadados de compartilhamento por mockup (ou estratégia central) |
| BL-003 | P1 | Requisito de imagens em WebP não cumprido de forma consistente | Build gera assets pesados em JPG/PNG (ex.: ícone PNG com tamanho elevado) | Maior tempo de download e piora potencial de LCP em mobile | Converter ativos relevantes para WebP/AVIF e manter fallback somente quando necessário |
| BL-004 | P1 | Showcase pode impactar LCP e custo de render | Hero mantém vários iframes preloaded com crossfade + iframes no catálogo | Aumento de custo de CPU/memória e possível degradação de performance inicial | Reduzir carga inicial (lazy real, render sob demanda, poster estático antes do iframe) e medir LCP |
| BL-005 | P1 | Seção "Sobre" do sitemap não está implementada | Home contém Hero, Showcase, Processo e FAQ; seção Sobre não existe | Perda de clareza da proposta de negócio e não conformidade com PRD | Adicionar seção Sobre com copy objetiva e coerente com proposta LA Sites |
| BL-006 | P1 | Footer sem link real de rede social | Item `@lasites` usa `href="#"` | Quebra de expectativa do usuário e perda de canal de contato | Inserir link oficial do Instagram e garantir abertura externa segura |
| BL-007 | P2 | Divergência entre stack documentada e implementação (Tailwind config) | PRD cita `tailwind.config.js`; projeto usa Tailwind v4 com `@theme` no CSS | Ruído de manutenção e onboarding técnico | Atualizar PRD para refletir stack real ou alinhar estrutura técnica à documentação |
| BL-008 | P2 | Estrutura de pastas parcialmente divergente do item 5 do PRD | PRD menciona `src/assets` e `src/styles`; projeto usa estrutura próxima, mas diferente | Baixo impacto funcional, mas afeta governança e previsibilidade | Consolidar estrutura final e documentar convenção oficial |

## Dependências e Sequência Recomendada

1. SEO técnico (`BL-001`, `BL-002`)  
2. Otimização de mídia/performance (`BL-003`, `BL-004`)  
3. Conformidade de conteúdo/UX (`BL-005`, `BL-006`)  
4. Alinhamento documental e arquitetura (`BL-007`, `BL-008`)

## Observações

- Link oficial para uso no item de redes sociais do footer: [Instagram LA Sites](https://www.instagram.com/lasites.br?igsh=MWN5MWE4bTN4Zm9nNQ==)
- Este backlog não aplica mudanças no código; apenas organiza escopo de correção.

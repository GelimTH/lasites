import type { MockupEntry, MockupMetaModule } from '@/types/catalog';

/**
 * AUTO-DISCOVERY ENGINE — Turno 4 (iFrame MPA)
 *
 * Fonte de verdade: pastas com index.html em src/mockups/{id}/
 * Labels: lidos de meta.ts (eager, síncrono) — bytes mínimos no bundle da casca.
 * URLs: construídas a partir do BASE_URL + convenção de caminho MPA do Vite.
 *
 * Para adicionar um mockup:
 *   src/mockups/meu-projeto/index.html   ← entry point standalone (obrigatório)
 *   src/mockups/meu-projeto/meta.ts      ← label + metadados (opcional)
 */

// Eager-load só de metadados — não arrasta componentes para o bundle da casca
const metaModules = import.meta.glob<MockupMetaModule>('./**/meta.ts', {
  eager: true,
});

// Fonte de verdade: quais pastas têm HTML standalone (= são mockups válidos)
const htmlEntries = import.meta.glob('./**/index.html');

function extractId(path: string): string {
  // "./mockup-a/index.html" ou "./mockup-a/meta.ts" → "mockup-a"
  const withoutPrefix = path.startsWith('./') ? path.slice(2) : path;
  const slashIndex = withoutPrefix.indexOf('/');
  return slashIndex !== -1 ? withoutPrefix.slice(0, slashIndex) : withoutPrefix;
}

function formatLabel(id: string): string {
  return id
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// Índice id → meta para lookup O(1)
const metaById = Object.fromEntries(
  Object.entries(metaModules).map(([path, mod]) => [extractId(path), mod.default])
);

export const mockupRegistry: MockupEntry[] = Object.keys(htmlEntries)
  .map((path) => {
    const id = extractId(path);
    const meta = metaById[id];

    return {
      id,
      label: meta?.label ?? formatLabel(id),
      url: `${import.meta.env.BASE_URL}src/mockups/${id}/`,
      description: meta?.description,
      tag: meta?.tag,
    };
  })
  .sort((a, b) => a.id.localeCompare(b.id));

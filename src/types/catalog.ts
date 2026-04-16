/**
 * Metadados opcionais de cada mockup — declarados em meta.ts por pasta.
 */
export interface MockupMeta {
  /** Nome exibido no IOSSlider */
  label: string;
  /** Descrição curta (tooltip futuro) */
  description?: string;
  /** Tag de categoria (ex: 'landing', 'dashboard') */
  tag?: string;
}

/** Módulo resolvido do meta.ts de cada mockup */
export interface MockupMetaModule {
  default: MockupMeta;
}

/**
 * Entrada do registry — gerada automaticamente pelo auto-discovery.
 * `url` aponta para o HTML standalone do mockup (servido em iframe).
 */
export interface MockupEntry {
  /** ID derivado do nome da pasta: "mockup-01" */
  id: string;
  /** Label para o IOSSlider — usa meta.label ou fallback formatado do id */
  label: string;
  /** URL do HTML standalone do mockup, relativa ao BASE_URL do Vite */
  url: string;
  /** Descrição curta exposta no card do Showcase */
  description?: string;
  /** Tag de nicho (ex: 'gastronomia', 'saude') */
  tag?: string;
}

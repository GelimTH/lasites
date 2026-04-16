import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { MockupEntry } from '@/types/catalog';

interface MockupFrameProps {
  entry: MockupEntry;
}

/**
 * Frame isolado por mockup.
 * Re-monta quando `key` (id) muda → isLoaded reseta automaticamente.
 *
 * Isolamento garantido pelo iframe:
 *  - CSS global, variáveis :root e resets do mockup não vazam para a casca
 *  - JS do mockup roda em contexto de browsing separado
 *  - sandbox="allow-scripts allow-same-origin" permite React + HMR do Vite
 */
function MockupFrame({ entry }: MockupFrameProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <motion.div
      className="absolute inset-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
    >
      {/*
        Skeleton: z-10, cobre o iframe durante o carregamento.
        AnimatePresence cuida do fade-out suave quando onLoad dispara.
      */}
      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            key="skeleton"
            className="absolute inset-0 z-10 flex items-center justify-center bg-[#0A0A0A]"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <span className="h-1.5 w-1.5 animate-ping rounded-full bg-white/25" />
          </motion.div>
        )}
      </AnimatePresence>

      {/*
        pb-[88px]: reserva a área do IOSSlider fixo (bottom-10 + altura do slider ~48px).
        O mockup renderiza sem sobreposição do slider da casca.
      */}
      <div className="absolute inset-0 pb-[88px]">
        <iframe
          src={entry.url}
          title={entry.label}
          onLoad={() => setIsLoaded(true)}
          sandbox="allow-scripts allow-same-origin"
          className="block h-full w-full border-0"
        />
      </div>
    </motion.div>
  );
}

interface ShowcaseWrapperProps {
  activeEntry: MockupEntry | undefined;
}

export function ShowcaseWrapper({ activeEntry }: ShowcaseWrapperProps) {
  return (
    <div className="relative h-full w-full">
      {/*
        mode="wait": exit do frame anterior completa antes do próximo entrar.
        Evita dois iframes ativos simultaneamente (dois contextos de browsing = memória dupla).
      */}
      <AnimatePresence mode="wait">
        {activeEntry && (
          <MockupFrame key={activeEntry.id} entry={activeEntry} />
        )}
      </AnimatePresence>
    </div>
  );
}

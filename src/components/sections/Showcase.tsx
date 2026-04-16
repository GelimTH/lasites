import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, X, MessageCircle, Eye } from 'lucide-react';
import { Badge } from '@/components/common/Badge';
import { IOSSlider } from '@/components/ui/IOSSlider';
import { mockupRegistry } from '@/mockups/index';
import { buildModelWhatsAppUrl } from '@/utils/whatsapp';
import type { MockupEntry } from '@/types/catalog';

/* ── Live iframe preview (scaled down) ──────────────────────────
   Renders at 1440 px, CSS-scaled to fit the card thumbnail.
   pointer-events:none → purely decorative, no interaction.
*/
function LivePreview({ url, label }: { url: string; label: string }) {
  return (
    <div className="relative overflow-hidden bg-la-surface" style={{ height: 220 }}>
      <div className="absolute inset-0 bg-la-purple/30 animate-pulse" />
      <div
        style={{
          width: 1440,
          height: 1080,
          transform: 'scale(0.278)',
          transformOrigin: 'top left',
          pointerEvents: 'none',
        }}
      >
        <iframe
          src={url}
          width={1440}
          height={1080}
          className="block border-0"
          sandbox="allow-scripts allow-same-origin"
          title={label}
          loading="lazy"
        />
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-la-surface to-transparent" />
    </div>
  );
}

/* ── Full-screen preview modal (iOS Slider experience) ───────────
   - z-[60] → covers the shell's floating WhatsApp button (z-50)
   - IOSSlider is reused as-is at z-[999] (fixed, floats above iframe)
   - iframe height accounts for the slider so content isn't obscured
   - initialIndex → opens on the card that was clicked
   - ESC key closes
   - Body scroll is locked while open (prevents double scrollbar)
*/
export function PreviewModal({
  initialIndex,
  onClose,
}: {
  initialIndex: number;
  onClose: () => void;
}) {
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const active = mockupRegistry[activeIndex] as MockupEntry | undefined;

  const handleKey = useCallback(
    (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); },
    [onClose],
  );

  // Lock body scroll → eliminates double scrollbar while modal is open
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [handleKey]);

  return (
    <motion.div
      /* z-[60] sits above the shell WhatsApp button (z-50) */
      className="fixed inset-0 z-[60] flex flex-col"
      style={{ background: 'rgba(11, 5, 21, 0.97)', backdropFilter: 'blur(20px)' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
    >
      {/* ── Top bar ── */}
      <div className="relative z-10 shrink-0 flex items-center justify-between px-6 h-14 border-b border-white/6 glass">
        <AnimatePresence mode="wait">
          <motion.div
            key={active?.id}
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 8 }}
            transition={{ duration: 0.18 }}
          >
            <span className="font-display font-bold text-white">{active?.label}</span>
            {active?.tag && <Badge label={active.tag} />}
          </motion.div>
        </AnimatePresence>

        <div className="flex items-center gap-3">
          {active && (
            <a
              href={buildModelWhatsAppUrl(active.label)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-semibold bg-la-green text-la-bg glow-green-sm hover:opacity-90 transition-opacity"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              Quero este modelo
            </a>
          )}
          <button
            onClick={onClose}
            aria-label="Fechar preview"
            className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/6 text-la-muted hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ── Iframe area with crossfade ── */}
      <div className="relative flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          {active && (
            <motion.div
              key={active.id}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22, ease: 'easeInOut' }}
            >
              {/* Fill full height so no bottom band appears behind the slider */}
              <iframe
                src={active.url}
                className="w-full border-0 block"
                style={{ height: '100%' }}
                sandbox="allow-scripts allow-same-origin"
                title={active.label}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── iOS Slider — the signature feature, unchanged ── */}
      <IOSSlider
        projects={mockupRegistry.map((e) => e.label)}
        activeIndex={activeIndex}
        onSelect={setActiveIndex}
      />
    </motion.div>
  );
}

/* ── Mockup card ─────────────────────────────────────────────── */
function MockupCard({
  entry,
  index,
  onPreview,
}: {
  entry: MockupEntry;
  index: number;
  onPreview: (index: number) => void;
}) {
  return (
    <motion.div
      className="group relative flex flex-col rounded-2xl overflow-hidden border border-white/6 bg-la-surface hover:border-la-green/30 transition-all duration-300 hover:shadow-[0_0_50px_rgba(158,255,0,0.10)]"
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 350, damping: 28 }}
    >
      <LivePreview url={entry.url} label={entry.label} />

      <div className="flex flex-col gap-4 p-5">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-display font-bold text-lg text-white leading-tight">
              {entry.label}
            </h3>
            {entry.description && (
              <p className="text-la-muted text-sm mt-0.5 line-clamp-1">{entry.description}</p>
            )}
          </div>
          {entry.tag && <Badge label={entry.tag} className="shrink-0 mt-0.5" />}
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => onPreview(index)}
            className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-semibold bg-white/5 border border-white/8 text-white hover:bg-white/10 hover:border-white/15 transition-all duration-200"
          >
            <Eye className="w-3.5 h-3.5" />
            Ver preview
          </button>
          <a
            href={buildModelWhatsAppUrl(entry.label)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-semibold bg-la-green text-la-bg glow-green-sm hover:opacity-90 transition-opacity"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            Quero este
          </a>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Section ─────────────────────────────────────────────────── */
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

export function ShowcaseSection({ onPreview }: { onPreview: (index: number) => void }) {
  return (
    <section id="showcase" className="relative py-28">
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(158,255,0,0.2), transparent)' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-la-green text-xs font-semibold tracking-widest uppercase mb-3">
            Catálogo
          </p>
          <h2 className="font-display font-black text-4xl md:text-5xl tracking-tight text-white mb-4">
            Escolha o modelo perfeito
          </h2>
          <p className="text-la-muted text-base max-w-xl mx-auto">
            Todos os modelos são responsivos e prontos para personalização.
            Clique em "Ver preview" para a experiência completa.
          </p>
        </motion.div>

        {/* Grid */}
        {mockupRegistry.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            {mockupRegistry.map((entry, i) => (
              <motion.div key={entry.id} variants={cardVariants}>
                <MockupCard entry={entry} index={i} onPreview={onPreview} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-20 text-la-muted">Modelos em breve...</div>
        )}

        {/* Bottom CTA */}
        <motion.div
          className="mt-14 text-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <p className="text-la-muted text-sm mb-1">Não encontrou o nicho ideal?</p>
          <a
            href="#faq"
            className="inline-flex items-center gap-1.5 text-la-green text-sm font-medium hover:underline"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Fale com a gente — fazemos sob medida
          </a>
        </motion.div>
      </div>

    </section>
  );
}

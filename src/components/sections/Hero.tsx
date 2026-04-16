import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { buildWhatsAppUrl } from '@/utils/whatsapp';
import { mockupRegistry } from '@/mockups/index';
import iconeDark from '@/assets/icone_dark.jpg';

/* ── Animated background orb ─────────────────────────────────── */
function Orb({
  size,
  color,
  style,
  delay = 0,
}: {
  size: number;
  color: string;
  style: React.CSSProperties;
  delay?: number;
}) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{ width: size, height: size, background: color, filter: 'blur(80px)', ...style }}
      animate={{ scale: [1, 1.18, 1], opacity: [0.5, 0.75, 0.5] }}
      transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay }}
    />
  );
}

/* ── Auto-cycling browser window ─────────────────────────────── */
function BrowserFrame() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (mockupRegistry.length <= 1) return;
    const id = setInterval(
      () => setActiveIndex((i) => (i + 1) % mockupRegistry.length),
      5000,
    );
    return () => clearInterval(id);
  }, []);

  const active = mockupRegistry[activeIndex];

  return (
    <motion.div
      className="relative w-full max-w-[560px] rounded-2xl overflow-hidden shadow-[0_0_80px_rgba(158,255,0,0.15),0_40px_80px_rgba(0,0,0,0.6)] border border-white/8"
      style={{ background: '#12062B' }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
    >
      {/* Browser chrome */}
      <div className="flex items-center gap-2 px-4 py-3 bg-[#0d0621] border-b border-white/6">
        <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
        <div className="flex-1 mx-4 bg-white/5 rounded-md h-5 flex items-center px-2.5">
          <AnimatePresence mode="wait">
            <motion.span
              key={active?.id}
              className="text-[10px] text-la-muted truncate"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.25 }}
            >
              lasites.com.br/{active?.id ?? ''}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>

      {/* Stacked iframes — all preloaded, crossfade between active */}
      <div className="relative overflow-hidden" style={{ height: 320 }}>
        <div className="absolute inset-0 bg-la-purple" />

        {mockupRegistry.map((entry, i) => (
          <motion.div
            key={entry.id}
            className="absolute inset-0"
            animate={{ opacity: i === activeIndex ? 1 : 0 }}
            transition={{ duration: 0.7, ease: 'easeInOut' }}
          >
            <div
              style={{
                width: 1440,
                height: 1080,
                transform: 'scale(0.388)',
                transformOrigin: 'top left',
                pointerEvents: 'none',
              }}
            >
              <iframe
                src={entry.url}
                width={1440}
                height={1080}
                className="border-0 block"
                sandbox="allow-scripts allow-same-origin"
                title={entry.label}
              />
            </div>
          </motion.div>
        ))}

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#12062B] to-transparent pointer-events-none" />
      </div>

      {/* Indicator dots */}
      <div className="flex items-center justify-center gap-1.5 py-3 bg-[#0d0621]">
        {mockupRegistry.map((entry, i) => (
          <button
            key={entry.id}
            aria-label={entry.label}
            onClick={() => setActiveIndex(i)}
            className={`rounded-full transition-all duration-300 ${
              i === activeIndex
                ? 'w-4 h-1.5 bg-la-green'
                : 'w-1.5 h-1.5 bg-white/20 hover:bg-white/40'
            }`}
          />
        ))}
      </div>
    </motion.div>
  );
}

/* ── Hero ─────────────────────────────────────────────────────── */
export function Hero({ onOpenShowcase }: { onOpenShowcase: () => void }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

  return (
    <section
      ref={ref}
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden dot-grid"
    >
      {/* Background orbs */}
      <motion.div style={{ y }} className="absolute inset-0 pointer-events-none">
        <Orb size={700} color="#1A0B2E" style={{ bottom: -200, left: -150 }} delay={0} />
        <Orb size={400} color="#9EFF00" style={{ top: -100, right: -80, opacity: 0.08 }} delay={2} />
        <Orb size={300} color="#6B21FF" style={{ top: '40%', left: '35%', opacity: 0.12 }} delay={4} />
      </motion.div>

      {/* Gradient line accent */}
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(158,255,0,0.4), transparent)' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-16 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full">
        {/* Left — copy */}
        <div>
          {/* Announcement badge */}
          <motion.div
            className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full glass text-xs font-medium text-la-muted mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <img src={iconeDark} alt="" className="w-5 h-5 rounded-full object-cover" />
            Sites para quem não pode parar
          </motion.div>

          {/* Headline */}
          <motion.h1
            className="font-display font-black text-5xl md:text-6xl lg:text-7xl leading-[1.04] tracking-tight text-white mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            Seu negócio{' '}
            <br />
            merece existir{' '}
            <span className="text-gradient-la">online.</span>
          </motion.h1>

          {/* Body */}
          <motion.p
            className="text-la-muted text-lg leading-relaxed max-w-[480px] mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            A LA Sites entrega sites rápidos, profissionais e personalizados para
            microempreendedores. Sem enrolação — pronto e no ar em 48 horas.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <a
              href={buildWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm bg-la-green text-la-bg glow-green hover:opacity-90 transition-opacity"
            >
              Quero meu site agora
              <ArrowRight className="w-4 h-4" />
            </a>
            <button
              onClick={onOpenShowcase}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm text-white border border-white/10 hover:border-la-green/40 hover:bg-la-green/5 transition-all duration-200 cursor-pointer"
            >
              Ver modelos ao vivo
            </button>
          </motion.div>

          {/* Social proof pills */}
          <motion.div
            className="flex items-center gap-4 mt-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className="flex -space-x-2">
              {['#9EFF00', '#FF6B6B', '#6C63FF', '#FFD166'].map((c) => (
                <div
                  key={c}
                  className="w-7 h-7 rounded-full border-2 border-la-bg"
                  style={{ background: c }}
                />
              ))}
            </div>
            <p className="text-la-muted text-sm">
              <span className="text-white font-semibold">+40 negócios</span> já online com a LA Sites
            </p>
          </motion.div>
        </div>

        {/* Right — cycling browser mockup */}
        <motion.div
          className="hidden lg:flex justify-end items-center"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
        >
          {mockupRegistry.length > 0 ? (
            <BrowserFrame />
          ) : (
            <div className="w-full max-w-[560px] h-[400px] rounded-2xl bg-la-purple border border-white/8 animate-pulse" />
          )}
        </motion.div>
      </div>

      {/* Bottom scroll hint */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="w-px h-8 bg-gradient-to-b from-transparent to-white/20" />
      </motion.div>
    </section>
  );
}

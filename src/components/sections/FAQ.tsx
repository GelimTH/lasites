import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { FAQ_ITEMS } from '@/constants';
import { buildWhatsAppUrl } from '@/utils/whatsapp';

function FAQItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.div
      className={`glass rounded-xl border transition-all duration-300 overflow-hidden ${
        isOpen ? 'border-la-green/30 shadow-[0_0_30px_rgba(158,255,0,0.07)]' : 'border-white/5'
      }`}
      layout
    >
      <button
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
        onClick={onToggle}
      >
        <span className={`font-medium text-sm md:text-base transition-colors ${isOpen ? 'text-white' : 'text-white/80'}`}>
          {question}
        </span>
        <span
          className={`shrink-0 flex items-center justify-center w-6 h-6 rounded-full border transition-all duration-300 ${
            isOpen ? 'bg-la-green border-la-green text-la-bg' : 'border-white/15 text-la-muted'
          }`}
        >
          {isOpen ? <Minus className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
          >
            <p className="px-6 pb-5 text-la-muted text-sm leading-relaxed">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (i: number) => setOpenIndex((prev) => (prev === i ? null : i));

  return (
    <section id="faq" className="relative py-28">
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 50% 60% at 50% 0%, rgba(26,11,46,0.5) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-3xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-la-green text-xs font-semibold tracking-widest uppercase mb-3">
            Tire suas dúvidas
          </p>
          <h2 className="font-display font-black text-4xl md:text-5xl tracking-tight text-white">
            Dúvidas frequentes
          </h2>
        </motion.div>

        {/* Accordion */}
        <motion.div
          className="flex flex-col gap-3"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {FAQ_ITEMS.map((item, i) => (
            <FAQItem
              key={i}
              question={item.question}
              answer={item.answer}
              isOpen={openIndex === i}
              onToggle={() => toggle(i)}
            />
          ))}
        </motion.div>

        {/* CTA below FAQ */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <p className="text-la-muted text-sm mb-4">
            Ainda tem dúvidas? A gente responde em minutos.
          </p>
          <a
            href={buildWhatsAppUrl('Olá! Tenho uma dúvida sobre os sites da LA Sites.')}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-white/5 border border-white/10 text-white hover:border-la-green/30 hover:bg-la-green/5 transition-all duration-200"
          >
            Falar pelo WhatsApp
          </a>
        </motion.div>
      </div>
    </section>
  );
}

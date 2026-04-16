import { motion, type Variants } from 'framer-motion';
import { MousePointer2, MessageSquare, Rocket } from 'lucide-react';
import { PROCESS_STEPS } from '@/constants';

const STEP_ICONS = [MousePointer2, MessageSquare, Rocket];

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

export function Process() {
  return (
    <section id="processo" className="relative py-28 overflow-hidden">
      {/* Background accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 100%, rgba(26,11,46,0.6) 0%, transparent 70%)',
        }}
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
            Simples assim
          </p>
          <h2 className="font-display font-black text-4xl md:text-5xl tracking-tight text-white">
            Como funciona?
          </h2>
        </motion.div>

        {/* Steps grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 relative"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {/* Connector line (desktop only) */}
          <div
            className="hidden md:block absolute top-[52px] left-[calc(16.67%+24px)] right-[calc(16.67%+24px)] h-px pointer-events-none"
            style={{
              background:
                'linear-gradient(90deg, rgba(158,255,0,0.15), rgba(158,255,0,0.5), rgba(158,255,0,0.15))',
            }}
          />

          {PROCESS_STEPS.map((step, i) => {
            const Icon = STEP_ICONS[i];
            return (
              <motion.div
                key={step.number}
                variants={itemVariants}
                className="relative group"
              >
                <div className="glass rounded-2xl p-8 h-full flex flex-col gap-5 border border-white/5 hover:border-la-green/25 transition-all duration-300 hover:shadow-[0_0_40px_rgba(158,255,0,0.08)]">
                  {/* Number + icon row */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-la-green/10 border border-la-green/20 group-hover:bg-la-green/15 transition-colors">
                      <Icon className="w-5 h-5 text-la-green" />
                    </div>
                    <span className="font-display font-black text-5xl text-white/5 select-none leading-none">
                      {step.number}
                    </span>
                  </div>

                  {/* Text */}
                  <div>
                    <h3 className="font-display font-bold text-xl text-white mb-2">
                      {step.title}
                    </h3>
                    <p className="text-la-muted text-sm leading-relaxed">{step.description}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

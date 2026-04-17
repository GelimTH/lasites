import { motion, type Variants } from 'framer-motion';
import { Zap, Clock, ShieldCheck } from 'lucide-react';

const differentials = [
  {
    icon: Zap,
    title: 'Alta Performance',
    description:
      'Sites estáticos que carregam em menos de 2 segundos — otimizados para mobile e para os algoritmos do Google.',
  },
  {
    icon: Clock,
    title: '48h no Ar',
    description:
      'Do briefing ao domínio ativo em dois dias úteis. Você nos envia o conteúdo; a gente executa sem enrolação.',
  },
  {
    icon: ShieldCheck,
    title: 'Design Profissional',
    description:
      'Cada modelo é projetado com identidade visual sólida, responsivo em qualquer tela e calibrado para converter visitantes em clientes.',
  },
] as const;

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number, number, number, number], delay: i * 0.12 },
  }),
};

export function About() {
  return (
    <section id="sobre" className="relative py-28 bg-la-surface/20">
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(158,255,0,0.15), transparent)' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Copy */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-la-green text-xs font-semibold tracking-widest uppercase mb-3">
              Sobre a LA Sites
            </p>
            <h2 className="font-display font-black text-4xl md:text-5xl tracking-tight text-white mb-6 leading-tight">
              Feitos para quem{' '}
              <span className="text-la-green">empreende</span>
            </h2>
            <p className="text-la-muted text-base leading-relaxed mb-4 max-w-lg">
              A LA Sites nasce de uma missão simples: todo microempreendedor merece uma presença
              digital profissional, independente do tamanho do seu negócio ou do seu orçamento.
            </p>
            <p className="text-la-muted text-base leading-relaxed max-w-lg">
              Unimos design de alto nível e tecnologia de ponta para entregar sites que vendem —
              rápidos, bonitos e no ar antes que você precise deles.
            </p>
          </motion.div>

          {/* Differentials */}
          <div className="flex flex-col gap-5">
            {differentials.map((item, i) => (
              <motion.div
                key={item.title}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="flex items-start gap-5 p-5 rounded-2xl border border-white/6 bg-la-surface hover:border-la-green/20 transition-colors duration-300"
              >
                <div className="shrink-0 flex items-center justify-center w-10 h-10 rounded-xl bg-la-green/10 border border-la-green/20">
                  <item.icon className="w-5 h-5 text-la-green" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-white mb-1">{item.title}</h3>
                  <p className="text-la-muted text-sm leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(158,255,0,0.1), transparent)' }}
      />
    </section>
  );
}

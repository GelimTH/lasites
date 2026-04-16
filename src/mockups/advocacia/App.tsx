import { motion } from 'framer-motion';
import { Scale, ArrowRight, Shield, FileText, Building2, Users } from 'lucide-react';
import type { ComponentType } from 'react';

// ─── Data ────────────────────────────────────────────────────────────────────

interface PracticeArea {
  title: string;
  desc: string;
  Icon: ComponentType<{ className?: string }>;
}

const AREAS: PracticeArea[] = [
  { title: 'Direito Empresarial', desc: 'Fusões, aquisições, contratos societários e compliance corporativo', Icon: Building2 },
  { title: 'Direito Civil', desc: 'Responsabilidade civil, contratos patrimoniais e relações obrigacionais', Icon: FileText },
  { title: 'Direito Trabalhista', desc: 'Relações de trabalho, negociações coletivas e mediação', Icon: Users },
  { title: 'Direito Tributário', desc: 'Planejamento fiscal, defesas administrativas e consultoria estratégica', Icon: Shield },
];

const PARTNERS = [
  {
    name: 'Dr. Eduardo Monteiro',
    oab: 'OAB/SP 123.456',
    specialty: 'Sócio-fundador · Direito Empresarial',
    bio: '20 anos de experiência em M&A e reestruturações societárias. Ex-sócio de firma global.',
    img: 'https://i.pravatar.cc/400?img=12',
  },
  {
    name: 'Dra. Isabela Corrêa',
    oab: 'OAB/SP 234.567',
    specialty: 'Sócia · Direito Civil e Tributário',
    bio: 'Mestre em Direito Tributário pela USP. Referência em planejamento fiscal estratégico.',
    img: 'https://i.pravatar.cc/400?img=9',
  },
  {
    name: 'Dr. André Vasques',
    oab: 'OAB/SP 345.678',
    specialty: 'Sócio · Direito Trabalhista',
    bio: 'Especialista em relações coletivas de trabalho, arbitragem e acordos extrajudiciais.',
    img: 'https://i.pravatar.cc/400?img=15',
  },
];

const WA_PHONE = '5511999990003';
const WA_MSG = 'Olá! Gostaria de agendar uma consulta com um advogado do escritório.';

// ─── Animation Variants ───────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function WhatsAppFAB() {
  const url = `https://wa.me/${WA_PHONE}?text=${encodeURIComponent(WA_MSG)}`;
  return (
    <a href={url} target="_blank" rel="noopener noreferrer"
      aria-label="Consulta via WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-2xl shadow-green-900/40 transition-transform hover:scale-110 active:scale-95">
      <svg className="h-7 w-7 fill-white" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    </a>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AdvocaciaApp() {
  const waUrl = `https://wa.me/${WA_PHONE}?text=${encodeURIComponent(WA_MSG)}`;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased">

      {/* ── Header ── */}
      <header className="fixed top-0 inset-x-0 z-40 flex items-center justify-between px-8 py-5 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/50">
        <div className="flex items-center gap-2.5">
          <Scale className="h-4 w-4 text-amber-500" />
          <span className="text-sm font-semibold tracking-[0.2em] uppercase text-slate-200">
            Monteiro Corrêa
          </span>
        </div>
        <nav className="hidden md:flex items-center gap-8 text-xs tracking-[0.15em] uppercase text-slate-500">
          <a href="#areas" className="hover:text-amber-500 transition-colors">Atuação</a>
          <a href="#socios" className="hover:text-amber-500 transition-colors">Sócios</a>
          <a href={waUrl} target="_blank" rel="noopener noreferrer"
            className="rounded border border-amber-500/50 px-4 py-1.5 text-amber-400 hover:bg-amber-500/10 transition-colors">
            Consulta
          </a>
        </nav>
      </header>

      {/* ── Hero ── */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-[0.07]"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1600&q=85&fit=crop&auto=format')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-transparent to-slate-950" />

        <div className="relative z-10 max-w-6xl mx-auto px-8 pt-32 pb-24">
          <motion.div initial="hidden" animate="show" variants={stagger} className="max-w-3xl">
            <motion.p variants={fadeUp} className="text-xs font-semibold tracking-[0.35em] text-amber-500 uppercase mb-6">
              Advocacia · São Paulo · Est. 2004
            </motion.p>
            <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl font-extralight tracking-tight text-white leading-[1.05] mb-8">
              Soluções jurídicas com precisão e discrição
            </motion.h1>
            <motion.p variants={fadeUp} className="text-lg text-slate-400 leading-relaxed mb-10 max-w-xl">
              Vinte anos assessorando empresas e pessoas físicas com excelência técnica e compromisso irrestrito com os interesses dos nossos clientes.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-5">
              <a href={waUrl} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded border border-amber-500 px-6 py-3 text-sm font-medium text-amber-400 hover:bg-amber-500/10 transition-all">
                Agendar Consulta
                <ArrowRight className="h-4 w-4" />
              </a>
              <a href="#areas" className="text-sm text-slate-500 hover:text-slate-300 transition-colors">
                Áreas de atuação →
              </a>
            </motion.div>
          </motion.div>
        </div>

        {/* Decorative vertical rule */}
        <div className="absolute right-1/3 top-0 bottom-0 w-px bg-slate-800/40 hidden xl:block" />
      </section>

      {/* ── Áreas de Atuação ── */}
      <section id="areas" className="py-24 border-t border-slate-800/50">
        <div className="max-w-6xl mx-auto px-8">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
            <motion.p variants={fadeUp} className="text-xs tracking-[0.35em] text-amber-500 uppercase mb-3">
              Especialização
            </motion.p>
            <motion.h2 variants={fadeUp} className="text-3xl font-extralight tracking-tight text-white mb-12">
              Áreas de Atuação
            </motion.h2>

            {/* Grid com divisor entre células */}
            <motion.div variants={stagger} className="grid grid-cols-1 md:grid-cols-2 gap-px bg-slate-800/40">
              {AREAS.map(({ title, desc, Icon }) => (
                <motion.div key={title} variants={fadeUp}
                  className="group bg-slate-950 p-8 hover:bg-slate-900/60 transition-colors duration-200">
                  <Icon className="h-5 w-5 text-amber-500/70 mb-4 group-hover:text-amber-500 transition-colors" />
                  <h3 className="font-medium text-white mb-2 text-sm tracking-wide">{title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Sócios ── */}
      <section id="socios" className="py-24 border-t border-slate-800/50">
        <div className="max-w-6xl mx-auto px-8">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
            <motion.p variants={fadeUp} className="text-xs tracking-[0.35em] text-amber-500 uppercase mb-3">
              Corpo Diretivo
            </motion.p>
            <motion.h2 variants={fadeUp} className="text-3xl font-extralight tracking-tight text-white mb-12">
              Os Sócios
            </motion.h2>

            <motion.div variants={stagger} className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {PARTNERS.map((p) => (
                <motion.article key={p.name} variants={fadeUp} className="group">
                  <div className="mb-6 overflow-hidden">
                    <img
                      src={p.img}
                      alt={p.name}
                      className="h-72 w-full object-cover grayscale group-hover:grayscale-0 brightness-90 transition-all duration-500"
                    />
                  </div>
                  <div className="border-l-2 border-amber-500/25 pl-4 group-hover:border-amber-500 transition-colors duration-300">
                    <h3 className="font-medium text-white text-sm">{p.name}</h3>
                    <p className="text-xs text-amber-500/60 mt-0.5 mb-1.5">{p.oab}</p>
                    <p className="text-xs text-slate-400 mb-3">{p.specialty}</p>
                    <p className="text-sm text-slate-500 leading-relaxed">{p.bio}</p>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 border-t border-slate-800/50">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}
          className="max-w-2xl mx-auto text-center px-8">
          <motion.p variants={fadeUp} className="text-xs tracking-[0.35em] text-amber-500 uppercase mb-4">
            Consultoria
          </motion.p>
          <motion.h2 variants={fadeUp} className="text-4xl font-extralight tracking-tight text-white mb-4">
            Fale com um especialista
          </motion.h2>
          <motion.p variants={fadeUp} className="text-slate-400 leading-relaxed mb-10">
            Primeira consulta de 30 minutos sem custo. Avaliamos seu caso com objetividade e confidencialidade absoluta.
          </motion.p>
          <motion.a variants={fadeUp}
            href={waUrl} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-3 rounded border border-amber-500 px-8 py-4 text-sm font-medium text-amber-400 hover:bg-amber-500/10 transition-all">
            Solicitar Consulta via WhatsApp
            <ArrowRight className="h-4 w-4" />
          </motion.a>
        </motion.div>
      </section>

      {/* ── Footer ── */}
      <footer className="py-8 px-8 border-t border-slate-800/50 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-700">
        <div className="flex items-center gap-2">
          <Scale className="h-3 w-3 text-amber-500/40" />
          <span>Monteiro Corrêa Advogados Associados</span>
        </div>
        <span>© {new Date().getFullYear()} · OAB/SP registrado</span>
      </footer>

      <WhatsAppFAB />
    </div>
  );
}

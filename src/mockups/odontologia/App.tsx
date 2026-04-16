import { motion } from 'framer-motion';
import { Award, Calendar, CheckCircle, Users } from 'lucide-react';

// ─── Data ────────────────────────────────────────────────────────────────────

const SPECIALTIES = [
  { title: 'Implantes', desc: 'Reabilitação oral com implantes de titânio de última geração', emoji: '🦷' },
  { title: 'Ortodontia', desc: 'Aparelhos fixos, removíveis e alinhadores invisíveis Invisalign', emoji: '😁' },
  { title: 'Clareamento', desc: 'Clareamento a laser e moldeiras personalizadas de alta performance', emoji: '✨' },
  { title: 'Endodontia', desc: 'Tratamento de canal com tecnologia rotatória e microscópio operatório', emoji: '🔬' },
  { title: 'Próteses', desc: 'Próteses fixas e removíveis em porcelana e zircônia monolítica', emoji: '💎' },
  { title: 'Periodontia', desc: 'Tratamento de gengiva e prevenção de doenças periodontais', emoji: '🩺' },
];

const TEAM = [
  {
    name: 'Dr. Carlos Menezes',
    role: 'Implantodontia',
    cro: 'CRO-SP 12.345',
    img: 'https://i.pravatar.cc/400?img=11',
  },
  {
    name: 'Dra. Fernanda Lima',
    role: 'Ortodontia',
    cro: 'CRO-SP 54.321',
    img: 'https://i.pravatar.cc/400?img=5',
  },
  {
    name: 'Dr. Rafael Torres',
    role: 'Endodontia',
    cro: 'CRO-SP 98.765',
    img: 'https://i.pravatar.cc/400?img=8',
  },
];

const STATS = [
  { n: '15+', label: 'Anos de experiência' },
  { n: '8k+', label: 'Pacientes atendidos' },
  { n: '6', label: 'Especialidades' },
  { n: '98%', label: 'Taxa de satisfação' },
];

const WA_PHONE = '5511999990002';
const WA_MSG = 'Olá! Gostaria de agendar uma consulta na Sorrir Clínica.';

// ─── Animation Variants ───────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function WhatsAppFAB() {
  const url = `https://wa.me/${WA_PHONE}?text=${encodeURIComponent(WA_MSG)}`;
  return (
    <a href={url} target="_blank" rel="noopener noreferrer"
      aria-label="Agendar via WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-2xl shadow-green-900/40 transition-transform hover:scale-110 active:scale-95">
      <svg className="h-7 w-7 fill-white" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    </a>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function OdontologiaApp() {
  const waUrl = `https://wa.me/${WA_PHONE}?text=${encodeURIComponent(WA_MSG)}`;

  return (
    <div className="min-h-screen bg-white text-slate-800 antialiased">

      {/* ── Header ── */}
      <header className="fixed top-0 inset-x-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-full bg-teal-600 flex items-center justify-center">
              <span className="text-white text-xs font-bold">S</span>
            </div>
            <span className="font-semibold text-slate-900 tracking-tight">Sorrir Clínica</span>
          </div>
          <nav className="hidden md:flex items-center gap-7 text-sm text-slate-500">
            <a href="#especialidades" className="hover:text-teal-600 transition-colors">Especialidades</a>
            <a href="#equipe" className="hover:text-teal-600 transition-colors">Equipe</a>
            <a href={waUrl} target="_blank" rel="noopener noreferrer"
              className="rounded-full bg-teal-600 px-4 py-1.5 text-white text-xs font-semibold hover:bg-teal-700 transition-colors">
              Agendar Consulta
            </a>
          </nav>
        </div>
      </header>

      {/* ── Hero ── */}
      <section className="min-h-screen pt-20 flex items-center">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center py-20">

          <motion.div initial="hidden" animate="show" variants={stagger}>
            <motion.p variants={fadeUp} className="text-xs font-semibold tracking-[0.25em] text-teal-600 uppercase mb-4">
              Odontologia de Excelência
            </motion.p>
            <motion.h1 variants={fadeUp} className="text-4xl md:text-5xl font-light tracking-tight text-slate-900 leading-tight mb-6">
              O sorriso que você merece{' '}
              <span className="text-teal-600">começa aqui</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-slate-500 text-lg leading-relaxed mb-8">
              Tecnologia avançada e equipe especializada para transformar sua saúde bucal com conforto, segurança e resultados duradouros.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap gap-3 mb-10">
              <a href={waUrl} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-teal-600 px-6 py-3 text-sm font-semibold text-white hover:bg-teal-700 transition-colors">
                <Calendar className="h-4 w-4" />
                Agendar Consulta
              </a>
              <a href="#especialidades"
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-600 hover:border-slate-400 transition-colors">
                Ver Especialidades
              </a>
            </motion.div>

            <motion.div variants={fadeUp} className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {STATS.map(({ n, label }) => (
                <div key={label}>
                  <p className="text-2xl font-semibold text-teal-600">{n}</p>
                  <p className="text-xs text-slate-400 mt-0.5 leading-snug">{label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            className="relative"
          >
            <div className="aspect-[4/5] overflow-hidden rounded-3xl bg-teal-50">
              <img
                src="https://images.unsplash.com/photo-1606811841689-23dfddce3e1e?w=800&q=85&fit=crop&auto=format"
                alt="Clínica Odontológica"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-5 -left-5 rounded-2xl bg-white border border-slate-100 shadow-xl p-4 flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-teal-600 flex items-center justify-center shrink-0">
                <Award className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-900">Clínica Certificada</p>
                <p className="text-xs text-slate-400">CFO · ABO Aprovada</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Especialidades ── */}
      <section id="especialidades" className="py-24 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
            <motion.p variants={fadeUp} className="text-xs font-semibold tracking-[0.25em] text-teal-600 uppercase mb-3">
              O que fazemos
            </motion.p>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-light tracking-tight text-slate-900 mb-12">
              Especialidades médicas
            </motion.h2>

            <motion.div variants={stagger} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {SPECIALTIES.map((s) => (
                <motion.div key={s.title} variants={fadeUp}
                  className="rounded-2xl bg-white border border-slate-100 p-6 hover:border-teal-200 hover:shadow-sm transition-all duration-200">
                  <span className="text-3xl mb-4 block">{s.emoji}</span>
                  <h3 className="font-semibold text-slate-900 mb-2">{s.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{s.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Equipe ── */}
      <section id="equipe" className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
            <motion.p variants={fadeUp} className="text-xs font-semibold tracking-[0.25em] text-teal-600 uppercase mb-3">
              Nossos especialistas
            </motion.p>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-light tracking-tight text-slate-900 mb-12">
              A equipe dedicada ao seu sorriso
            </motion.h2>

            <motion.div variants={stagger} className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {TEAM.map((member) => (
                <motion.div key={member.name} variants={fadeUp} className="group text-center">
                  <div className="mx-auto mb-5 h-44 w-44 overflow-hidden rounded-full border-4 border-slate-100 group-hover:border-teal-200 transition-colors duration-300">
                    <img src={member.img} alt={member.name}
                      className="h-full w-full object-cover" />
                  </div>
                  <h3 className="font-semibold text-slate-900">{member.name}</h3>
                  <p className="text-sm text-teal-600 mt-1">{member.role}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{member.cro}</p>
                  <div className="flex justify-center gap-0.5 mt-3">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="h-3.5 w-3.5 fill-amber-400" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 bg-teal-600">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}
          className="max-w-2xl mx-auto text-center px-6">
          <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-light tracking-tight text-white mb-4">
            Pronto para transformar seu sorriso?
          </motion.h2>
          <motion.p variants={fadeUp} className="text-teal-100 text-lg mb-6">
            Agende sua consulta de avaliação. Sem custo, sem compromisso.
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-5 text-sm text-teal-100 mb-8">
            {['Avaliação gratuita', 'Atendimento humanizado', 'Parcelamento em até 24×'].map((item) => (
              <span key={item} className="flex items-center gap-1.5">
                <CheckCircle className="h-4 w-4 text-teal-200 shrink-0" />
                {item}
              </span>
            ))}
          </motion.div>
          <motion.a variants={fadeUp}
            href={waUrl} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-teal-700 hover:bg-teal-50 transition-colors">
            <Users className="h-4 w-4" />
            Agendar pelo WhatsApp
          </motion.a>
        </motion.div>
      </section>

      {/* ── Footer ── */}
      <footer className="py-8 text-center text-xs text-slate-400 border-t border-slate-100">
        © {new Date().getFullYear()} Sorrir Clínica Odontológica · CRO-SP 12345 · Todos os direitos reservados
      </footer>

      <WhatsAppFAB />
    </div>
  );
}

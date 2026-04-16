import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, Star, UtensilsCrossed } from 'lucide-react';

// ─── Types ───────────────────────────────────────────────────────────────────

type Category = 'Entradas' | 'Principais' | 'Sobremesas';

interface MenuItem {
  name: string;
  desc: string;
  price: string;
  img: string;
}

// ─── Data ────────────────────────────────────────────────────────────────────

const MENU: Record<Category, MenuItem[]> = {
  Entradas: [
    {
      name: 'Bruschetta Trio',
      desc: 'Tomate italiano, azeite extra virgem e manjericão fresco',
      price: 'R$ 34',
      img: 'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=480&h=320&q=80&fit=crop&auto=format',
    },
    {
      name: 'Carpaccio di Filetto',
      desc: 'Fatias finas de filé, alcaparras, parmesão 36 meses e rúcula',
      price: 'R$ 52',
      img: 'https://images.unsplash.com/photo-1625944525533-473f1a3d54e7?w=480&h=320&q=80&fit=crop&auto=format',
    },
    {
      name: 'Burrata Caprese',
      desc: 'Burrata fresca, tomates heirloom, redução de aceto balsâmico',
      price: 'R$ 58',
      img: 'https://images.unsplash.com/photo-1607532941433-304659e8198a?w=480&h=320&q=80&fit=crop&auto=format',
    },
  ],
  Principais: [
    {
      name: 'Filé ao Molho de Trufas',
      desc: 'Filé mignon, molho de trufas negras, risoto al parmigiano',
      price: 'R$ 118',
      img: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=480&h=320&q=80&fit=crop&auto=format',
    },
    {
      name: 'Salmão Gravlax Grelhado',
      desc: 'Salmão norueguês, espuma de limão siciliano, aspargos salteados',
      price: 'R$ 94',
      img: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=480&h=320&q=80&fit=crop&auto=format',
    },
    {
      name: 'Rigatoni ai Funghi',
      desc: 'Massa artesanal, mix de cogumelos, creme de parmesão, tartufo',
      price: 'R$ 78',
      img: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=480&h=320&q=80&fit=crop&auto=format',
    },
  ],
  Sobremesas: [
    {
      name: 'Tiramisù della Casa',
      desc: 'Receita original da Vêneto, mascarpone, café expresso e cacau',
      price: 'R$ 42',
      img: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=480&h=320&q=80&fit=crop&auto=format',
    },
    {
      name: 'Fondant au Chocolat',
      desc: 'Coração líquido de chocolate 70%, sorvete de baunilha Tahiti',
      price: 'R$ 48',
      img: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=480&h=320&q=80&fit=crop&auto=format',
    },
    {
      name: 'Panna Cotta di Frutti',
      desc: 'Creme italiano, coulis de frutas vermelhas frescas',
      price: 'R$ 38',
      img: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=480&h=320&q=80&fit=crop&auto=format',
    },
  ],
};

const WA_PHONE = '5511999990001';
const WA_MSG = 'Olá! Gostaria de fazer uma reserva.';

// ─── Animation Variants ───────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function WhatsAppFAB() {
  const url = `https://wa.me/${WA_PHONE}?text=${encodeURIComponent(WA_MSG)}`;
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Reservar via WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-2xl shadow-green-900/40 transition-transform hover:scale-110 active:scale-95"
    >
      <svg className="h-7 w-7 fill-white" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    </a>
  );
}

function MenuCard({ item }: { item: MenuItem }) {
  return (
    <article className="group overflow-hidden rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-zinc-600 transition-colors duration-300">
      <div className="aspect-[3/2] overflow-hidden bg-zinc-800">
        <img
          src={item.img}
          alt={item.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-1.5">
          <h3 className="font-semibold text-white leading-snug">{item.name}</h3>
          <span className="shrink-0 text-amber-400 font-semibold text-sm">{item.price}</span>
        </div>
        <p className="text-sm text-zinc-500 leading-relaxed">{item.desc}</p>
      </div>
    </article>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function RestauranteApp() {
  const [activeCategory, setActiveCategory] = useState<Category>('Principais');
  const waUrl = `https://wa.me/${WA_PHONE}?text=${encodeURIComponent(WA_MSG)}`;

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 antialiased">

      {/* ── Header ── */}
      <header className="fixed top-0 inset-x-0 z-40 flex items-center justify-between px-8 py-5 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800/60">
        <div className="flex items-center gap-2">
          <UtensilsCrossed className="h-4 w-4 text-amber-400" />
          <span className="font-semibold tracking-tight text-white text-sm">Il Cortile</span>
        </div>
        <nav className="hidden md:flex items-center gap-7 text-sm text-zinc-400">
          <a href="#menu" className="hover:text-white transition-colors">Cardápio</a>
          <a href="#info" className="hover:text-white transition-colors">Informações</a>
          <a href={waUrl} target="_blank" rel="noopener noreferrer"
            className="rounded-full bg-amber-400 px-4 py-1.5 text-zinc-950 font-semibold text-xs hover:bg-amber-300 transition-colors">
            Reservar
          </a>
        </nav>
      </header>

      {/* ── Hero ── */}
      <section className="relative flex min-h-screen items-end overflow-hidden pb-24">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1600&q=85&fit=crop&auto=format')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/55 to-zinc-900/20" />

        <div className="relative z-10 px-8 md:px-16 max-w-3xl">
          <motion.div initial="hidden" animate="show" variants={stagger}>
            <motion.p variants={fadeUp} className="mb-3 text-xs font-semibold tracking-[0.3em] text-amber-400 uppercase">
              Cucina Italiana — São Paulo
            </motion.p>
            <motion.h1 variants={fadeUp} className="mb-4 text-5xl md:text-7xl font-light tracking-tight leading-none text-white">
              Il Cortile
            </motion.h1>
            <motion.p variants={fadeUp} className="mb-8 text-lg text-zinc-300 max-w-md leading-relaxed">
              Uma experiência gastronômica autêntica. Ingredientes importados, receitas tradicionais e um ambiente que transforma cada refeição em memória.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-4">
              <a href="#menu"
                className="inline-flex items-center gap-2 rounded-full bg-amber-400 px-6 py-3 text-sm font-semibold text-zinc-950 hover:bg-amber-300 transition-colors">
                Ver Cardápio
              </a>
              <a href={waUrl} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-zinc-600 px-6 py-3 text-sm font-semibold text-zinc-200 hover:border-zinc-400 hover:text-white transition-colors">
                Reservar Mesa
              </a>
            </motion.div>
          </motion.div>
        </div>

        <div className="absolute bottom-8 right-8 flex items-center gap-1 z-10">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
          ))}
          <span className="ml-2 text-xs text-zinc-500">4.9 · 340 avaliações</span>
        </div>
      </section>

      {/* ── Menu ── */}
      <section id="menu" className="py-24 px-6 md:px-16">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}
          className="max-w-5xl mx-auto">
          <motion.p variants={fadeUp} className="text-xs font-semibold tracking-[0.3em] text-amber-400 uppercase mb-2">
            Cardápio
          </motion.p>
          <motion.h2 variants={fadeUp} className="text-4xl font-light tracking-tight text-white mb-10">
            O que preparamos para você
          </motion.h2>

          {/* Category tabs */}
          <motion.div variants={fadeUp} className="flex gap-2 mb-10">
            {(Object.keys(MENU) as Category[]).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full px-5 py-2 text-sm font-medium transition-all duration-200 ${
                  activeCategory === cat
                    ? 'bg-amber-400 text-zinc-950'
                    : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-zinc-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>

          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {MENU[activeCategory].map((item) => (
              <MenuCard key={item.name} item={item} />
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ── Info ── */}
      <section id="info" className="py-20 px-6 md:px-16 border-t border-zinc-800/60">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}
          className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            {
              Icon: Clock,
              title: 'Funcionamento',
              lines: ['Ter–Qui: 19h às 23h', 'Sex–Sáb: 19h às 00h', 'Dom: 12h às 16h'],
            },
            {
              Icon: MapPin,
              title: 'Localização',
              lines: ['Rua Oscar Freire, 724', 'Jardins — São Paulo', 'CEP 01426-001'],
            },
            {
              Icon: Star,
              title: 'Reservas',
              lines: ['Via WhatsApp ou telefone', 'Antecedência recomendada', 'Eventos e grupos: consulte'],
            },
          ].map(({ Icon, title, lines }) => (
            <motion.div key={title} variants={fadeUp}>
              <Icon className="h-5 w-5 text-amber-400 mb-3" />
              <h3 className="text-sm font-semibold text-white mb-2">{title}</h3>
              {lines.map((l) => (
                <p key={l} className="text-sm text-zinc-500 leading-relaxed">{l}</p>
              ))}
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── Footer ── */}
      <footer className="py-8 text-center text-xs text-zinc-700 border-t border-zinc-800/60">
        © {new Date().getFullYear()} Il Cortile · Cucina Italiana · Todos os direitos reservados
      </footer>

      <WhatsAppFAB />
    </div>
  );
}

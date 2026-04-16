import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { NAV_LINKS } from '@/constants';
import { buildWhatsAppUrl } from '@/utils/whatsapp';
import iconeDark from '@/assets/icone_dark.jpg';

interface NavbarProps {
  onOpenShowcase: () => void;
}

export function Navbar({ onOpenShowcase }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-40 transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(11, 5, 21, 0.88)' : 'transparent',
        backdropFilter: scrolled ? 'blur(22px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(22px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
      }}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5 group">
          <img
            src={iconeDark}
            alt="LA Sites"
            className="w-8 h-8 rounded-full object-cover"
          />
          <span className="font-display font-black text-xl tracking-tight leading-none">
            <span className="text-la-green">LA</span>
            <span className="text-white"> Sites</span>
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) =>
            link.label === 'Modelos' ? (
              <button
                key={link.href}
                onClick={onOpenShowcase}
                className="text-sm text-la-muted hover:text-white transition-colors duration-200 relative group cursor-pointer"
              >
                {link.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-la-green transition-all duration-300 group-hover:w-full" />
              </button>
            ) : (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-la-muted hover:text-white transition-colors duration-200 relative group"
              >
                {link.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-la-green transition-all duration-300 group-hover:w-full" />
              </a>
            ),
          )}
        </nav>

        {/* Desktop CTA */}
        <a
          href={buildWhatsAppUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold bg-la-green text-la-bg hover:opacity-90 transition-opacity glow-green-sm"
        >
          Quero meu site
        </a>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-white p-1"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Menu"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <motion.div
          className="md:hidden glass border-t border-white/5 px-6 py-4 flex flex-col gap-4"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {NAV_LINKS.map((link) =>
            link.label === 'Modelos' ? (
              <button
                key={link.href}
                onClick={() => { setMobileOpen(false); onOpenShowcase(); }}
                className="text-sm text-la-muted hover:text-white transition-colors text-left"
              >
                {link.label}
              </button>
            ) : (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-la-muted hover:text-white transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ),
          )}
          <a
            href={buildWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex justify-center items-center px-4 py-2.5 rounded-lg text-sm font-semibold bg-la-green text-la-bg glow-green-sm"
          >
            Quero meu site
          </a>
        </motion.div>
      )}
    </motion.header>
  );
}

import { Mail, MessageCircle } from 'lucide-react';
import { CONTACT_INFO, NAV_LINKS } from '@/constants';
import { buildWhatsAppUrl } from '@/utils/whatsapp';
import iconeDark from '@/assets/icone_dark.jpg';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-la-surface border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Brand */}
        <div>
          <a href="#" className="inline-flex items-center gap-3 mb-3">
            <img
              src={iconeDark}
              alt="LA Sites"
              className="w-10 h-10 rounded-full object-cover"
            />
            <span className="font-display font-black text-2xl tracking-tight leading-none">
              <span className="text-la-green">LA</span>
              <span className="text-white"> Sites</span>
            </span>
          </a>
          <p className="text-la-muted text-sm leading-relaxed max-w-[240px]">
            Sites profissionais para microempreendedores. Rápido, bonito e no ar em 48h.
          </p>
        </div>

        {/* Nav links */}
        <div>
          <p className="text-xs font-semibold tracking-widest uppercase text-la-muted mb-4">
            Navegação
          </p>
          <ul className="flex flex-col gap-2.5">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm text-la-muted hover:text-white transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <p className="text-xs font-semibold tracking-widest uppercase text-la-muted mb-4">
            Contato
          </p>
          <ul className="flex flex-col gap-3">
            <li>
              <a
                href={buildWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-sm text-la-muted hover:text-[#25D366] transition-colors"
              >
                <MessageCircle className="w-4 h-4 shrink-0" />
                WhatsApp
              </a>
            </li>
            <li>
              <a
                href={`mailto:${CONTACT_INFO.email}`}
                className="flex items-center gap-2.5 text-sm text-la-muted hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4 shrink-0" />
                {CONTACT_INFO.email}
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/lasites.br?igsh=MWN5MWE4bTN4Zm9nNQ=="
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-sm text-la-muted hover:text-[#E1306C] transition-colors"
              >
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
                </svg>
                @lasites.br
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-la-muted text-xs">
            © {year} LA Sites. Todos os direitos reservados.
          </p>
          <p className="text-la-muted text-xs">
            Feito com <span className="text-la-green">✦</span> para quem empreende.
          </p>
        </div>
      </div>
    </footer>
  );
}

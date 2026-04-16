import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { buildWhatsAppUrl } from '@/utils/whatsapp';

export function WhatsAppButton() {
  return (
    <motion.a
      href={buildWhatsAppUrl()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar pelo WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] shadow-[0_8px_32px_rgba(37,211,102,0.45)]"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 1.2 }}
      whileHover={{ scale: 1.12 }}
      whileTap={{ scale: 0.93 }}
    >
      {/* Pulse ring */}
      <motion.span
        className="absolute inset-0 rounded-full bg-[#25D366]"
        animate={{ scale: [1, 1.55], opacity: [0.45, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut' }}
      />
      <MessageCircle className="relative z-10 w-6 h-6 text-white fill-white" />
    </motion.a>
  );
}

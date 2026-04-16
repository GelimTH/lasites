import { CONTACT_INFO } from '@/constants';

export function buildWhatsAppUrl(message?: string): string {
  const text = encodeURIComponent(message ?? CONTACT_INFO.message);
  return `https://wa.me/${CONTACT_INFO.whatsapp}?text=${text}`;
}

export function buildModelWhatsAppUrl(modelName: string): string {
  const msg = `Olá! Vi o modelo "${modelName}" no site da LA Sites e gostaria de saber mais sobre como contratar!`;
  return buildWhatsAppUrl(msg);
}

export const CONTACT_INFO = {
  whatsapp: '5565992902683',
  email: 'contato.lasites@gmail.com',
  message: 'Olá! Gostaria de saber mais sobre os modelos de sites da LA Sites.',
} as const;

export const NAV_LINKS = [
  { label: 'Modelos', href: '#showcase' },
  { label: 'Como funciona', href: '#processo' },
  { label: 'FAQ', href: '#faq' },
] as const;

export const PROCESS_STEPS = [
  {
    number: '01',
    title: 'Escolha a forma',
    description:
      'Navegue pelo catálogo e encontre o modelo que combina com o seu negócio. Sem compromisso.',
  },
  {
    number: '02',
    title: 'Personalize',
    description:
      'Nos envie o conteúdo via WhatsApp — nome, fotos, cores e logo. A gente cuida do resto.',
  },
  {
    number: '03',
    title: 'No ar em 48h',
    description:
      'Seu site personalizado, com domínio próprio, vai ao ar em até 2 dias úteis.',
  },
] as const;

export const FAQ_ITEMS = [
  {
    question: 'Quanto tempo leva para o site ficar pronto?',
    answer:
      'Após receber todas as suas informações, entregamos o site finalizado em até 48 horas úteis.',
  },
  {
    question: 'Preciso ter conhecimento técnico para contratar?',
    answer:
      'Zero. Você só precisa nos enviar o conteúdo (textos, fotos, logo) pelo WhatsApp. Todo o desenvolvimento fica por nossa conta.',
  },
  {
    question: 'O site funciona bem no celular?',
    answer:
      'Sim! Todos os nossos modelos são 100% responsivos e otimizados para mobile — onde a maioria dos seus clientes vai acessar.',
  },
  {
    question: 'Posso atualizar o conteúdo depois que o site for ao ar?',
    answer:
      'Sim. Oferecemos suporte para atualizações de conteúdo. Entre em contato pelo WhatsApp e ajustamos rapidamente.',
  },
  {
    question: 'O domínio (.com.br) está incluído no preço?',
    answer:
      'Trabalhamos com domínios .com.br ou .com. O valor varia conforme disponibilidade e é combinado junto ao orçamento.',
  },
  {
    question: 'Meu site vai aparecer no Google?',
    answer:
      'Todos os sites já vêm com SEO básico configurado (meta tags, Open Graph, sitemap) para dar o pontapé inicial no Google.',
  },
] as const;

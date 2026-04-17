Documento de Requisitos do Produto (PRD): LA Sites
1. Visão Geral do Projeto

A LA Sites é uma plataforma voltada para a venda de sites pré-estruturados ("formas") para microempreendedores. O objetivo é oferecer uma presença online rápida, profissional e acessível, utilizando um catálogo de modelos (Showcase) que o cliente pode escolher.
2. Identidade Visual (Baseada no Logo)

A paleta de cores deve refletir modernidade, tecnologia e confiabilidade, utilizando o alto contraste entre o verde neon e o roxo profundo.
2.1. Paleta de Cores (Design System)

    Primária (Verde LA): #9EFF00 (Ação, destaque, botões principais).

    Secundária (Roxo Deep): #1A0B2E (Fundo principal, seções de destaque).

    Background (Dark): #0B0515 (Fundo geral do site).

    Texto Principal: #FFFFFF (Leitura clara).

    Texto Secundário: #A0A0A0 (Descrições e rodapé).

2.2. Tipografia

    Headings (Títulos): Montserrat ou Inter (Bold/ExtraBold).

    Body (Corpo): Inter (Regular/Medium).

3. Estrutura do Site (Sitemap)

Como se trata de um site estático focado em conversão, a estrutura será uma One-Page Robusta ou com rotas mínimas para o Showcase.

    Hero Section: Proposta de valor ("Você precisa existir online") + CTA para WhatsApp.

    Sobre: Breve explicação do modelo de negócio (sites rápidos para pequenos negócios).

    Showcase (Catálogo): Galeria de mockups dos sites pré-prontos.

    Processo: 1. Escolha a forma -> 2. Personalize -> 3. Ar no ar.

    FAQ: Dúvidas comuns de microempreendedores.

    Footer: Contatos (contato.lasites@gmail.com), Redes Sociais e Botão Flutuante de WhatsApp.

4. Arquitetura Técnica e Stack

O foco aqui é performance (SEO) e código limpo (refatorado).

    Build Tool: Vite (React + TypeScript).

    Styling: Tailwind CSS v4 (tokens definidos via `@theme` no arquivo `src/index.css` — sem `tailwind.config.js`).

    Icons: Lucide-React.

    Animations: Framer Motion (para transições suaves no Showcase).

    Deploy: Vercel ou Netlify (estático).

5. Estrutura de Pastas (Modular & Refatorada)

Para evitar o "tudo junto e misturado", utilizaremos uma estrutura baseada em responsabilidades claras:
Plaintext

pse/
├── public/              # Assets estáticos servidos na raiz (favicon.svg, icons.svg)
├── src/
│   ├── assets/          # Imagens importadas como módulos JS (icone_dark.jpg, hero.png…)
│   ├── components/
│   │   ├── common/      # Botões, badges (WhatsAppButton, Badge)
│   │   ├── layout/      # Navbar, Footer, ShowcaseWrapper
│   │   ├── sections/    # Hero, About, Showcase, Process, FAQ
│   │   └── ui/          # Primitivos (IOSSlider)
│   ├── constants/       # Única fonte de verdade para textos e links (index.ts)
│   ├── hooks/           # Hooks customizados (useCatalog)
│   ├── mockups/         # Cada subpasta é um MPA independente com index.html + meta.ts
│   ├── pages/           # Home.tsx
│   ├── types/           # Interfaces TypeScript (catalog.ts)
│   ├── utils/           # whatsapp.ts e demais helpers
│   ├── index.css        # Tailwind v4 @theme — tokens de cor/fonte da LA Sites
│   ├── App.tsx
│   └── main.tsx
├── tsconfig.json
└── vite.config.ts       # MPA: descobre src/mockups/*/index.html automaticamente

6. Implementação das Constantes (Refatoração)

Para facilitar mudanças rápidas (como o número do WhatsApp ou preços), centralizaremos os dados em src/constants/index.ts:
TypeScript

export const CONTACT_INFO = {
  whatsapp: "5565992902683",
  email: "contato.lasites@gmail.com",
  message: "Olá! Gostaria de saber mais sobre os modelos de sites da LA Sites.",
};

export const COLORS = {
  primary: "#9EFF00",
  secondary: "#1A0B2E",
};

7. Requisitos Funcionais Críticos
7.1. Botão de WhatsApp Refatorado

O botão deve ser um componente desacoplado que recebe o número e a mensagem via props ou consome das constantes. Deve ser fixo (floating) no canto inferior direito.
7.2. Galeria Showcase

Os mockups do seu projeto Showcase devem ser exibidos em um grid responsivo. Cada item do catálogo deve ter:

    Thumbnail de alta qualidade.

    Tag indicando o nicho (ex: "Barbearia", "Loja de Bolos").

    Botão "Quero este modelo" que leva direto para o WhatsApp já mencionando o modelo escolhido.

7.3. Performance & SEO

    Imagens em formato WebP.

    Meta tags configuradas (OpenGraph) para que, ao compartilhar o link no WhatsApp, apareça o logo e a descrição profissional.

8. Próximos Passos

    Configuração do Tailwind: Injetar a paleta de cores no theme.extend.

    Setup do Boilerplate: Criar a estrutura de pastas conforme o item 5.

    Desenvolvimento da Hero: Implementar o design escuro com o contraste verde neon.

    Integração do Showcase: Trazer as imagens do seu projeto anterior de mockups para dentro da galeria.

##Para os icones e logo esta disponibilizado nas pasta assets em algumas versões, icone_light.jpg, icone_dark.jpg, wallpaper.jpg, identidade.jpg
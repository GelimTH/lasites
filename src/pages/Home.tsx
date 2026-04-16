import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { ShowcaseSection, PreviewModal } from '@/components/sections/Showcase';
import { Process } from '@/components/sections/Process';
import { FAQ } from '@/components/sections/FAQ';
import { WhatsAppButton } from '@/components/common/WhatsAppButton';

export default function Home() {
  const [previewIndex, setPreviewIndex] = useState<number | null>(null);

  const openPreview = (index = 0) => setPreviewIndex(index);
  const closePreview = () => setPreviewIndex(null);

  return (
    <div className="relative min-h-screen bg-la-bg overflow-x-hidden">
      <Navbar onOpenShowcase={() => openPreview(0)} />

      <main>
        <Hero onOpenShowcase={() => openPreview(0)} />
        <ShowcaseSection onPreview={openPreview} />
        <Process />
        <FAQ />
      </main>

      <Footer />
      {/* WhatsApp button hidden while preview is open — avoids z-index overlap with mockup buttons */}
      {previewIndex === null && <WhatsAppButton />}

      {/* Preview modal lives here so it overlays the entire page */}
      <AnimatePresence>
        {previewIndex !== null && (
          <PreviewModal initialIndex={previewIndex} onClose={closePreview} />
        )}
      </AnimatePresence>
    </div>
  );
}

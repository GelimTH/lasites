import { motion, LayoutGroup } from 'framer-motion';

interface IOSSliderProps {
  projects: string[];
  activeIndex: number;
  onSelect: (index: number) => void;
}

export function IOSSlider({ projects, activeIndex, onSelect }: IOSSliderProps) {
  return (
    // LayoutGroup isola o layoutId "ios-knob" — seguro para múltiplas instâncias futuras
    <LayoutGroup>
      <nav
        aria-label="Navegação de projetos"
        className="fixed bottom-10 left-1/2 z-[999] flex -translate-x-1/2 gap-1 rounded-[22px] border border-white/[0.07] bg-black/40 p-1.5 shadow-[0_24px_64px_rgba(0,0,0,0.6)] backdrop-blur-2xl"
      >
        {projects.map((name, index) => {
          const isActive = activeIndex === index;

          return (
            <button
              key={name}
              onClick={() => onSelect(index)}
              aria-pressed={isActive}
              className="relative cursor-pointer rounded-[16px] px-5 py-2.5 text-sm font-semibold outline-none focus-visible:ring-2 focus-visible:ring-white/30"
            >
              {/* Knob animado — Framer Motion move o mesmo elemento entre posições via layoutId */}
              {isActive && (
                <motion.div
                  layoutId="ios-knob"
                  className="absolute inset-0 rounded-[16px] bg-white shadow-[0_2px_12px_rgba(0,0,0,0.25)]"
                  transition={{
                    type: 'spring',
                    stiffness: 380,
                    damping: 30,
                    mass: 0.8,
                  }}
                />
              )}

              {/* Label — z-10 garante que fica acima do knob */}
              <span
                className={`relative z-10 transition-colors duration-200 ${
                  isActive ? 'text-gray-900' : 'text-white/45'
                }`}
              >
                {name}
              </span>
            </button>
          );
        })}
      </nav>
    </LayoutGroup>
  );
}

import { useState, useCallback } from 'react';
import { mockupRegistry } from '@/mockups/index';
import type { MockupEntry } from '@/types/catalog';

interface CatalogState {
  entries: MockupEntry[];
  activeIndex: number;
  activeEntry: MockupEntry | undefined;
  select: (index: number) => void;
}

export function useCatalog(): CatalogState {
  const [activeIndex, setActiveIndex] = useState(0);

  const select = useCallback((index: number) => {
    if (index >= 0 && index < mockupRegistry.length) {
      setActiveIndex(index);
    }
  }, []);

  return {
    entries: mockupRegistry,
    activeIndex,
    activeEntry: mockupRegistry[activeIndex],
    select,
  };
}

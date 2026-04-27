"use client";

import { useState, useEffect } from 'react';
import StyleGuide from '@/components/StyleGuide';

export default function StyleGuideHandler({ children }: { children: React.ReactNode }) {
  const [showStyleGuide, setShowStyleGuide] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | undefined;
    let keySequence = '';

    const handleKeyPress = (e: KeyboardEvent) => {
      if (timeoutId) clearTimeout(timeoutId);
      keySequence = (keySequence + e.key.toLowerCase()).slice(-20);
      
      if (keySequence.includes('siemprewifiui')) {
        setShowStyleGuide(true);
        keySequence = '';
      }

      timeoutId = setTimeout(() => {
        keySequence = '';
      }, 2000);
    };

    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && showStyleGuide) {
        setShowStyleGuide(false);
        keySequence = '';
      }
    };

    window.addEventListener('keypress', handleKeyPress);
    window.addEventListener('keydown', handleEscKey);

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      window.removeEventListener('keypress', handleKeyPress);
      window.removeEventListener('keydown', handleEscKey);
    };
  }, [showStyleGuide]);

  if (showStyleGuide) {
    return <StyleGuide />;
  }

  return <>{children}</>;
}

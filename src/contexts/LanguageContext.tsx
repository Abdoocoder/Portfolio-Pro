'use client';

import type { ReactNode } from 'react';
import { createContext, useState, useEffect, useCallback } from 'react';

type Language = 'ar' | 'en';
type Direction = 'rtl' | 'ltr';

interface LanguageContextType {
  lang: Language;
  dir: Direction;
  setLang: (lang: Language) => void;
  t: (obj: any, keyPrefix: string) => string;
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Language>('ar');
  const [dir, setDir] = useState<Direction>('rtl');

  useEffect(() => {
    const storedLang = localStorage.getItem('lang') as Language | null;
    if (storedLang) {
      setLang(storedLang);
      setDir(storedLang === 'ar' ? 'rtl' : 'ltr');
    }
  }, []);

  const handleSetLang = (newLang: Language) => {
    setLang(newLang);
    const newDir = newLang === 'ar' ? 'rtl' : 'ltr';
    setDir(newDir);
    localStorage.setItem('lang', newLang);
  };

  const t = useCallback(
    (obj: any, keyPrefix: string): string => {
      if (!obj) return '';
      const key = `${keyPrefix}_${lang}`;
      return obj[key] || obj[`${keyPrefix}_en`] || ''; // Fallback to English
    },
    [lang]
  );

  return (
    <LanguageContext.Provider value={{ lang, dir, setLang: handleSetLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

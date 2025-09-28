'use client';

import { Button } from '@/components/ui/button';
import { useLanguage } from '@/hooks/use-language';
import { Languages } from 'lucide-react';

export function LanguageSwitcher() {
  const { lang, setLang } = useLanguage();

  const toggleLanguage = () => {
    setLang(lang === 'en' ? 'ar' : 'en');
  };

  return (
    <Button variant="ghost" size="icon" onClick={toggleLanguage} aria-label="Toggle language">
      <Languages className="h-5 w-5" />
      <span className="sr-only">
        {lang === 'en' ? 'Switch to Arabic' : 'التحويل إلى الإنجليزية'}
      </span>
    </Button>
  );
}

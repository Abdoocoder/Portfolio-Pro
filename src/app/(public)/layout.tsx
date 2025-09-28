
'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/hooks/use-language';
import { useSiteData } from '@/hooks/use-site-data';
import { LanguageSwitcher } from '@/components/shared/LanguageSwitcher';
import { Code, Download, Github, Mail, Linkedin, Twitter } from 'lucide-react';

function Header() {
  const { settings } = useSiteData();
  const { lang, t } = useLanguage();

  const navLinks = [
    { id: 'about', label_en: 'About', label_ar: 'عني' },
    { id: 'skills', label_en: 'Skills', label_ar: 'المهارات' },
    { id: 'projects', label_en: 'Projects', label_ar: 'المشاريع' },
    { id: 'experience', label_en: 'Experience', label_ar: 'الخبرة' },
    { id: 'education', label_en: 'Education', label_ar: 'التعليم' },
    { id: 'contact', label_en: 'Contact', label_ar: 'تواصل' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="flex-1 flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2" aria-label="Homepage">
            <Code className="h-6 w-6 text-primary" />
            <span className="font-bold font-headline hidden sm:inline-block">
              {t(settings, 'hero_title')}
            </span>
          </Link>
        </div>
        <nav className="hidden md:flex flex-1 justify-center">
          <ul className="flex items-center space-x-6 text-sm font-medium">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  className="transition-colors hover:text-primary"
                >
                  {lang === 'en' ? link.label_en : link.label_ar}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex flex-1 items-center justify-end gap-2">
          <LanguageSwitcher />
          <Button asChild>
            <a href="/admin">
              {lang === 'en' ? 'Admin' : 'الإدارة'}
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
}

function Footer() {
    const { settings, loading } = useSiteData();
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t bg-background">
            <div className="container py-8 flex flex-col md:flex-row items-center justify-between gap-4">
                <p className="text-sm text-muted-foreground text-center md:text-start">
                    &copy; {currentYear} Abdullah Abu Saghirah. All rights reserved.
                </p>
                <div className="flex items-center gap-2">
                    {settings?.social?.github && (
                        <Button variant="ghost" size="icon" asChild>
                            <a href={settings.social.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                                <Github className="h-5 w-5" />
                            </a>
                        </Button>
                    )}
                    {settings?.social?.linkedin && (
                        <Button variant="ghost" size="icon" asChild>
                            <a href={settings.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                                <Linkedin className="h-5 w-5" />
                            </a>
                        </Button>
                    )}
                    {settings?.social?.twitter && (
                        <Button variant="ghost" size="icon" asChild>
                            <a href={settings.social.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                                <Twitter className="h-5 w-5" />
                            </a>
                        </Button>
                    )}
                    {settings?.social?.email && (
                         <Button variant="ghost" size="icon" asChild>
                            <a href={`mailto:${settings.social.email}`} aria-label="Email">
                                <Mail className="h-5 w-5" />
                            </a>
                        </Button>
                    )}
                    {settings?.resume_url && (
                         <Button variant="ghost" size="icon" asChild>
                            <a href={settings.resume_url} target="_blank" rel="noopener noreferrer" aria-label="Download CV">
                                <Download className="h-5 w-5" />
                            </a>
                        </Button>
                    )}
                </div>
            </div>
        </footer>
    );
}


export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

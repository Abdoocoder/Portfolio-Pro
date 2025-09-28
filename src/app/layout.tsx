
'use client';

import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/contexts/AuthContext';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { SiteDataProvider } from '@/contexts/SiteDataContext';
import { useLanguage } from '@/hooks/use-language';
import type { ReactNode } from 'react';

const RootLayoutComponent = ({ children }: { children: ReactNode }) => {
  const { lang, dir } = useLanguage();

  return (
    <html lang={lang} dir={dir}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=PT+Sans:ital,wght@0,400;0,700;1,400;1,701&family=Space+Grotesk:wght@300..700&display=swap"
          rel="stylesheet"
        />
        <style>{`
          :root {
            --font-body: 'PT Sans', sans-serif;
            --font-headline: 'Space Grotesk', sans-serif;
          }
        `}</style>
      </head>
      <body className="antialiased font-body">
        <AuthProvider>
            <SiteDataProvider>
                {children}
                <Toaster />
            </SiteDataProvider>
        </AuthProvider>
      </body>
    </html>
  );
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <LanguageProvider>
        <RootLayoutComponent>
            {children}
        </RootLayoutComponent>
    </LanguageProvider>
  );
}

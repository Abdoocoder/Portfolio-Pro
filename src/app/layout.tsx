
import './globals.css';
import type { ReactNode } from 'react';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/contexts/AuthContext';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { SiteDataProvider } from '@/contexts/SiteDataContext';
import { RootLayoutComponent } from './RootLayoutComponent';

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <LanguageProvider>
      <AuthProvider>
        <RootLayoutComponent>
          <SiteDataProvider>
            {children}
            <Toaster />
          </SiteDataProvider>
        </RootLayoutComponent>
      </AuthProvider>
    </LanguageProvider>
  );
}

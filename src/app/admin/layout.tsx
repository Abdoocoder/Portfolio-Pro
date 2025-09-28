
'use client';

import type { ReactNode } from 'react';
import { useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth';
import { useAuth } from '@/hooks/use-auth';
import { auth } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarTrigger,
  SidebarInset,
} from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  LayoutDashboard,
  Settings,
  Briefcase,
  Lightbulb,
  GraduationCap,
  MessageSquare,
  Building2,
  LogOut,
  Fingerprint,
  Home,
} from 'lucide-react';

const adminNavItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/settings', label: 'Site Settings', icon: Settings },
  { href: '/admin/projects', label: 'Projects', icon: Briefcase },
  { href: '/admin/skills', label: 'Skills', icon: Lightbulb },
  { href: '/admin/experience', label: 'Experience', icon: Building2 },
  { href: '/admin/education', label: 'Education', icon: GraduationCap },
  { href: '/admin/messages', label: 'Messages', icon: MessageSquare },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  const { user, isAdmin, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/login');
    } else if (!loading && user && !isAdmin) {
      // Not an admin, redirect to home page and sign out.
      signOut(auth);
      router.replace('/');
    }
  }, [user, isAdmin, loading, router]);

  if (loading || !user || !isAdmin) {
    return (
        <div className="flex h-screen w-screen items-center justify-center bg-background">
            <div role="status" className="flex items-center gap-2 text-muted-foreground">
                <svg aria-hidden="true" className="w-8 h-8 animate-spin text-primary fill-accent" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0492C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5424 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg>
                <span className="text-lg">Authenticating...</span>
            </div>
        </div>
    );
  }

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/login');
  };

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2">
            <Fingerprint className="w-8 h-8 text-primary" />
            <h2 className="text-xl font-headline font-semibold text-foreground group-data-[collapsible=icon]:hidden">
              Portfolio Pro
            </h2>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {adminNavItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <Link href={item.href} legacyBehavior passHref>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname.startsWith(item.href) && (item.href !== '/admin' || pathname === '/admin')}
                    tooltip={{ children: item.label, side: 'right' }}
                  >
                    <a>
                      <item.icon />
                      <span>{item.label}</span>
                    </a>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
                <Link href="/" target="_blank" legacyBehavior passHref>
                     <SidebarMenuButton asChild tooltip={{children: 'View Public Site', side: 'right'}}>
                        <a>
                            <Home />
                            <span>Public Site</span>
                        </a>
                    </SidebarMenuButton>
                </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
                <SidebarMenuButton onClick={handleLogout} tooltip={{children: 'Log Out', side: 'right'}}>
                    <LogOut />
                    <span>Log Out</span>
                </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
          <div className="flex items-center gap-3 p-2 group-data-[collapsible=icon]:justify-center">
            <Avatar className="h-9 w-9">
              <AvatarImage src={user?.photoURL ?? ''} alt={user?.displayName ?? 'User'} />
              <AvatarFallback>{user?.email?.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col group-data-[collapsible=icon]:hidden">
              <p className="text-sm font-medium text-foreground truncate">{user?.displayName ?? user?.email}</p>
              <p className="text-xs text-muted-foreground">Administrator</p>
            </div>
          </div>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6 py-2">
            <SidebarTrigger className="md:hidden"/>
            <h1 className="text-xl font-semibold font-headline">{adminNavItems.find(item => pathname.startsWith(item.href))?.label}</h1>
        </header>
        <main className="flex-1 p-4 sm:px-6 sm:py-0">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}

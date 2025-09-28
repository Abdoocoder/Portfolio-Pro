'use client';

import type { User } from 'firebase/auth';
import type { ReactNode } from 'react';
import { createContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import type { Admin } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';

interface AuthContextType {
  user: User | null;
  isAdmin: boolean;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setLoading(true);
      setUser(user);
      if (user) {
        try {
          const adminDoc = await getDoc(doc(db, 'admins', user.uid));
          if (adminDoc.exists() && (adminDoc.data() as Admin).role === 'admin') {
            setIsAdmin(true);
          } else {
            setIsAdmin(false);
          }
        } catch (error) {
          console.error('Error checking admin status:', error);
          setIsAdmin(false);
        }
      } else {
        setIsAdmin(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
        <div className="flex items-center justify-center h-screen w-screen bg-background">
            <div className="flex flex-col items-center gap-4">
                <Skeleton className="h-16 w-16 rounded-full" />
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-4 w-32" />
            </div>
        </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, isAdmin, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

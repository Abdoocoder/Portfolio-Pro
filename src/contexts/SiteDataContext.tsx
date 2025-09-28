'use client';

import type { ReactNode } from 'react';
import { createContext, useEffect, useState } from 'react';
import { collection, doc, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type {
  Education,
  Experience,
  Project,
  SiteSettings,
  Skill,
} from '@/lib/types';

interface SiteDataContextType {
  settings: SiteSettings | null;
  projects: Project[];
  skills: Skill[];
  experience: Experience[];
  education: Education[];
  loading: boolean;
}

export const SiteDataContext = createContext<SiteDataContextType | undefined>(undefined);

export const SiteDataProvider = ({ children }: { children: ReactNode }) => {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [experience, setExperience] = useState<Experience[]>([]);
  const [education, setEducation] = useState<Education[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribes: (() => void)[] = [];
    setLoading(true);

    try {
      unsubscribes.push(onSnapshot(doc(db, 'settings', 'site'), (doc) => {
        setSettings(doc.data() as SiteSettings);
      }));

      const projectsQuery = query(collection(db, 'projects'), orderBy('order', 'asc'));
      unsubscribes.push(onSnapshot(projectsQuery, (snapshot) => {
        setProjects(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Project)));
      }));
      
      const skillsQuery = query(collection(db, 'skills'), orderBy('order', 'asc'));
      unsubscribes.push(onSnapshot(skillsQuery, (snapshot) => {
        setSkills(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Skill)));
      }));

      const experienceQuery = query(collection(db, 'experience'), orderBy('order', 'asc'));
      unsubscribes.push(onSnapshot(experienceQuery, (snapshot) => {
        setExperience(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Experience)));
      }));

      const educationQuery = query(collection(db, 'education'), orderBy('order', 'asc'));
      unsubscribes.push(onSnapshot(educationQuery, (snapshot) => {
        setEducation(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Education)));
      }));
      
    } catch (error) {
        console.error("Error attaching Firestore listeners:", error);
    } finally {
        // A small delay to allow initial data to load
        setTimeout(() => setLoading(false), 1000);
    }

    return () => unsubscribes.forEach(unsub => unsub());
  }, []);

  return (
    <SiteDataContext.Provider value={{ settings, projects, skills, experience, education, loading }}>
      {children}
    </SiteDataContext.Provider>
  );
};

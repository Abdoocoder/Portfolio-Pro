'use client';

import type { ReactNode } from 'react';
import { createContext, useEffect, useState } from 'react';
import { collection, doc, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type {
  Education,
  Experience,
  Message,
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
  messages: Message[];
  loading: boolean;
}

export const SiteDataContext = createContext<SiteDataContextType | undefined>(undefined);

export function SiteDataProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [experience, setExperience] = useState<Experience[]>([]);
  const [education, setEducation] = useState<Education[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    const unsubscribers = [
      onSnapshot(doc(db, 'settings', 'site'), (doc) => {
        setSettings(doc.data() as SiteSettings);
      }),
      onSnapshot(query(collection(db, 'projects'), orderBy('order', 'asc')), (snapshot) => {
        const projectsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Project[];
        setProjects(projectsData);
      }),
      onSnapshot(query(collection(db, 'skills'), orderBy('order', 'asc')), (snapshot) => {
        const skillsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Skill[];
        setSkills(skillsData);
      }),
      onSnapshot(query(collection(db, 'experience'), orderBy('from', 'desc')), (snapshot) => {
        const experienceData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Experience[];
        setExperience(experienceData);
      }),
      onSnapshot(query(collection(db, 'education'), orderBy('year', 'desc')), (snapshot) => {
        const educationData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Education[];
        setEducation(educationData);
      }),
      onSnapshot(query(collection(db, 'messages'), orderBy('createdAt', 'desc')), 
        (snapshot) => {
          const messagesData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Message[];
          setMessages(messagesData);
        },
        (error) => {
          // This callback handles permission errors gracefully.
          console.error("Firestore permission denied on 'messages' collection. This is expected for non-admin users.");
          setMessages([]); // Ensure messages are cleared on error.
        }
      ),
    ];

    // A delay to simulate loading
    const timer = setTimeout(() => {
        setLoading(false);
    }, 1000);

    return () => {
      unsubscribers.forEach(unsub => unsub());
      clearTimeout(timer);
    };
  }, []);

  return (
    <SiteDataContext.Provider value={{ settings, projects, skills, experience, education, messages, loading }}>
      {children}
    </SiteDataContext.Provider>
  );
}

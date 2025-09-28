import { Timestamp } from 'firebase/firestore';

export interface SiteSettings {
  title: string;
  description: string;
  language: 'ar' | 'en';
  theme: 'light' | 'dark';
  contact: {
    email: string;
    phone: string;
    location: string;
  };
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  images: string[];
  technologies: string[];
  link?: string;
  github?: string;
  featured: boolean;
  order: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface Skill {
  id: string;
  name: string;
  category: 'frontend' | 'backend' | 'mobile' | 'other';
  level: number;
  icon?: string;
  order: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: Timestamp;
  endDate?: Timestamp;
  current: boolean;
  description: string;
  technologies: string[];
  order: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  location: string;
  startDate: Timestamp;
  endDate?: Timestamp;
  current: boolean;
  description?: string;
  order: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface Admin {
  id: string;
  email: string;
  role: 'admin' | 'editor';
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
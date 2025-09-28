
import type { Timestamp } from 'firebase/firestore';

export interface SiteSettings {
  hero_title_ar: string;
  hero_title_en: string;
  tagline_ar: string;
  tagline_en: string;
  about_ar: string;
  about_en: string;
  resume_url: string;
  social: {
    github: string;
    linkedin: string;
    twitter: string;
    email: string;
    slowly?: string;
  };
}

export interface Project {
  id: string;
  title_ar: string;
  title_en: string;
  description_ar: string;
  description_en: string;
  tech_tags: string[];
  images: { url: string; caption_ar: string; caption_en: string }[];
  demo_url?: string;
  repo_url?: string;
  published: boolean;
  order: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface Skill {
  id: string;
  name_ar: string;
  name_en: string;
  level: number; // 0-100
  category_ar: string;
  category_en: string;
  order: number;
}

export interface Experience {
  id: string;
  employer_ar: string;
  employer_en: string;
  role_ar: string;
  role_en: string;
  from: Timestamp;
  to: Timestamp | null; // null if current
  description_ar: string;
  description_en: string;
  order: number;
}

export interface Education {
  id: string;
  institution_ar: string;
  institution_en: string;
  degree_ar: string;
  degree_en: string;
  year: number;
  description_ar: string;
  description_en: string;
  order: number;
}

export interface Message {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: Timestamp;
  handled: boolean;
}

export interface Admin {
  id: string;
  role: 'admin';
  email: string;
  createdAt: Timestamp;
}

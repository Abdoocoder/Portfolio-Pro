
'use client';

import { useSiteData } from '@/hooks/use-site-data';
import { useLanguage } from '@/hooks/use-language';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ExternalLink, Github, Mail, Download, Send, Briefcase, GraduationCap } from 'lucide-react';
import { useFormStatus } from 'react-dom';
import { useEffect, useRef, useActionState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { submitContactForm } from '@/app/actions';

function HeroSection() {
    const { settings, loading } = useSiteData();
    const { t } = useLanguage();

    if (loading && !settings) return <div className="h-screen w-full animate-pulse bg-muted"></div>;

    return (
        <section id="hero" className="py-20 text-center bg-background">
            <div className="container">
                <Image 
                    src="https://picsum.photos/seed/abdullah/128/128" 
                    alt={t(settings, 'hero_title')} 
                    width={128} height={128} 
                    className="rounded-full mx-auto mb-6 border-4 border-primary/20 shadow-lg"
                    data-ai-hint="professional portrait"
                />
                <h1 className="text-4xl md:text-6xl font-bold font-headline mb-4 animate-fade-in-down">
                    {t(settings, 'hero_title')}
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in-up">
                    {t(settings, 'tagline')}
                </p>
                <div className="flex gap-4 justify-center mt-8">
                    <Button size="lg" asChild>
                        <a href="#contact">
                            <Mail className="me-2 h-4 w-4" /> {t({key_ar: 'تواصل معي', key_en: 'Contact Me'}, 'key')}
                        </a>
                    </Button>
                    {settings?.resume_url && 
                        <Button size="lg" variant="outline" asChild>
                            <a href={settings.resume_url} target="_blank" rel="noopener noreferrer">
                                <Download className="me-2 h-4 w-4" /> {t({key_ar: 'تحميل السيرة', key_en: 'Download CV'}, 'key')}
                            </a>
                        </Button>
                    }
                </div>
            </div>
        </section>
    );
}

function AboutSection() {
    const { settings, loading } = useSiteData();
    const { t } = useLanguage();
    
    if (loading && !settings) return <div className="min-h-[400px] w-full animate-pulse bg-background"></div>;

    return (
        <section id="about" className="py-20 bg-muted/50">
            <div className="container max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold font-headline text-center mb-8">{t({key_ar: 'نبذة عني', key_en: 'About Me'}, 'key')}</h2>
                <p className="text-center text-lg text-muted-foreground leading-relaxed whitespace-pre-wrap">
                    {t(settings, 'about')}
                </p>
            </div>
        </section>
    );
}

function SkillsSection() {
    const { skills, loading } = useSiteData();
    const { t } = useLanguage();

    const skillCategories = [...new Set(skills.map(s => t(s, 'category')))];
    
    if (loading && skills.length === 0) return <div className="min-h-[400px] w-full animate-pulse bg-background"></div>;

    return (
        <section id="skills" className="py-20 bg-background">
            <div className="container">
                <h2 className="text-3xl font-bold font-headline text-center mb-12">{t({key_ar: 'المهارات التقنية', key_en: 'Technical Skills'}, 'key')}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {skillCategories.map(category => (
                        <Card key={category}>
                            <CardHeader>
                                <CardTitle>{category}</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {skills.filter(s => t(s, 'category') === category).map(skill => (
                                    <div key={skill.id}>
                                        <div className="flex justify-between mb-1">
                                            <span className="text-sm font-medium">{t(skill, 'name')}</span>
                                            <span className="text-sm text-muted-foreground">{skill.level}%</span>
                                        </div>
                                        <Progress value={skill.level} />
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}

function ProjectsSection() {
    const { projects, loading } = useSiteData();
    const { t } = useLanguage();
    
    if (loading && projects.length === 0) return <div className="min-h-screen w-full animate-pulse bg-muted/50"></div>;

    return (
        <section id="projects" className="py-20 bg-muted/50">
            <div className="container">
                <h2 className="text-3xl font-bold font-headline text-center mb-12">{t({key_ar: 'المشاريع', key_en: 'Projects'}, 'key')}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.filter(p => p.published).map(project => (
                        <Card key={project.id} className="flex flex-col overflow-hidden">
                           <div className="aspect-video overflow-hidden">
                             <Image 
                                 src={project.images[0]?.url || 'https://picsum.photos/seed/project/400/225'}
                                 alt={t(project, 'title')}
                                 width={400}
                                 height={225}
                                 className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                                 data-ai-hint="software project"
                             />
                           </div>
                            <CardHeader>
                                <CardTitle>{t(project, 'title')}</CardTitle>
                            </CardHeader>
                            <CardContent className="flex-grow">
                                <p className="text-muted-foreground text-sm mb-4">
                                    {t(project, 'description').substring(0, 100)}...
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {project.tech_tags.map(tag => (
                                        <Badge key={tag} variant="secondary">{tag}</Badge>
                                    ))}
                                </div>
                            </CardContent>
                            <div className="p-6 pt-0 flex gap-2">
                                {project.repo_url &&
                                    <Button variant="outline" size="sm" asChild>
                                        <a href={project.repo_url} target="_blank" rel="noopener noreferrer">
                                            <Github className="me-2 h-4 w-4" /> Code
                                        </a>
                                    </Button>
                                }
                                {project.demo_url &&
                                    <Button size="sm" asChild>
                                        <a href={project.demo_url} target="_blank" rel="noopener noreferrer">
                                            <ExternalLink className="me-2 h-4 w-4" /> Demo
                                        </a>
                                    </Button>
                                }
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}


function ExperienceSection() {
    const { experience, loading } = useSiteData();
    const { t } = useLanguage();

    if (loading && experience.length === 0) return null;

    return (
        <section id="experience" className="py-20 bg-background">
            <div className="container max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold font-headline text-center mb-12">{t({key_ar: 'الخبرة العملية', key_en: 'Work Experience'}, 'key')}</h2>
                <div className="relative border-s border-border ms-4">
                    {experience.map((exp, index) => (
                        <div key={exp.id} className="mb-10 ms-8">
                            <span className="absolute flex items-center justify-center w-6 h-6 bg-primary rounded-full -start-3 ring-8 ring-background">
                                <Briefcase className="w-3 h-3 text-primary-foreground" />
                            </span>
                            <h3 className="flex items-center mb-1 text-lg font-semibold">{t(exp, 'role')}</h3>
                            <p className="block mb-2 text-sm font-normal leading-none text-muted-foreground">
                                {t(exp, 'employer')} &bull; {' '}
                                {new Date(exp.from.seconds * 1000).getFullYear()} - {' '}
                                {exp.to ? new Date(exp.to.seconds * 1000).getFullYear() : t({key_ar: 'الحاضر', key_en: 'Present'}, 'key')}
                            </p>
                            <p className="mb-4 text-base font-normal text-muted-foreground">{t(exp, 'description')}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function EducationSection() {
    const { education, loading } = useSiteData();
    const { t } = useLanguage();

    if ((loading && education.length === 0) || (!loading && education.length === 0)) return null;

    return (
        <section id="education" className="py-20 bg-muted/50">
            <div className="container max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold font-headline text-center mb-12">{t({key_ar: 'التعليم', key_en: 'Education'}, 'key')}</h2>
                <div className="relative border-s border-border ms-4">
                    {education.map((edu) => (
                        <div key={edu.id} className="mb-10 ms-8">
                            <span className="absolute flex items-center justify-center w-6 h-6 bg-primary rounded-full -start-3 ring-8 ring-background">
                                <GraduationCap className="w-3 h-3 text-primary-foreground" />
                            </span>
                            <h3 className="flex items-center mb-1 text-lg font-semibold">{t(edu, 'degree')}</h3>
                            <p className="block mb-2 text-sm font-normal leading-none text-muted-foreground">
                                {t(edu, 'institution')} &bull; {edu.year}
                            </p>
                            <p className="mb-4 text-base font-normal text-muted-foreground">{t(edu, 'description')}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function SubmitButton({ text_ar, text_en }: { text_ar: string; text_en: string }) {
  const { pending } = useFormStatus();
  const { lang } = useLanguage();

  return (
    <Button type="submit" size="lg" disabled={pending} className="w-48">
      {pending ? (
        <>
          <svg className="animate-spin -ms-1 me-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span>{lang === 'en' ? 'Sending...' : 'جار الإرسال...'}</span>
        </>
      ) : (
        <>
          <Send className="me-2 h-4 w-4" />
          {lang === 'en' ? text_en : text_ar}
        </>
      )}
    </Button>
  );
}

function ContactSection() {
    const { t } = useLanguage();
    const { toast } = useToast();
    const formRef = useRef<HTMLFormElement>(null);

    const initialState: { message: string | null; errors?: any, success?: boolean } = { message: null, errors: {}, success: false };
    const [state, dispatch] = useActionState(submitContactForm, initialState);

    useEffect(() => {
        if (state.message) {
            if (state.success) {
                toast({
                    title: t({key_ar: 'نجاح', key_en: 'Success'}, 'key'),
                    description: t({key_ar: 'تم إرسال رسالتك بنجاح!', key_en: 'Your message has been sent successfully!'}, 'key'),
                });
                formRef.current?.reset();
            } else {
                toast({
                    variant: 'destructive',
                    title: t({key_ar: 'خطأ', key_en: 'Error'}, 'key'),
                    description: state.message || t({key_ar: 'حدث خطأ ما.', key_en: 'Something went wrong.'}, 'key'),
                });
            }
        }
    }, [state, t, toast]);


    return (
        <section id="contact" className="py-20 bg-muted/50">
            <div className="container max-w-2xl mx-auto">
                <h2 className="text-3xl font-bold font-headline text-center mb-8">{t({key_ar: 'تواصل معي', key_en: 'Get in Touch'}, 'key')}</h2>
                <p className="text-center text-muted-foreground mb-8">
                    {t({key_ar: 'هل لديك سؤال أو مشروع؟ لا تتردد في التواصل.', key_en: 'Have a question or a project in mind? Feel free to reach out.'}, 'key')}
                </p>
                <form ref={formRef} action={dispatch} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">{t({key_ar: 'الاسم', key_en: 'Name'}, 'key')}</Label>
                            <Input id="name" name="name" placeholder={t({key_ar: 'اسمك الكامل', key_en: 'Your full name'}, 'key')} />
                            {state.errors?.name && <p className="text-sm font-medium text-destructive">{state.errors.name[0]}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">{t({key_ar: 'البريد الإلكتروني', key_en: 'Email'}, 'key')}</Label>
                            <Input id="email" name="email" type="email" placeholder={t({key_ar: 'بريدك الإلكتروني', key_en: 'Your email address'}, 'key')} />
                            {state.errors?.email && <p className="text-sm font-medium text-destructive">{state.errors.email[0]}</p>}
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="subject">{t({key_ar: 'الموضوع', key_en: 'Subject'}, 'key')}</Label>
                        <Input id="subject" name="subject" placeholder={t({key_ar: 'عنوان الرسالة', key_en: 'Subject of your message'}, 'key')} />
                        {state.errors?.subject && <p className="text-sm font-medium text-destructive">{state.errors.subject[0]}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="message">{t({key_ar: 'الرسالة', key_en: 'Message'}, 'key')}</Label>
                        <Textarea id="message" name="message" placeholder={t({key_ar: 'اكتب رسالتك هنا...', key_en: 'Type your message here...'}, 'key')} rows={5} />
                        {state.errors?.message && <p className="text-sm font-medium text-destructive">{state.errors.message[0]}</p>}
                    </div>
                    <div className="text-center">
                        <SubmitButton text_ar='إرسال الرسالة' text_en='Send Message' />
                    </div>
                </form>
            </div>
        </section>
    );
}


export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ExperienceSection />
      <EducationSection />
      <ContactSection />
    </>
  );
}

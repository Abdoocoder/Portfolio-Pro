'use client';

import { useSiteData } from '@/hooks/use-site-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, Lightbulb, MessageSquare } from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboard() {
    const { projects, skills, loading, messages } = useSiteData();
    const unreadMessages = messages.filter(m => !m.handled).length;

    const stats = [
        {
            title: "Total Projects",
            count: projects.length,
            icon: Briefcase,
            href: "/admin/projects",
        },
        {
            title: "Total Skills",
            count: skills.length,
            icon: Lightbulb,
            href: "/admin/skills",
        },
        {
            title: "Unread Messages",
            count: unreadMessages,
            icon: MessageSquare,
            href: "/admin/messages",
        }
    ];

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold font-headline">Dashboard</h1>
            <p className="text-muted-foreground">
                Welcome back! Here's a quick overview of your portfolio.
            </p>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {stats.map((stat) => (
                    <Link href={stat.href} key={stat.title}>
                        <Card className="hover:bg-muted/50 transition-colors">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    {stat.title}
                                </CardTitle>
                                <stat.icon className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                {loading ? (
                                    <div className="h-7 w-12 animate-pulse bg-muted rounded-md" />
                                ) : (
                                    <div className="text-2xl font-bold">{stat.count}</div>
                                )}
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                   <p className="text-muted-foreground">
                       Use the sidebar navigation to manage your site content. You can add new projects, update your skills, and check your contact messages.
                   </p>
                </CardContent>
            </Card>
        </div>
    );
}

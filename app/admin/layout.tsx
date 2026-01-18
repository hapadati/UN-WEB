'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import {
    LayoutDashboard,
    ShieldAlert,
    ScrollText,
    Settings,
    LogOut,
    Menu,
    X,
    ShieldCheck,
    Sword
} from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import { cn } from '@/lib/utils';
import { AuthButton } from '@/components/AuthButton';

interface SidebarItemProps {
    icon: React.ElementType;
    label: string;
    href: string;
    isActive: boolean;
}

function SidebarItem({ icon: Icon, label, href, isActive }: SidebarItemProps) {
    return (
        <Link href={href} className="block w-full">
            <div
                className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative overflow-hidden",
                    isActive
                        ? "bg-red-500/10 text-red-500 font-bold border border-red-500/20"
                        : "text-zinc-400 hover:text-red-400 hover:bg-red-500/5 hover:border-red-500/10 border border-transparent"
                )}
            >
                <Icon className={cn("w-5 h-5", isActive && "fill-current/20")} />
                <span>{label}</span>
                {isActive && (
                    <motion.div
                        layoutId="activeAdminNav"
                        className="absolute left-0 top-0 bottom-0 w-1 bg-red-500 rounded-full"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    />
                )}
            </div>
        </Link>
    );
}

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const [isMobileOpen, setIsMobileOpen] = React.useState(false);
    const { data: session } = useSession();

    const navItems = [
        { icon: LayoutDashboard, label: 'Overview', href: '/admin' },
        { icon: Sword, label: 'Quest Manager', href: '/admin/quests' },
        { icon: ShieldAlert, label: 'Security', href: '/admin/security' },
        { icon: ScrollText, label: 'Audit Logs', href: '/admin/logs' },
    ];

    return (
        <div className="min-h-screen bg-black text-white font-sans selection:bg-red-500/30">
            {/* Mobile Header */}
            <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-zinc-950/80 backdrop-blur-md border-b border-white/5 z-50 flex items-center justify-between px-4">
                <div className="flex items-center gap-2 font-bold text-lg text-red-500">
                    <ShieldCheck className="w-6 h-6" />
                    <span>ADMIN PORTAL</span>
                </div>
                <button
                    onClick={() => setIsMobileOpen(!isMobileOpen)}
                    className="p-2 text-zinc-400 hover:text-white"
                >
                    {isMobileOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Sidebar */}
            <aside
                className={cn(
                    "fixed top-0 left-0 bottom-0 w-64 bg-zinc-950 border-r border-red-500/10 z-40 transform transition-transform duration-300 lg:translate-x-0 pt-20 lg:pt-8 px-4 flex flex-col",
                    isMobileOpen ? "translate-x-0" : "-translate-x-full"
                )}
            >
                <div className="hidden lg:flex items-center gap-2 font-bold text-2xl text-red-500 mb-10 px-2 tracking-tighter">
                    <div className="p-2 bg-red-500/10 rounded-lg border border-red-500/20">
                        <ShieldCheck className="w-8 h-8" />
                    </div>
                    <span>ADMIN<span className="text-white">PORTAL</span></span>
                </div>

                <nav className="space-y-1 flex-1">
                    {navItems.map((item) => (
                        <SidebarItem
                            key={item.href}
                            icon={item.icon}
                            label={item.label}
                            href={item.href}
                            isActive={pathname === item.href}
                        />
                    ))}
                </nav>

                <div className="mt-auto pb-8 space-y-4">
                    <div className="p-4 rounded-xl bg-red-950/20 border border-red-500/10">
                        <div className="text-xs font-bold text-red-500 mb-1">SECURITY STATUS</div>
                        <div className="flex items-center gap-2 text-green-400 text-sm font-mono">
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            SYSTEM SECURE
                        </div>
                    </div>

                    <Link href="/dashboard" className="block w-full">
                        <div className="flex items-center gap-3 px-4 py-3 rounded-xl text-zinc-400 hover:text-white hover:bg-white/5 transition-all">
                            <LogOut className="w-5 h-5" />
                            <span>Exit to App</span>
                        </div>
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className="lg:pl-64 min-h-screen pt-20 lg:pt-0">
                <div className="max-w-7xl mx-auto p-6 md:p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    {children}
                </div>
            </main>

            {/* Overlay for mobile */}
            {isMobileOpen && (
                <div
                    className="fixed inset-0 bg-black/80 z-30 lg:hidden backdrop-blur-sm"
                    onClick={() => setIsMobileOpen(false)}
                />
            )}
        </div>
    );
}

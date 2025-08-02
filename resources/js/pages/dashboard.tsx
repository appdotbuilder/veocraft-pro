import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

interface Props {
    stats: {
        total_prompts: number;
        total_assets: number;
        satset_prompts: number;
        manual_prompts: number;
    };
    recentPrompts: Array<{
        id: number;
        title: string;
        mode: string;
        created_at: string;
    }>;
    recentAssets: Array<{
        id: number;
        name: string;
        type: string;
        created_at: string;
    }>;
    [key: string]: unknown;
}

export default function Dashboard({ stats, recentPrompts, recentAssets }: Props) {
    const handleCreatePrompt = (mode: 'satset' | 'manual') => {
        router.visit(route('prompts.create', { mode }));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard - Veocraft Pro" />
            <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-6 overflow-x-auto">
                {/* Welcome Header */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-foreground">🎬 Welcome to Veocraft Pro</h1>
                        <p className="text-muted-foreground">Create stunning video prompts with AI-powered assistance</p>
                    </div>
                    <div className="flex gap-3">
                        <Button 
                            onClick={() => handleCreatePrompt('satset')}
                            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                        >
                            🤖 SatSet Mode
                        </Button>
                        <Button 
                            onClick={() => handleCreatePrompt('manual')}
                            variant="outline"
                        >
                            ✏️ Manual Mode
                        </Button>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid gap-4 md:grid-cols-4">
                    <div className="rounded-xl border bg-card p-6">
                        <div className="flex items-center gap-2">
                            <div className="text-2xl">📝</div>
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Total Prompts</p>
                                <p className="text-2xl font-bold">{stats.total_prompts}</p>
                            </div>
                        </div>
                    </div>
                    <div className="rounded-xl border bg-card p-6">
                        <div className="flex items-center gap-2">
                            <div className="text-2xl">🎨</div>
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Assets Created</p>
                                <p className="text-2xl font-bold">{stats.total_assets}</p>
                            </div>
                        </div>
                    </div>
                    <div className="rounded-xl border bg-card p-6">
                        <div className="flex items-center gap-2">
                            <div className="text-2xl">🤖</div>
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">SatSet Prompts</p>
                                <p className="text-2xl font-bold">{stats.satset_prompts}</p>
                            </div>
                        </div>
                    </div>
                    <div className="rounded-xl border bg-card p-6">
                        <div className="flex items-center gap-2">
                            <div className="text-2xl">✏️</div>
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Manual Prompts</p>
                                <p className="text-2xl font-bold">{stats.manual_prompts}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="grid gap-6 lg:grid-cols-2">
                    {/* Create New Section */}
                    <div className="rounded-xl border bg-card p-6">
                        <h2 className="mb-4 text-xl font-semibold">🚀 Quick Start</h2>
                        <div className="space-y-3">
                            <Button 
                                onClick={() => handleCreatePrompt('satset')}
                                className="w-full justify-start h-auto p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-200 hover:from-purple-500/20 hover:to-pink-500/20 text-left"
                                variant="outline"
                            >
                                <div className="text-left">
                                    <div className="font-semibold text-purple-700 dark:text-purple-300">🤖 SatSet Mode</div>
                                    <div className="text-sm text-muted-foreground">AI transforms simple ideas into detailed prompts</div>
                                </div>
                            </Button>
                            <Button 
                                onClick={() => handleCreatePrompt('manual')}
                                className="w-full justify-start h-auto p-4 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-200 hover:from-blue-500/20 hover:to-cyan-500/20 text-left"
                                variant="outline"
                            >
                                <div className="text-left">
                                    <div className="font-semibold text-blue-700 dark:text-blue-300">✏️ Manual Mode</div>
                                    <div className="text-sm text-muted-foreground">Scene-by-scene construction with full control</div>
                                </div>
                            </Button>
                            <Link href={route('assets.create')}>
                                <Button 
                                    className="w-full justify-start h-auto p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-200 hover:from-green-500/20 hover:to-emerald-500/20 text-left"
                                    variant="outline"
                                >
                                    <div className="text-left">
                                        <div className="font-semibold text-green-700 dark:text-green-300">🎨 Create Asset</div>
                                        <div className="text-sm text-muted-foreground">Build reusable characters and objects</div>
                                    </div>
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {/* Recent Activity */}
                    <div className="rounded-xl border bg-card p-6">
                        <div className="mb-4 flex items-center justify-between">
                            <h2 className="text-xl font-semibold">📈 Recent Activity</h2>
                            <Link href={route('prompts.index')}>
                                <Button variant="ghost" size="sm">View All</Button>
                            </Link>
                        </div>
                        <div className="space-y-3">
                            {recentPrompts.length > 0 ? (
                                recentPrompts.map((prompt) => (
                                    <Link 
                                        key={prompt.id} 
                                        href={route('prompts.show', prompt.id)}
                                        className="block"
                                    >
                                        <div className="rounded-lg border p-3 hover:bg-muted/50 transition-colors">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <p className="font-medium truncate">{prompt.title}</p>
                                                    <p className="text-sm text-muted-foreground">
                                                        {prompt.mode === 'satset' ? '🤖 SatSet' : '✏️ Manual'} · 
                                                        {new Date(prompt.created_at).toLocaleDateString()}
                                                    </p>
                                                </div>
                                                <div className="text-xl">
                                                    {prompt.mode === 'satset' ? '🤖' : '✏️'}
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))
                            ) : (
                                <div className="text-center py-8 text-muted-foreground">
                                    <div className="text-4xl mb-2">🎬</div>
                                    <p>No prompts yet. Create your first one!</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Asset Library Preview */}
                {recentAssets.length > 0 && (
                    <div className="rounded-xl border bg-card p-6">
                        <div className="mb-4 flex items-center justify-between">
                            <h2 className="text-xl font-semibold">🎨 Asset Library</h2>
                            <Link href={route('assets.index')}>
                                <Button variant="ghost" size="sm">View All Assets</Button>
                            </Link>
                        </div>
                        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                            {recentAssets.slice(0, 3).map((asset) => (
                                <Link 
                                    key={asset.id} 
                                    href={route('assets.show', asset.id)}
                                    className="block"
                                >
                                    <div className="rounded-lg border p-4 hover:bg-muted/50 transition-colors">
                                        <div className="flex items-center gap-3">
                                            <div className="text-2xl">
                                                {asset.type === 'character' ? '👤' : 
                                                 asset.type === 'object' ? '📦' : '🏷️'}
                                            </div>
                                            <div>
                                                <p className="font-medium truncate">{asset.name}</p>
                                                <p className="text-sm text-muted-foreground capitalize">{asset.type}</p>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';

interface Prompt {
    id: number;
    title: string;
    content: string;
    mode: 'satset' | 'manual';
    created_at: string;
}

interface Props {
    prompts: {
        data: Prompt[];
        current_page: number;
        last_page: number;
        total: number;
    };
    [key: string]: unknown;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Prompts',
        href: '/prompts',
    },
];

export default function PromptsIndex({ prompts }: Props) {
    const handleCreatePrompt = (mode: 'satset' | 'manual') => {
        router.visit(route('prompts.create', { mode }));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Bank Prompt - Veocraft Pro" />
            
            <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">📚 Bank Prompt</h1>
                        <p className="text-muted-foreground">Your personal library of video prompts</p>
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

                {prompts.data.length === 0 ? (
                    <div className="flex flex-1 items-center justify-center rounded-xl border bg-card">
                        <div className="text-center p-8">
                            <div className="text-6xl mb-4">🎬</div>
                            <h2 className="text-2xl font-semibold mb-2">No prompts yet</h2>
                            <p className="text-muted-foreground mb-6">
                                Create your first video prompt to get started with Veocraft Pro
                            </p>
                            <div className="flex gap-3 justify-center">
                                <Button 
                                    onClick={() => handleCreatePrompt('satset')}
                                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                                >
                                    🤖 Try SatSet Mode
                                </Button>
                                <Button 
                                    onClick={() => handleCreatePrompt('manual')}
                                    variant="outline"
                                >
                                    ✏️ Try Manual Mode
                                </Button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {prompts.data.map((prompt) => (
                                <Link 
                                    key={prompt.id} 
                                    href={route('prompts.show', prompt.id)}
                                    className="block"
                                >
                                    <div className="rounded-xl border bg-card p-6 hover:shadow-md transition-all duration-200 hover:border-purple-200 dark:hover:border-purple-800">
                                        <div className="flex items-start justify-between mb-3">
                                            <div className="text-2xl">
                                                {prompt.mode === 'satset' ? '🤖' : '✏️'}
                                            </div>
                                            <div className="text-xs text-muted-foreground">
                                                {new Date(prompt.created_at).toLocaleDateString()}
                                            </div>
                                        </div>
                                        
                                        <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                                            {prompt.title}
                                        </h3>
                                        
                                        <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                                            {prompt.content.substring(0, 150)}...
                                        </p>
                                        
                                        <div className="flex items-center justify-between">
                                            <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                                                {prompt.mode === 'satset' ? '🤖 SatSet' : '✏️ Manual'}
                                            </span>
                                            <Button size="sm" variant="ghost" className="text-purple-600 hover:text-purple-700">
                                                View →
                                            </Button>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        {/* Pagination */}
                        {prompts.last_page > 1 && (
                            <div className="flex items-center justify-center gap-2 mt-6">
                                {prompts.current_page > 1 && (
                                    <Link href={`?page=${prompts.current_page - 1}`}>
                                        <Button variant="outline" size="sm">Previous</Button>
                                    </Link>
                                )}
                                <span className="text-sm text-muted-foreground">
                                    Page {prompts.current_page} of {prompts.last_page}
                                </span>
                                {prompts.current_page < prompts.last_page && (
                                    <Link href={`?page=${prompts.current_page + 1}`}>
                                        <Button variant="outline" size="sm">Next</Button>
                                    </Link>
                                )}
                            </div>
                        )}
                    </>
                )}
            </div>
        </AppLayout>
    );
}
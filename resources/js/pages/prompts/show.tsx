import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';

interface Prompt {
    id: number;
    title: string;
    content: string;
    mode: 'satset' | 'manual';
    created_at: string;
    user: {
        name: string;
    };
}

interface Props {
    prompt: Prompt;
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
    {
        title: 'View',
        href: '#',
    },
];

export default function ShowPrompt({ prompt }: Props) {
    const [isGeneratingStoryboard, setIsGeneratingStoryboard] = useState(false);

    const handleGenerateStoryboard = () => {
        setIsGeneratingStoryboard(true);
        
        router.post(route('storyboard.store'), {
            prompt_id: prompt.id,
        }, {
            onFinish: () => setIsGeneratingStoryboard(false),
        });
    };

    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this prompt?')) {
            router.delete(route('prompts.destroy', prompt.id));
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`${prompt.title} - Veocraft Pro`} />
            
            <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-6">
                {/* Header */}
                <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                        <div className="text-4xl">
                            {prompt.mode === 'satset' ? '🤖' : '✏️'}
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold mb-2">{prompt.title}</h1>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                                    {prompt.mode === 'satset' ? '🤖 SatSet Mode' : '✏️ Manual Mode'}
                                </span>
                                <span>Created {new Date(prompt.created_at).toLocaleDateString()}</span>
                                <span>by {prompt.user.name}</span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="flex gap-3">
                        <Button 
                            onClick={handleGenerateStoryboard}
                            disabled={isGeneratingStoryboard}
                            className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                        >
                            {isGeneratingStoryboard ? (
                                <>
                                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                                    Generating...
                                </>
                            ) : (
                                '🎨 Generate Storyboard'
                            )}
                        </Button>
                        <Link href={route('prompts.edit', prompt.id)}>
                            <Button variant="outline">✏️ Edit</Button>
                        </Link>
                        <Button variant="destructive" onClick={handleDelete}>
                            🗑️ Delete
                        </Button>
                    </div>
                </div>

                {/* Content */}
                <div className="grid gap-6 lg:grid-cols-3">
                    <div className="lg:col-span-2">
                        <div className="rounded-xl border bg-card p-6">
                            <h2 className="text-xl font-semibold mb-4">📝 Prompt Content</h2>
                            <div className="prose prose-sm max-w-none dark:prose-invert">
                                <div className="whitespace-pre-wrap text-foreground leading-relaxed">
                                    {prompt.content}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        {/* Actions */}
                        <div className="rounded-xl border bg-card p-6">
                            <h3 className="text-lg font-semibold mb-4">🚀 Actions</h3>
                            <div className="space-y-3">
                                <Button 
                                    onClick={handleGenerateStoryboard}
                                    disabled={isGeneratingStoryboard}
                                    className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                                    size="sm"
                                >
                                    {isGeneratingStoryboard ? (
                                        <>
                                            <div className="mr-2 h-3 w-3 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                                            Generating Storyboard...
                                        </>
                                    ) : (
                                        '🎨 Generate Visual Storyboard'
                                    )}
                                </Button>
                                
                                <Link href={route('prompts.edit', prompt.id)} className="block">
                                    <Button variant="outline" size="sm" className="w-full">
                                        ✏️ Edit Prompt
                                    </Button>
                                </Link>
                                
                                <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    className="w-full"
                                    onClick={() => navigator.clipboard.writeText(prompt.content)}
                                >
                                    📋 Copy to Clipboard
                                </Button>
                            </div>
                        </div>

                        {/* Prompt Info */}
                        <div className="rounded-xl border bg-card p-6">
                            <h3 className="text-lg font-semibold mb-4">ℹ️ Prompt Details</h3>
                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Mode:</span>
                                    <span className="font-medium">
                                        {prompt.mode === 'satset' ? '🤖 SatSet (AI Generated)' : '✏️ Manual'}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Created:</span>
                                    <span className="font-medium">
                                        {new Date(prompt.created_at).toLocaleDateString()}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Word Count:</span>
                                    <span className="font-medium">
                                        {prompt.content.split(' ').length} words
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Character Count:</span>
                                    <span className="font-medium">
                                        {prompt.content.length} chars
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Tips */}
                        <div className="rounded-xl border bg-card p-6">
                            <h3 className="text-lg font-semibold mb-4">💡 Next Steps</h3>
                            <div className="space-y-2 text-sm text-muted-foreground">
                                <p>• Generate a visual storyboard to see your scenes</p>
                                <p>• Edit the prompt to refine specific details</p>
                                <p>• Copy the content to use in video production</p>
                                <p>• Create similar prompts using this as a template</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
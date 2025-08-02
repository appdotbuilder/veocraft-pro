import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';

interface Props {
    mode: 'satset' | 'manual';
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
        title: 'Create',
        href: '/prompts/create',
    },
];

export default function CreatePrompt({ mode }: Props) {
    const [isGenerating, setIsGenerating] = useState(false);
    
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        content: '',
        mode: mode,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        setIsGenerating(true);
        
        post(route('prompts.store'), {
            onFinish: () => setIsGenerating(false),
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Create ${mode === 'satset' ? 'SatSet' : 'Manual'} Prompt - Veocraft Pro`} />
            
            <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-6">
                <div className="flex items-center gap-4">
                    <div className="text-4xl">
                        {mode === 'satset' ? '🤖' : '✏️'}
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold">
                            Create {mode === 'satset' ? 'SatSet' : 'Manual'} Prompt
                        </h1>
                        <p className="text-muted-foreground">
                            {mode === 'satset' 
                                ? 'AI will transform your simple idea into a detailed video prompt'
                                : 'Build your prompt scene by scene with full creative control'
                            }
                        </p>
                    </div>
                </div>

                <div className="grid gap-6 lg:grid-cols-2">
                    {/* Form */}
                    <div className="rounded-xl border bg-card p-6">
                        <form onSubmit={submit} className="space-y-6">
                            <div>
                                <Label htmlFor="title">Prompt Title</Label>
                                <Input
                                    id="title"
                                    type="text"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    placeholder="e.g., Energy Drink Commercial"
                                    className="mt-1"
                                />
                                {errors.title && (
                                    <p className="mt-1 text-sm text-red-600">{errors.title}</p>
                                )}
                            </div>

                            <div>
                                <Label htmlFor="content">
                                    {mode === 'satset' ? 'Your Idea' : 'Prompt Content'}
                                </Label>
                                <Textarea
                                    id="content"
                                    value={data.content}
                                    onChange={(e) => setData('content', e.target.value)}
                                    placeholder={
                                        mode === 'satset' 
                                            ? 'Describe your idea in a few words or sentences. E.g., "A promotional video for a new energy drink targeting young athletes."'
                                            : 'Write your detailed prompt with scene descriptions, camera angles, lighting, etc.'
                                    }
                                    rows={mode === 'satset' ? 4 : 12}
                                    className="mt-1"
                                />
                                {errors.content && (
                                    <p className="mt-1 text-sm text-red-600">{errors.content}</p>
                                )}
                            </div>

                            <Button 
                                type="submit" 
                                disabled={processing || isGenerating}
                                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                            >
                                {isGenerating ? (
                                    <>
                                        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                                        {mode === 'satset' ? 'AI is generating...' : 'Creating prompt...'}
                                    </>
                                ) : (
                                    <>
                                        {mode === 'satset' ? '🤖 Generate with AI' : '✏️ Create Prompt'}
                                    </>
                                )}
                            </Button>
                        </form>
                    </div>

                    {/* Help/Preview */}
                    <div className="rounded-xl border bg-card p-6">
                        <h3 className="mb-4 text-lg font-semibold">
                            {mode === 'satset' ? '🤖 How SatSet Works' : '✏️ Manual Mode Tips'}
                        </h3>
                        
                        {mode === 'satset' ? (
                            <div className="space-y-4">
                                <div className="rounded-lg bg-muted p-4">
                                    <h4 className="font-medium mb-2">What is SatSet Mode?</h4>
                                    <p className="text-sm text-muted-foreground">
                                        SatSet uses advanced AI to transform your simple concept into a comprehensive video prompt with detailed scenes, camera directions, and production notes.
                                    </p>
                                </div>
                                
                                <div className="space-y-3">
                                    <h4 className="font-medium">Example Inputs:</h4>
                                    <div className="space-y-2 text-sm">
                                        <div className="rounded border-l-4 border-purple-500 bg-purple-50 p-3 dark:bg-purple-950">
                                            "A promotional video for a new energy drink"
                                        </div>
                                        <div className="rounded border-l-4 border-blue-500 bg-blue-50 p-3 dark:bg-blue-950">
                                            "Tech startup announcement video"
                                        </div>
                                        <div className="rounded border-l-4 border-green-500 bg-green-50 p-3 dark:bg-green-950">
                                            "Fashion brand summer collection showcase"
                                        </div>
                                    </div>
                                </div>

                                <div className="rounded-lg bg-amber-50 p-4 dark:bg-amber-950">
                                    <p className="text-sm">
                                        💡 <strong>Tip:</strong> The simpler your input, the more creative freedom the AI has to generate interesting scenes and angles.
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <div className="rounded-lg bg-muted p-4">
                                    <h4 className="font-medium mb-2">Manual Mode Features</h4>
                                    <p className="text-sm text-muted-foreground">
                                        Build your prompt with complete creative control. Include specific scenes, camera movements, character details, and production requirements.
                                    </p>
                                </div>
                                
                                <div className="space-y-3">
                                    <h4 className="font-medium">Include These Elements:</h4>
                                    <ul className="space-y-1 text-sm text-muted-foreground">
                                        <li>• Scene descriptions and locations</li>
                                        <li>• Camera angles and movements</li>
                                        <li>• Character actions and dialogue</li>
                                        <li>• Lighting and mood specifications</li>
                                        <li>• Audio and music notes</li>
                                        <li>• Timing and pacing requirements</li>
                                    </ul>
                                </div>

                                <div className="rounded-lg bg-blue-50 p-4 dark:bg-blue-950">
                                    <p className="text-sm">
                                        🎬 <strong>Pro Tip:</strong> Structure your prompt with clear scene breaks for better storyboard generation later.
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Developer Admin',
        href: '/developer',
    },
];



export default function DeveloperAdminDashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Developer Admin Dashboard - Veocraft Pro" />
            
            <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-6">
                <div className="flex items-center gap-4">
                    <div className="text-4xl">⚙️</div>
                    <div>
                        <h1 className="text-3xl font-bold">Developer Admin Dashboard</h1>
                        <p className="text-muted-foreground">Configure your Veocraft Pro instance</p>
                    </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    <div className="rounded-xl border bg-card p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="text-2xl">🎨</div>
                            <h2 className="text-xl font-semibold">Branding</h2>
                        </div>
                        <p className="text-muted-foreground mb-4">
                            Customize your brand name, colors, and footer text.
                        </p>
                        <Link href={route('developer.branding')}>
                            <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                                Customize Branding
                            </Button>
                        </Link>
                    </div>

                    <div className="rounded-xl border bg-card p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="text-2xl">🔑</div>
                            <h2 className="text-xl font-semibold">API Keys</h2>
                        </div>
                        <p className="text-muted-foreground mb-4">
                            Configure AI service API keys for text generation, image creation, and vision.
                        </p>
                        <Link href={route('developer.api-keys')}>
                            <Button className="w-full" variant="outline">
                                Manage API Keys
                            </Button>
                        </Link>
                    </div>
                </div>

                <div className="rounded-xl border bg-card p-6">
                    <h3 className="text-lg font-semibold mb-4">🛠️ Developer Tools</h3>
                    <div className="grid gap-4 md:grid-cols-3">
                        <div className="p-4 border rounded-lg">
                            <h4 className="font-medium mb-2">🤖 Text LLM</h4>
                            <p className="text-sm text-muted-foreground">
                                OpenAI GPT for prompt generation
                            </p>
                        </div>
                        <div className="p-4 border rounded-lg">
                            <h4 className="font-medium mb-2">🎨 Image Generation</h4>
                            <p className="text-sm text-muted-foreground">
                                DALL-E for storyboard creation
                            </p>
                        </div>
                        <div className="p-4 border rounded-lg">
                            <h4 className="font-medium mb-2">👁️ Image Vision</h4>
                            <p className="text-sm text-muted-foreground">
                                GPT-4 Vision for image analysis
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
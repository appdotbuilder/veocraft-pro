import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

interface Props {
    type: 'character' | 'object' | 'product';
    [key: string]: unknown;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Asset Builder',
        href: '/assets',
    },
    {
        title: 'Create',
        href: '/assets/create',
    },
];

const assetTypes = [
    { value: 'character', label: 'Character', icon: '👤', description: 'People, personas, or animated characters' },
    { value: 'object', label: 'Object', icon: '📦', description: 'Physical items, props, or equipment' },
    { value: 'product', label: 'Product', icon: '🏷️', description: 'Branded items, merchandise, or services' },
];

export default function CreateAsset({ type }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        type: type,
        description: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('assets.store'));
    };

    const selectedType = assetTypes.find(t => t.value === data.type);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Create ${selectedType?.label} Asset - Veocraft Pro`} />
            
            <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-6">
                <div className="flex items-center gap-4">
                    <div className="text-4xl">
                        {selectedType?.icon}
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold">
                            Create {selectedType?.label} Asset
                        </h1>
                        <p className="text-muted-foreground">
                            {selectedType?.description}
                        </p>
                    </div>
                </div>

                <div className="grid gap-6 lg:grid-cols-2">
                    {/* Form */}
                    <div className="rounded-xl border bg-card p-6">
                        <form onSubmit={submit} className="space-y-6">
                            <div>
                                <Label htmlFor="type">Asset Type</Label>
                                <div className="mt-2 grid grid-cols-3 gap-2">
                                    {assetTypes.map((assetType) => (
                                        <button
                                            key={assetType.value}
                                            type="button"
                                            onClick={() => setData('type', assetType.value as 'character' | 'object' | 'product')}
                                            className={`flex flex-col items-center gap-2 rounded-lg border p-4 text-center transition-colors ${
                                                data.type === assetType.value
                                                    ? 'border-purple-500 bg-purple-50 dark:bg-purple-950'
                                                    : 'border-gray-200 hover:border-gray-300 dark:border-gray-700'
                                            }`}
                                        >
                                            <div className="text-2xl">{assetType.icon}</div>
                                            <div className="text-sm font-medium">{assetType.label}</div>
                                        </button>
                                    ))}
                                </div>
                                {errors.type && (
                                    <p className="mt-1 text-sm text-red-600">{errors.type}</p>
                                )}
                            </div>

                            <div>
                                <Label htmlFor="name">{selectedType?.label} Name</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    placeholder={`e.g., ${
                                        data.type === 'character' ? 'Sarah the CEO' :
                                        data.type === 'object' ? 'Modern Laptop' :
                                        'Energy Drink'
                                    }`}
                                    className="mt-1"
                                />
                                {errors.name && (
                                    <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                                )}
                            </div>

                            <div>
                                <Label htmlFor="description">Detailed Description</Label>
                                <Textarea
                                    id="description"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    placeholder={getDescriptionPlaceholder(data.type)}
                                    rows={8}
                                    className="mt-1"
                                />
                                {errors.description && (
                                    <p className="mt-1 text-sm text-red-600">{errors.description}</p>
                                )}
                            </div>

                            <Button 
                                type="submit" 
                                disabled={processing}
                                className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
                            >
                                {processing ? (
                                    <>
                                        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                                        Creating...
                                    </>
                                ) : (
                                    <>
                                        {selectedType?.icon} Create {selectedType?.label}
                                    </>
                                )}
                            </Button>
                        </form>
                    </div>

                    {/* Help */}
                    <div className="rounded-xl border bg-card p-6">
                        <h3 className="mb-4 text-lg font-semibold">
                            {selectedType?.icon} {selectedType?.label} Asset Tips
                        </h3>
                        
                        <div className="space-y-4">
                            <div className="rounded-lg bg-muted p-4">
                                <h4 className="font-medium mb-2">What are Asset Components?</h4>
                                <p className="text-sm text-muted-foreground">
                                    Assets are reusable components that help maintain consistency across your video prompts. Create detailed descriptions once and reference them in multiple projects.
                                </p>
                            </div>
                            
                            {getAssetTips(data.type)}

                            <div className="rounded-lg bg-blue-50 p-4 dark:bg-blue-950">
                                <p className="text-sm">
                                    💡 <strong>Pro Tip:</strong> The more detailed your asset description, the more consistent your video outputs will be across different prompts.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

function getDescriptionPlaceholder(type: string): string {
    switch (type) {
        case 'character':
            return 'Describe the character\'s appearance, personality, clothing style, age, background, and key traits. Include details about their role, expertise, and how they should appear on camera.';
        case 'object':
            return 'Describe the object\'s appearance, materials, colors, size, style, and key features. Include details about how it should be positioned and lit in scenes.';
        case 'product':
            return 'Describe the product\'s features, benefits, target audience, branding elements, and key selling points. Include details about packaging, colors, and how it should be showcased.';
        default:
            return 'Provide a detailed description of this asset...';
    }
}

function getAssetTips(type: string) {
    switch (type) {
        case 'character':
            return (
                <div className="space-y-3">
                    <h4 className="font-medium">Character Details to Include:</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>• Physical appearance (age, height, build)</li>
                        <li>• Clothing style and colors</li>
                        <li>• Personality traits and demeanor</li>
                        <li>• Professional background</li>
                        <li>• Key expertise or role</li>
                        <li>• How they interact with products/services</li>
                    </ul>
                </div>
            );
        case 'object':
            return (
                <div className="space-y-3">
                    <h4 className="font-medium">Object Details to Include:</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>• Materials and finish</li>
                        <li>• Colors and design style</li>
                        <li>• Size and dimensions</li>
                        <li>• Key features or unique elements</li>
                        <li>• Typical usage context</li>
                        <li>• Lighting and positioning preferences</li>
                    </ul>
                </div>
            );
        case 'product':
            return (
                <div className="space-y-3">
                    <h4 className="font-medium">Product Details to Include:</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>• Key features and benefits</li>
                        <li>• Target audience</li>
                        <li>• Brand colors and styling</li>
                        <li>• Packaging appearance</li>
                        <li>• Unique selling points</li>
                        <li>• Usage scenarios and contexts</li>
                    </ul>
                </div>
            );
        default:
            return null;
    }
}
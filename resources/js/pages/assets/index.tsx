import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';

interface Asset {
    id: number;
    name: string;
    type: 'character' | 'object' | 'product';
    description: string;
    created_at: string;
}

interface Props {
    assets: {
        data: Asset[];
        current_page: number;
        last_page: number;
        total: number;
    };
    selectedType?: string;
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
];

const assetTypes = [
    { value: '', label: 'All Types', icon: '📦', color: 'gray' },
    { value: 'character', label: 'Characters', icon: '👤', color: 'blue' },
    { value: 'object', label: 'Objects', icon: '📦', color: 'green' },
    { value: 'product', label: 'Products', icon: '🏷️', color: 'purple' },
];

export default function AssetsIndex({ assets, selectedType }: Props) {
    const handleCreateAsset = (type: string = 'character') => {
        router.visit(route('assets.create', { type }));
    };

    const handleFilterByType = (type: string) => {
        router.visit(route('assets.index', type ? { type } : {}));
    };

    const getAssetIcon = (type: string) => {
        switch (type) {
            case 'character': return '👤';
            case 'object': return '📦';
            case 'product': return '🏷️';
            default: return '📦';
        }
    };

    const getAssetColor = (type: string) => {
        switch (type) {
            case 'character': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
            case 'object': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
            case 'product': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
            default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Asset Builder - Veocraft Pro" />
            
            <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">🎨 Asset Builder</h1>
                        <p className="text-muted-foreground">Build reusable components for consistent video branding</p>
                    </div>
                    <div className="flex gap-3">
                        <Button 
                            onClick={() => handleCreateAsset('character')}
                            className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
                        >
                            👤 Create Character
                        </Button>
                        <Button 
                            onClick={() => handleCreateAsset('object')}
                            variant="outline"
                        >
                            📦 Create Object
                        </Button>
                    </div>
                </div>

                {/* Filter Tabs */}
                <div className="flex gap-2 overflow-x-auto">
                    {assetTypes.map((type) => (
                        <Button
                            key={type.value}
                            variant={selectedType === type.value ? "default" : "outline"}
                            size="sm"
                            onClick={() => handleFilterByType(type.value)}
                            className="flex items-center gap-2 whitespace-nowrap"
                        >
                            <span>{type.icon}</span>
                            {type.label}
                        </Button>
                    ))}
                </div>

                {assets.data.length === 0 ? (
                    <div className="flex flex-1 items-center justify-center rounded-xl border bg-card">
                        <div className="text-center p-8">
                            <div className="text-6xl mb-4">🎨</div>
                            <h2 className="text-2xl font-semibold mb-2">No assets yet</h2>
                            <p className="text-muted-foreground mb-6">
                                Create reusable characters, objects, and products to maintain consistency across your video prompts
                            </p>
                            <div className="flex gap-3 justify-center">
                                <Button 
                                    onClick={() => handleCreateAsset('character')}
                                    className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
                                >
                                    👤 Create Character
                                </Button>
                                <Button 
                                    onClick={() => handleCreateAsset('object')}
                                    variant="outline"
                                >
                                    📦 Create Object
                                </Button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {assets.data.map((asset) => (
                                <Link 
                                    key={asset.id} 
                                    href={route('assets.show', asset.id)}
                                    className="block"
                                >
                                    <div className="rounded-xl border bg-card p-6 hover:shadow-md transition-all duration-200 hover:border-blue-200 dark:hover:border-blue-800">
                                        <div className="flex items-start justify-between mb-3">
                                            <div className="text-3xl">
                                                {getAssetIcon(asset.type)}
                                            </div>
                                            <div className="text-xs text-muted-foreground">
                                                {new Date(asset.created_at).toLocaleDateString()}
                                            </div>
                                        </div>
                                        
                                        <h3 className="font-semibold text-lg mb-2 line-clamp-1">
                                            {asset.name}
                                        </h3>
                                        
                                        <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                                            {asset.description.substring(0, 120)}...
                                        </p>
                                        
                                        <div className="flex items-center justify-between">
                                            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getAssetColor(asset.type)}`}>
                                                {getAssetIcon(asset.type)} {asset.type.charAt(0).toUpperCase() + asset.type.slice(1)}
                                            </span>
                                            <Button size="sm" variant="ghost" className="text-blue-600 hover:text-blue-700">
                                                View →
                                            </Button>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        {/* Pagination */}
                        {assets.last_page > 1 && (
                            <div className="flex items-center justify-center gap-2 mt-6">
                                {assets.current_page > 1 && (
                                    <Link href={`?page=${assets.current_page - 1}${selectedType ? `&type=${selectedType}` : ''}`}>
                                        <Button variant="outline" size="sm">Previous</Button>
                                    </Link>
                                )}
                                <span className="text-sm text-muted-foreground">
                                    Page {assets.current_page} of {assets.last_page}
                                </span>
                                {assets.current_page < assets.last_page && (
                                    <Link href={`?page=${assets.current_page + 1}${selectedType ? `&type=${selectedType}` : ''}`}>
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
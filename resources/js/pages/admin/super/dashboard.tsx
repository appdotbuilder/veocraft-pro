import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Super Admin',
        href: '/superadmin',
    },
];



export default function SuperAdminDashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Super Admin Dashboard - Veocraft Pro" />
            
            <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-6">
                <div className="flex items-center gap-4">
                    <div className="text-4xl">👑</div>
                    <div>
                        <h1 className="text-3xl font-bold">Super Admin Dashboard</h1>
                        <p className="text-muted-foreground">Manage Veocraft Pro system settings and users</p>
                    </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <div className="rounded-xl border bg-card p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="text-2xl">👥</div>
                            <h2 className="text-xl font-semibold">User Management</h2>
                        </div>
                        <p className="text-muted-foreground mb-4">
                            View and manage all user accounts, roles, and permissions.
                        </p>
                        <Button className="w-full">
                            Manage Users
                        </Button>
                    </div>

                    <div className="rounded-xl border bg-card p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="text-2xl">🗝️</div>
                            <h2 className="text-xl font-semibold">Authorization Codes</h2>
                        </div>
                        <p className="text-muted-foreground mb-4">
                            Generate new authorization codes for developer access.
                        </p>
                        <Button className="w-full" variant="outline">
                            Generate Codes
                        </Button>
                    </div>

                    <div className="rounded-xl border bg-card p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="text-2xl">📊</div>
                            <h2 className="text-xl font-semibold">System Stats</h2>
                        </div>
                        <p className="text-muted-foreground mb-4">
                            View platform usage statistics and analytics.
                        </p>
                        <Button className="w-full" variant="outline">
                            View Analytics
                        </Button>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
import { DashboardStats } from '@/components/dashboard-stats';
import { ServerGrid } from '@/components/server-grid';
import { ServicesOverview } from '@/components/services-overview';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { RefreshCw, Settings } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

interface ServerData {
    id: number;
    name: string;
    ip_address: string;
    description: string;
    status: 'online' | 'offline';
    last_ping: string | null;
}

interface StatusUpdate {
    id: number;
    name: string;
    ip_address: string;
    is_online: boolean;
    checked_at: string;
}

export default function Dashboard() {
    const [servers, setServers] = useState<ServerData[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

    const fetchServers = useCallback(async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/servers');
            const data = await response.json();
            setServers(data);
            setLastUpdate(new Date());
        } catch (error) {
            console.error('Failed to fetch servers:', error);
        } finally {
            setLoading(false);
        }
    }, []);    const refreshStatus = useCallback(async () => {
        try {
            setRefreshing(true);
            const response = await fetch('/api/status/quick', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                    'Cache-Control': 'no-cache',
                    'Pragma': 'no-cache'
                },
            });

            if (response.ok) {
                const statusData: StatusUpdate[] = await response.json();

                // Update servers with new status data using functional update
                setServers(prevServers =>
                    prevServers.map(server => {
                        const statusUpdate = statusData.find((s: StatusUpdate) => s.id === server.id);
                        return statusUpdate ? {
                            ...server,
                            status: statusUpdate.is_online ? 'online' as const : 'offline' as const
                        } : server;
                    })
                );

                setLastUpdate(new Date());
                console.log('Status refreshed:', statusData);
            }
        } catch (error) {
            console.error('Failed to refresh status:', error);
        } finally {
            setRefreshing(false);
        }
    }, []); // No dependencies needed since we use functional updates

    useEffect(() => {
        const initializeDashboard = async () => {
            await fetchServers();
            // Small delay to ensure servers state is updated, then check status
            setTimeout(() => {
                refreshStatus();
            }, 500);
        };

        initializeDashboard();

        // Auto-refresh every 30 seconds
        const interval = setInterval(refreshStatus, 30000);
        return () => clearInterval(interval);
    }, [fetchServers, refreshStatus]);

    const onlineServers = servers.filter(server => server.status === 'online').length;
    const totalServers = servers.length;
    const uptimePercentage = totalServers > 0 ? (onlineServers / totalServers) * 100 : 0;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Homelab Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-6 p-4 md:p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">
                            Dashboard
                        </h1>
                        <p className="text-muted-foreground">
                            Monitor and manage homelab infrastructure
                        </p>
                    </div>
                    <div className="flex items-center space-x-2">
                        <p className="text-sm text-muted-foreground">
                            Last updated: {lastUpdate?.toLocaleTimeString() || 'Never'}
                        </p>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={refreshStatus}
                            disabled={loading || refreshing}
                        >
                            <RefreshCw className={`h-4 w-4 mr-2 ${(loading || refreshing) ? 'animate-spin' : ''}`} />
                            {refreshing ? 'Refreshing...' : 'Refresh'}
                        </Button>
                        <Button variant="outline" size="sm">
                            <Settings className="h-4 w-4 mr-2" />
                            Settings
                        </Button>
                    </div>
                </div>

                {/* Stats Overview */}
                <DashboardStats
                    totalServers={totalServers}
                    onlineServers={onlineServers}
                    uptimePercentage={uptimePercentage}
                />

                {/* Server Status Grid */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold">Server Status</h2>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <div className="flex items-center space-x-1">
                                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                                <span>{onlineServers} Online</span>
                            </div>
                            <div className="flex items-center space-x-1">
                                <div className="h-2 w-2 rounded-full bg-red-500"></div>
                                <span>{totalServers - onlineServers} Offline</span>
                            </div>
                        </div>
                    </div>
                    <ServerGrid servers={servers} isLoading={loading} />
                </div>

                {/* Services Overview */}
                <ServicesOverview />

                {/* Recent Activity */}
                <Card>
                    <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                        <CardDescription>
                            Latest events from your homelab
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex items-center space-x-4 text-sm">
                                <div className="flex h-2 w-2 rounded-full bg-green-500"></div>
                                <span className="flex-1">Proxmox VE Server came online</span>
                                <span className="text-muted-foreground">2 minutes ago</span>
                            </div>
                            <div className="flex items-center space-x-4 text-sm">
                                <div className="flex h-2 w-2 rounded-full bg-blue-500"></div>
                                <span className="flex-1">TrueNAS backup completed successfully</span>
                                <span className="text-muted-foreground">1 hour ago</span>
                            </div>
                            <div className="flex items-center space-x-4 text-sm">
                                <div className="flex h-2 w-2 rounded-full bg-yellow-500"></div>
                                <span className="flex-1">High CPU usage detected on Valheim Server</span>
                                <span className="text-muted-foreground">3 hours ago</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}

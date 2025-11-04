import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, Server, Shield, Database } from 'lucide-react';

interface StatsCardProps {
    title: string;
    value: string | number;
    description?: string;
    icon: React.ReactNode;
    trend?: {
        value: number;
        isPositive: boolean;
    };
}

function StatsCard({ title, value, description, icon, trend }: StatsCardProps) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
                {icon}
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
                {description && (
                    <p className="text-xs text-muted-foreground">{description}</p>
                )}
                {trend && (
                    <div className="flex items-center text-xs">
                        <span
                            className={
                                trend.isPositive ? 'text-green-600' : 'text-red-600'
                            }
                        >
                            {trend.isPositive ? '+' : ''}
                            {trend.value}%
                        </span>
                        <span className="text-muted-foreground ml-1">
                            from last hour
                        </span>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}

interface DashboardStatsProps {
    totalServers: number;
    onlineServers: number;
    uptimePercentage: number;
    lastUpdate?: string;
}

export function DashboardStats({
    totalServers,
    onlineServers,
    uptimePercentage,
    lastUpdate,
}: DashboardStatsProps) {
    const offlineServers = totalServers - onlineServers;

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <StatsCard
                title="Total Servers"
                value={totalServers}
                description="Active homelab devices"
                icon={<Server className="h-4 w-4 text-muted-foreground" />}
            />
            <StatsCard
                title="Online Servers"
                value={onlineServers}
                description={`${offlineServers} offline`}
                icon={<Activity className="h-4 w-4 text-green-600" />}
                trend={{
                    value: Math.round((onlineServers / totalServers) * 100),
                    isPositive: onlineServers > offlineServers,
                }}
            />
            <StatsCard
                title="Network Uptime"
                value={`${uptimePercentage.toFixed(1)}%`}
                description="Last 24 hours"
                icon={<Shield className="h-4 w-4 text-blue-600" />}
                trend={{
                    value: uptimePercentage > 95 ? 2.1 : -1.5,
                    isPositive: uptimePercentage > 95,
                }}
            />
            <StatsCard
                title="Services"
                value="12"
                description="Docker containers running"
                icon={<Database className="h-4 w-4 text-purple-600" />}
            />
        </div>
    );
}

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
    Cpu,
    MemoryStick,
    HardDrive,
    Thermometer,
    Zap,
    Network
} from 'lucide-react';

interface SystemMetrics {
    cpu: number;
    memory: {
        used: number;
        total: number;
    };
    disk: {
        used: number;
        total: number;
    };
    temperature: number;
    power: number;
    network: {
        upload: number;
        download: number;
    };
}

interface ServerMetricsProps {
    serverName: string;
    metrics: SystemMetrics;
    isOnline: boolean;
}

function formatBytes(bytes: number): string {
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return '0 B';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${Math.round(bytes / Math.pow(1024, i) * 100) / 100} ${sizes[i]}`;
}

function MetricCard({
    title,
    value,
    unit,
    percentage,
    icon,
    status
}: {
    title: string;
    value: string | number;
    unit?: string;
    percentage?: number;
    icon: React.ReactNode;
    status?: 'good' | 'warning' | 'critical';
}) {
    const getStatusColor = () => {
        switch (status) {
            case 'good': return 'text-green-600';
            case 'warning': return 'text-yellow-600';
            case 'critical': return 'text-red-600';
            default: return 'text-muted-foreground';
        }
    };

    return (
        <div className="flex items-center space-x-3 p-3 border rounded-lg">
            <div className={`${getStatusColor()}`}>
                {icon}
            </div>
            <div className="flex-1">
                <div className="text-sm font-medium">{title}</div>
                <div className="text-lg font-bold">
                    {value}{unit && <span className="text-sm font-normal ml-1">{unit}</span>}
                </div>
                {percentage !== undefined && (
                    <div className="w-full bg-muted rounded-full h-1.5 mt-1">
                        <div
                            className={`h-1.5 rounded-full ${
                                percentage > 90 ? 'bg-red-500' :
                                percentage > 70 ? 'bg-yellow-500' : 'bg-green-500'
                            }`}
                            style={{ width: `${Math.min(percentage, 100)}%` }}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

export function ServerMetrics({ serverName, metrics, isOnline }: ServerMetricsProps) {
    if (!isOnline) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                        {serverName} Metrics
                        <Badge variant="destructive">Offline</Badge>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground text-center py-8">
                        Server metrics unavailable - server is offline
                    </p>
                </CardContent>
            </Card>
        );
    }

    const cpuStatus = metrics.cpu > 90 ? 'critical' : metrics.cpu > 70 ? 'warning' : 'good';
    const memoryPercentage = (metrics.memory.used / metrics.memory.total) * 100;
    const memoryStatus = memoryPercentage > 90 ? 'critical' : memoryPercentage > 70 ? 'warning' : 'good';
    const diskPercentage = (metrics.disk.used / metrics.disk.total) * 100;
    const diskStatus = diskPercentage > 90 ? 'critical' : diskPercentage > 70 ? 'warning' : 'good';
    const tempStatus = metrics.temperature > 80 ? 'critical' : metrics.temperature > 70 ? 'warning' : 'good';

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center justify-between">
                    {serverName} Metrics
                    <Badge variant="default">Online</Badge>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                    <MetricCard
                        title="CPU Usage"
                        value={metrics.cpu}
                        unit="%"
                        percentage={metrics.cpu}
                        icon={<Cpu className="h-4 w-4" />}
                        status={cpuStatus}
                    />
                    <MetricCard
                        title="Memory"
                        value={`${formatBytes(metrics.memory.used)} / ${formatBytes(metrics.memory.total)}`}
                        percentage={memoryPercentage}
                        icon={<MemoryStick className="h-4 w-4" />}
                        status={memoryStatus}
                    />
                    <MetricCard
                        title="Disk Usage"
                        value={`${formatBytes(metrics.disk.used)} / ${formatBytes(metrics.disk.total)}`}
                        percentage={diskPercentage}
                        icon={<HardDrive className="h-4 w-4" />}
                        status={diskStatus}
                    />
                    <MetricCard
                        title="Temperature"
                        value={metrics.temperature}
                        unit="°C"
                        icon={<Thermometer className="h-4 w-4" />}
                        status={tempStatus}
                    />
                    <MetricCard
                        title="Power Draw"
                        value={metrics.power}
                        unit="W"
                        icon={<Zap className="h-4 w-4" />}
                        status="good"
                    />
                    <MetricCard
                        title="Network I/O"
                        value={`↑${formatBytes(metrics.network.upload)} ↓${formatBytes(metrics.network.download)}`}
                        icon={<Network className="h-4 w-4" />}
                        status="good"
                    />
                </div>
            </CardContent>
        </Card>
    );
}

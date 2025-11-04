import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Play,
    Square,
    RotateCcw,
    ExternalLink,
    Container,
    Database,
    Globe,
    Shield
} from 'lucide-react';

interface Service {
    id: string;
    name: string;
    type: 'docker' | 'systemd' | 'web' | 'database';
    status: 'running' | 'stopped' | 'error' | 'starting';
    description: string;
    port?: number;
    url?: string;
    cpu?: number;
    memory?: string;
    uptime?: string;
}

interface ServiceItemProps {
    service: Service;
    onStart?: () => void;
    onStop?: () => void;
    onRestart?: () => void;
}

function getServiceIcon(type: Service['type']) {
    switch (type) {
        case 'docker': return <Container className="h-4 w-4" />;
        case 'database': return <Database className="h-4 w-4" />;
        case 'web': return <Globe className="h-4 w-4" />;
        case 'systemd': return <Shield className="h-4 w-4" />;
        default: return <Container className="h-4 w-4" />;
    }
}

function getStatusBadge(status: Service['status']) {
    switch (status) {
        case 'running':
            return <Badge variant="default" className="bg-green-600">Running</Badge>;
        case 'stopped':
            return <Badge variant="secondary">Stopped</Badge>;
        case 'error':
            return <Badge variant="destructive">Error</Badge>;
        case 'starting':
            return <Badge variant="outline">Starting...</Badge>;
        default:
            return <Badge variant="secondary">Unknown</Badge>;
    }
}

function ServiceItem({ service, onStart, onStop, onRestart }: ServiceItemProps) {
    return (
        <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center space-x-3">
                <div className="text-muted-foreground">
                    {getServiceIcon(service.type)}
                </div>
                <div className="flex-1">
                    <div className="flex items-center space-x-2">
                        <h4 className="font-medium">{service.name}</h4>
                        {getStatusBadge(service.status)}
                        {service.port && (
                            <Badge variant="outline" className="text-xs">
                                :{service.port}
                            </Badge>
                        )}
                    </div>
                    <p className="text-sm text-muted-foreground">{service.description}</p>
                    {service.cpu && service.memory && (
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground mt-1">
                            <span>CPU: {service.cpu}%</span>
                            <span>Memory: {service.memory}</span>
                            {service.uptime && <span>Uptime: {service.uptime}</span>}
                        </div>
                    )}
                </div>
            </div>
            <div className="flex items-center space-x-2">
                {service.url && (
                    <Button variant="outline" size="sm" asChild>
                        <a href={service.url} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-3 w-3" />
                        </a>
                    </Button>
                )}
                {service.status === 'stopped' && onStart && (
                    <Button variant="outline" size="sm" onClick={onStart}>
                        <Play className="h-3 w-3" />
                    </Button>
                )}
                {service.status === 'running' && onStop && (
                    <Button variant="outline" size="sm" onClick={onStop}>
                        <Square className="h-3 w-3" />
                    </Button>
                )}
                {onRestart && (
                    <Button variant="outline" size="sm" onClick={onRestart}>
                        <RotateCcw className="h-3 w-3" />
                    </Button>
                )}
            </div>
        </div>
    );
}

interface ServicesOverviewProps {
    services?: Service[];
}

export function ServicesOverview({ services = [] }: ServicesOverviewProps) {
    // Mock data for demonstration
    const mockServices: Service[] = [
        {
            id: 'portainer',
            name: 'Portainer',
            type: 'docker',
            status: 'running',
            description: 'Docker container management',
            port: 9000,
            url: 'http://192.168.1.104:9000',
            cpu: 2,
            memory: '45MB',
            uptime: '15d 3h'
        },
        {
            id: 'plex',
            name: 'Plex Media Server',
            type: 'docker',
            status: 'running',
            description: 'Media streaming server',
            port: 32400,
            url: 'http://192.168.1.104:32400',
            cpu: 8,
            memory: '512MB',
            uptime: '12d 8h'
        },
        {
            id: 'nextcloud',
            name: 'Nextcloud',
            type: 'docker',
            status: 'running',
            description: 'Personal cloud storage',
            port: 8080,
            url: 'http://192.168.1.104:8080',
            cpu: 3,
            memory: '256MB',
            uptime: '8d 12h'
        },
        {
            id: 'minecraft',
            name: 'Valheim Server',
            type: 'systemd',
            status: 'running',
            description: 'Valheim game server',
            port: 2456,
            cpu: 15,
            memory: '2.1GB',
            uptime: '3d 6h'
        },
        {
            id: 'grafana',
            name: 'Grafana',
            type: 'docker',
            status: 'stopped',
            description: 'Monitoring dashboard',
            port: 3000
        },
        {
            id: 'prometheus',
            name: 'Prometheus',
            type: 'docker',
            status: 'error',
            description: 'Metrics collection',
            port: 9090
        }
    ];

    const displayServices = services.length > 0 ? services : mockServices;
    const runningCount = displayServices.filter(s => s.status === 'running').length;
    const stoppedCount = displayServices.filter(s => s.status === 'stopped').length;
    const errorCount = displayServices.filter(s => s.status === 'error').length;

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle>Services Overview</CardTitle>
                    <div className="flex items-center space-x-4 text-sm">
                        <div className="flex items-center space-x-1">
                            <div className="h-2 w-2 rounded-full bg-green-500"></div>
                            <span>{runningCount} Running</span>
                        </div>
                        <div className="flex items-center space-x-1">
                            <div className="h-2 w-2 rounded-full bg-gray-500"></div>
                            <span>{stoppedCount} Stopped</span>
                        </div>
                        {errorCount > 0 && (
                            <div className="flex items-center space-x-1">
                                <div className="h-2 w-2 rounded-full bg-red-500"></div>
                                <span>{errorCount} Error</span>
                            </div>
                        )}
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-3">
                    {displayServices.map((service) => (
                        <ServiceItem
                            key={service.id}
                            service={service}
                            onStart={() => console.log(`Starting ${service.name}`)}
                            onStop={() => console.log(`Stopping ${service.name}`)}
                            onRestart={() => console.log(`Restarting ${service.name}`)}
                        />
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}

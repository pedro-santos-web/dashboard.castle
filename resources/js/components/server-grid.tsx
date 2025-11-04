import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Server, Wifi, WifiOff } from 'lucide-react';

interface ServerData {
    id: number;
    name: string;
    ip_address: string;
    description: string;
    status: 'online' | 'offline';
    last_ping: string | null;
}

interface ServerCardProps {
    server: ServerData;
}

export function ServerCard({ server }: ServerCardProps) {
    const isOnline = server.status === 'online';

    return (
        <Card className="relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                    {server.name}
                </CardTitle>
                <div className="flex items-center space-x-2">
                    {isOnline ? (
                        <Wifi className="h-4 w-4 text-green-600" />
                    ) : (
                        <WifiOff className="h-4 w-4 text-red-600" />
                    )}
                    <Badge variant={isOnline ? 'default' : 'destructive'}>
                        {server.status}
                    </Badge>
                </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                        <Server className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                            {server.ip_address}
                        </span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                        {server.description}
                    </p>
                    {server.last_ping && (
                        <p className="text-xs text-muted-foreground">
                            Last seen: {new Date(server.last_ping).toLocaleString()}
                        </p>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}

interface ServerGridProps {
    servers: ServerData[];
    isLoading?: boolean;
}

export function ServerGrid({ servers, isLoading }: ServerGridProps) {
    if (isLoading) {
        return (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {[...Array(4)].map((_, i) => (
                    <Card key={i} className="animate-pulse">
                        <CardHeader>
                            <div className="h-4 bg-muted rounded w-3/4"></div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                <div className="h-3 bg-muted rounded w-1/2"></div>
                                <div className="h-3 bg-muted rounded w-full"></div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        );
    }

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {servers.map((server) => (
                <ServerCard key={server.id} server={server} />
            ))}
        </div>
    );
}

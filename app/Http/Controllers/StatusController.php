<?php

namespace App\Http\Controllers;

use App\Models\Server;
use Illuminate\Support\Facades\Log;

class StatusController extends Controller
{
    public function index()
    {
        $servers = Server::all();

        foreach ($servers as $server) {
            $isOnline = $this->pingServer($server->ip_address);

            Log::info("Ping result for {$server->name} ({$server->ip_address}): " . ($isOnline ? 'ONLINE' : 'OFFLINE'));

            $server->update([
                'is_online' => $isOnline,
                'last_checked' => now()
            ]);
        }

        // Return fresh data without caching
        return response()->json($servers->fresh(), 200, [
            'Cache-Control' => 'no-cache, no-store, must-revalidate',
            'Pragma' => 'no-cache',
            'Expires' => '0'
        ]);
    }

    private function pingServer($ipAddress)
    {
        // For Windows - more reliable ping check
        $command = "ping -n 1 -w 1000 " . escapeshellarg($ipAddress);
        $output = [];
        $returnVar = 0;

        exec($command, $output, $returnVar);

        // Check if ping was successful (return code 0)
        // Also check output for "TTL=" which indicates successful ping
        $success = ($returnVar === 0);
        if ($success) {
            $outputString = implode(' ', $output);
            $success = strpos($outputString, 'TTL=') !== false;
        }

        Log::debug("Ping {$ipAddress}: Command: {$command}, Return: {$returnVar}, Success: " . ($success ? 'true' : 'false'));

        return $success;
    }

    public function quick()
    {
        $servers = Server::all();
        $results = [];

        foreach ($servers as $server) {
            $isOnline = $this->pingServer($server->ip_address);

            Log::info("Quick ping result for {$server->name} ({$server->ip_address}): " . ($isOnline ? 'ONLINE' : 'OFFLINE'));

            $results[] = [
                'id' => $server->id,
                'name' => $server->name,
                'ip_address' => $server->ip_address,
                'is_online' => $isOnline,
                'checked_at' => now()
            ];
        }

        return response()->json($results, 200, [
            'Cache-Control' => 'no-cache, no-store, must-revalidate',
            'Pragma' => 'no-cache',
            'Expires' => '0'
        ]);
    }
}

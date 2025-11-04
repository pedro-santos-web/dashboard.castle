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
            // Ping command (Linux/macOS version)
            // $ping = exec("ping -c 1 -W 1 " . escapeshellarg($server->ip_address) . " > /dev/null 2>&1 && echo 1 || echo 0");
            // For Windows, use the following line instead:
            $ping = exec("ping -n 1 " . escapeshellarg($server->ip_address) . " >NUL 2>&1 && echo 1 || echo 0");

            $server->status = $ping == 1 ? 'online' : 'offline';
            $server->last_ping = now();
            $server->save();
        }

        return response()->json($servers);
    }
}

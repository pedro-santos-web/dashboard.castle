<?php

namespace App\Http\Controllers;

use App\Models\Server;
use Illuminate\Http\Request;

class ServerController extends Controller
{
    public function index()
    {
        // Always return fresh data - optionally refresh status
        $servers = Server::all();

        // Add cache headers to prevent stale data
        return response()->json($servers)
            ->header('Cache-Control', 'no-cache, no-store, must-revalidate')
            ->header('Pragma', 'no-cache')
            ->header('Expires', '0');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:100',
            'ip_address' => 'required|ip',
            'description' => 'nullable|string',
        ]);

        $server = Server::create($validated);
        return response()->json($server, 201);
    }

    public function show(Server $server)
    {
        return response()->json($server);
    }

    public function update(Request $request, Server $server)
    {
        $validated = $request->validate([
            'name' => 'sometimes|string|max:100',
            'ip_address' => 'sometimes|ip',
            'description' => 'nullable|string',
            'status' => 'in:online,offline',
        ]);

        $server->update($validated);
        return response()->json($server);
    }

    public function destroy(Server $server)
    {
        $server->delete();
        return response()->json(['message' => 'Server deleted']);
    }
}

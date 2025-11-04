<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\Server;

class DashboardController extends Controller
{
    /**
     * Display the dashboard.
     */
    public function index()
    {
        $servers = Server::select(['id', 'name', 'ip_address', 'status', 'last_ping'])
            ->get();

        return Inertia::render('dashboard', compact('servers'));
    }
}

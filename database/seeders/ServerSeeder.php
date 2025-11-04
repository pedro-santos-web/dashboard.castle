<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Server;

class ServerSeeder extends Seeder
{
    public function run(): void
    {
        $servers = config('app.servers');

        Server::insert(array_map(function ($server) {
            return [
                'ip_address' => $server[0],
                'name' => $server[1],
                'description' => $server[2],
                'created_at' => now(),
            ];
        }, $servers));
    }
}

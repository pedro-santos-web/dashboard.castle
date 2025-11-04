<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::firstOrCreate(
            ['email' => 'pedrohmsantos1999@outlook.com'],
            [
                'name' => 'root',
                'password' => '123456789',
                'email_verified_at' => now(),
            ]
        );

        // User::factory(10)->create();
    }
}

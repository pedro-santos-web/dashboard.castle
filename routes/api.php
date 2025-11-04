<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ServerController;
use App\Http\Controllers\StatusController;

Route::get('/status', [StatusController::class, 'index']);
Route::get('/status/quick', [StatusController::class, 'quick']);
Route::apiResource('servers', ServerController::class);

// Debug route for testing ping
Route::get('/debug/ping/{ip}', function($ip) {
    $controller = new StatusController();

    // Test raw ping command
    $command = "ping -n 1 -w 1000 " . escapeshellarg($ip);
    $output = [];
    $returnVar = 0;
    exec($command, $output, $returnVar);

    $outputString = implode(' ', $output);
    $hasTTL = strpos($outputString, 'TTL=') !== false;

    return response()->json([
        'ip' => $ip,
        'command' => $command,
        'return_code' => $returnVar,
        'output' => $output,
        'has_ttl' => $hasTTL,
        'success' => ($returnVar === 0) && $hasTTL,
        'timestamp' => now()
    ]);
});

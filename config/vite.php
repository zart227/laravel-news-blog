<?php

return [
    'configs' => [
        'default' => [
            'dev_server' => [
                'enabled' => true,
                'url' => env('VITE_DEV_SERVER_URL', 'http://127.0.0.1:5173'),
                'host' => env('VITE_HOST', '0.0.0.0'),
                'port' => env('VITE_PORT', 5173),
            ],
            'build_path' => 'build',
            'hmr' => [
                'host' => '127.0.0.1',
            ],
        ],
    ],
]; 
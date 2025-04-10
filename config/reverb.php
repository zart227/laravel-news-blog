<?php

return [
    'host' => env('REVERB_HOST', '127.0.0.1'),
    'port' => env('REVERB_PORT', 6001),
    'scheme' => env('REVERB_SCHEME', 'http'),
    
    'apps' => [
        [
            'id' => env('REVERB_APP_ID', 'my-app-id'),
            'key' => env('REVERB_APP_KEY', 'my-app-key'),
            'secret' => env('REVERB_APP_SECRET', 'my-app-secret'),
        ],
    ],
]; 
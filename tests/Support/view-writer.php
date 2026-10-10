<?php

require __DIR__.'/../../vendor/autoload.php';
$app = require __DIR__.'/../../bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();
config(['database.connections.mongodb.database' => $argv[1], 'cache.default' => 'array']);
Illuminate\Support\Facades\Event::fake([App\Events\StatisticsUpdated::class]);
$article = (new App\Models\Article)->forceFill(['id' => (int) $argv[2]]);
$request = Illuminate\Http\Request::create('/', 'GET', [], [], [], [
    'REMOTE_ADDR' => '192.0.2.50', 'HTTP_USER_AGENT' => 'Firefox/125.0',
    'HTTP_REFERER' => 'https://concurrent.example.org/path',
]);
$tracker = new App\Services\ViewTracker;
for ($i = 0; $i < 10; $i++) {
    $tracker->track($article, $request);
}

<?php

namespace Tests\Support;

use Illuminate\Support\Facades\DB;

trait UsesMongo
{
    private bool $mongoReady = false;

    protected function prepareMongo(): void
    {
        config(['database.connections.mongodb.database' => 'news_blog_test_'.getmypid(),
            'database.connections.mongodb.options.serverSelectionTimeoutMS' => 500]);
        DB::purge('mongodb');
        try {
            DB::connection('mongodb')->getMongoDB()->command(['ping' => 1]);
        } catch (\MongoDB\Driver\Exception\ConnectionException $e) {
            $this->markTestSkipped('MongoDB is unavailable: '.$e->getMessage());
        }
        DB::connection('mongodb')->getMongoDB()->drop();
        $this->mongoReady = true;
        $this->artisan('statistics:index')->assertExitCode(0);
    }

    protected function tearDown(): void
    {
        if ($this->mongoReady) {
            DB::connection('mongodb')->getMongoDB()->drop();
            DB::purge('mongodb');
        }
        parent::tearDown();
    }
}

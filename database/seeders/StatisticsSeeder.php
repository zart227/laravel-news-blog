<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Artisan;

class StatisticsSeeder extends Seeder
{
    public function run(): void
    {
        // ViewTracker already builds aggregates. Never copy SQL content into MongoDB.
        Artisan::call('statistics:index');
    }
}

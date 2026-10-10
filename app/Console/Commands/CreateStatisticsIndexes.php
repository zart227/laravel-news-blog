<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class CreateStatisticsIndexes extends Command
{
    protected $signature = 'statistics:index';

    protected $description = 'Create the indexes used by MongoDB view tracking and reports';

    public function handle(): int
    {
        $db = DB::connection('mongodb');
        $db->getCollection('article_view_events')->createIndex(['article_id' => 1, 'viewed_at' => 1]);
        $db->getCollection('article_view_events')->createIndex(['viewed_at' => 1]);
        $collection = $db->getCollection('statistics');
        $collection->createIndex(['article_id' => 1], ['unique' => true]);
        // Normalize legacy maps atomically before ViewTracker writes array buckets.
        $fields = [];
        foreach (['user_agents', 'referrers'] as $field) {
            $fields[$field] = ['$cond' => [
                ['$isArray' => '$'.$field], '$'.$field,
                ['$map' => [
                    'input' => ['$objectToArray' => ['$ifNull' => ['$'.$field, new \stdClass]]],
                    'as' => 'entry', 'in' => ['name' => '$$entry.k', 'count' => '$$entry.v'],
                ]],
            ]];
        }
        $collection->updateMany([], [['$set' => $fields]]);
        $this->info('Statistics indexes created.');

        return self::SUCCESS;
    }
}

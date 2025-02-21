<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('article_views', function (Blueprint $table) {
            $table->index(['article_id', 'viewed_at']);
            $table->index('ip_address');
        });

        Schema::table('comments', function (Blueprint $table) {
            $table->index(['article_id', 'created_at']);
        });
    }

    public function down(): void
    {
        Schema::table('article_views', function (Blueprint $table) {
            $table->dropIndex(['article_id', 'viewed_at']);
            $table->dropIndex(['ip_address']);
        });

        Schema::table('comments', function (Blueprint $table) {
            $table->dropIndex(['article_id', 'created_at']);
        });
    }
}; 
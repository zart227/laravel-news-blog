<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Проверяем наличие необходимых полей и индексов в таблице article_views
        Schema::table('article_views', function (Blueprint $table) {
            // Если таблице не хватает каких-то полей, добавляем их
            if (!Schema::hasColumn('article_views', 'user_id')) {
                $table->unsignedBigInteger('user_id')->nullable()->after('article_id');
                $table->foreign('user_id')->references('id')->on('users')->onDelete('set null');
            }

            if (!Schema::hasColumn('article_views', 'ip_address')) {
                $table->string('ip_address', 45)->nullable()->after('user_id');
            }

            // Проверяем наличие индекса
            if (!Schema::hasIndex('article_views', ['article_id', 'user_id', 'created_at'])) {
                $table->index(['article_id', 'user_id', 'created_at']);
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Не удаляем таблицу, а только добавленные индексы
        Schema::table('article_views', function (Blueprint $table) {
            $table->dropIndex(['article_id', 'user_id', 'created_at']);
        });
    }
};

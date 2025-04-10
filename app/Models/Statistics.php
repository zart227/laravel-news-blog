<?php

namespace App\Models;

use MongoDB\Laravel\Eloquent\Model;

class Statistics extends Model
{
    protected $connection = 'mongodb';
    protected $collection = 'statistics';

    protected $fillable = [
        'article_id',
        'views',
        'unique_views',
        'likes',
        'comments_count',
        'shares',
        'created_at',
        'updated_at'
    ];

    protected $casts = [
        'views' => 'integer',
        'unique_views' => 'integer',
        'likes' => 'integer',
        'comments_count' => 'integer',
        'shares' => 'integer',
        'created_at' => 'datetime',
        'updated_at' => 'datetime'
    ];

    public function article()
    {
        return $this->belongsTo(Article::class);
    }
} 
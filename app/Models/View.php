<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class View extends Model
{
    protected $fillable = [
        'viewable_id',
        'viewable_type',
        'user_id',
        'ip_address',
        'user_agent'
    ];

    /**
     * Получить связанную модель, которая была просмотрена
     */
    public function viewable(): MorphTo
    {
        return $this->morphTo();
    }

    /**
     * Получить пользователя, который просмотрел элемент
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}

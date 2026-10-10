<?php

namespace App\Enums;

enum UserRole: string
{
    case ADMIN = 'admin';
    case USER = 'user';
    
    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }

    public function label(): string
    {
        return match($this) {
            self::ADMIN => 'Администратор',
            self::USER => 'Пользователь',
        };
    }

    public function permissions(): array
    {
        return match($this) {
            self::ADMIN => [
                'articles.*',
                'users.*',
                'tags.*',
                'statistics.*',
            ],
            self::USER => [
                'articles.view',
                'articles.comment',
            ],
        };
    }
} 
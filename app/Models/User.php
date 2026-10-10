<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Enums\UserRole;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
        'role' => UserRole::class,
    ];

    public function articles()
    {
        return $this->hasMany(Article::class);
    }

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

    public function isAdmin(): bool
    {
        return $this->role === UserRole::ADMIN;
    }

    public function hasPermission(string $permission): bool
    {
        if (!$this->role) {
            return false;
        }
        return in_array($permission, $this->role->permissions());
    }

    private function hasWildcardPermission(string $permission): bool
    {
        if (!$this->role) {
            return false;
        }
        $permissionParts = explode('.', rtrim($permission, '.*'));
        $userPermissions = $this->role->permissions();

        foreach ($userPermissions as $userPermission) {
            $userParts = explode('.', $userPermission);
            if (count($permissionParts) <= count($userParts)) {
                $relevantParts = array_slice($userParts, 0, count($permissionParts));
                if ($permissionParts === $relevantParts) {
                    return true;
                }
            }
        }

        return false;
    }
}

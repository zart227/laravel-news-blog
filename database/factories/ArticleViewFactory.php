<?php

namespace Database\Factories;

use App\Models\Article;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ArticleView>
 */
class ArticleViewFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'article_id' => Article::factory(),
            'user_id' => fake()->boolean(70) ? User::factory() : null,
            'ip_address' => fake()->ipv4(),
            'viewed_at' => fake()->dateTimeBetween('-1 year'),
        ];
    }

    public function anonymous(): self
    {
        return $this->state(fn (array $attributes) => [
            'user_id' => null,
        ]);
    }

    public function authenticated(): self
    {
        return $this->state(fn (array $attributes) => [
            'user_id' => User::factory(),
        ]);
    }
}

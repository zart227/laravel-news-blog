<?php

namespace Database\Factories;

use App\Models\Article;
use App\Models\Comment;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Comment>
 */
class CommentFactory extends Factory
{
    protected $model = Comment::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'content' => $this->faker->paragraph(),
            'user_id' => User::factory(),
            'article_id' => Article::factory(),
            'parent_id' => null,
            'created_at' => $this->faker->dateTimeBetween('-6 months'),
            'updated_at' => function (array $attributes) {
                return $this->faker->dateTimeBetween($attributes['created_at']);
            },
        ];
    }

    public function forArticle(Article $article): self
    {
        return $this->state(function (array $attributes) use ($article) {
            return [
                'article_id' => $article->id,
        ];
        });
    }

    public function asReply(Comment $parent): self
    {
        return $this->state(function (array $attributes) use ($parent) {
            return [
                'parent_id' => $parent->id,
                'article_id' => $parent->article_id,
                'created_at' => $this->faker->dateTimeBetween($parent->created_at),
            ];
        });
    }
}


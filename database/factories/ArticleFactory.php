<?php

namespace Database\Factories;

use App\Models\Article;
use App\Models\User;
use App\Services\ImageService;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use App\Models\Tag;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Article>
 */
class ArticleFactory extends Factory
{
    protected $model = Article::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $title = $this->faker->sentence();
        
        return [
            'title' => $title,
            'content' => $this->faker->paragraphs(5, true),
            'image_path' => app(ImageService::class)->getRandomImage(),
            'status' => $this->faker->randomElement(['draft', 'published']),
            'user_id' => User::factory(),
            'slug' => Str::slug($title),
        ];
    }

    public function configure()
    {
        return $this->afterCreating(function (Article $article) {
            // Получаем случайное количество тегов (от 1 до 3)
            $tagCount = rand(1, 3);
            
            // Получаем все доступные теги
            $tags = Tag::inRandomOrder()->limit($tagCount)->get();
            
            // Если теги есть, привязываем их к статье
            if ($tags->isNotEmpty()) {
                $article->tags()->attach($tags->pluck('id'));
            }
        });
    }

    public function published(): self
    {
        return $this->state(function (array $attributes) {
            return [
                'status' => 'published',
            ];
        });
    }

    public function draft(): self
    {
        return $this->state(function (array $attributes) {
            return [
                'status' => 'draft',
            ];
        });
    }
}

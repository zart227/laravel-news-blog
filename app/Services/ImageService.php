<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ImageService
{
    private const IMAGE_CATEGORIES = [
        'technology', 'nature', 'business', 'office', 'coding'
    ];

    private const BACKGROUND_COLOR = '3b82f6'; // голубой цвет (blue-500 из Tailwind)
    private const TEXT_COLOR = 'ffffff'; // белый цвет
    private const IMAGE_WIDTH = 1200;
    private const IMAGE_HEIGHT = 675; // 16:9 ratio

    public function getRandomImage(): string
    {
        $category = $this->getRandomCategory();
        $filename = sprintf('articles/%s.jpg', Str::uuid());
        
        // Генерируем URL для placehold.co с указанными цветами
        $imageUrl = sprintf(
            'https://placehold.co/%dx%d/%s/%s.jpg?text=%s',
            self::IMAGE_WIDTH,
            self::IMAGE_HEIGHT,
            self::BACKGROUND_COLOR,
            self::TEXT_COLOR,
            urlencode($category)
        );

        try {
            $imageContent = Http::get($imageUrl)->body();
            Storage::disk('public')->put($filename, $imageContent);
            return $filename;
        } catch (\Exception $e) {
            \Log::error('Error downloading image: ' . $e->getMessage());
            return $this->getFallbackImage();
        }
    }

    private function getFallbackImage(): string
    {
        $filename = sprintf('articles/%s.jpg', Str::uuid());
        $fallbackUrl = sprintf(
            'https://placehold.co/%dx%d/%s/%s.jpg?text=%s',
            self::IMAGE_WIDTH,
            self::IMAGE_HEIGHT,
            self::BACKGROUND_COLOR,
            self::TEXT_COLOR,
            urlencode('Article Image')
        );
        
        try {
            $imageContent = Http::get($fallbackUrl)->body();
            Storage::disk('public')->put($filename, $imageContent);
            return $filename;
        } catch (\Exception $e) {
            \Log::error('Error downloading fallback image: ' . $e->getMessage());
            throw new \RuntimeException('Could not generate image');
        }
    }

    private function getRandomCategory(): string
    {
        return self::IMAGE_CATEGORIES[array_rand(self::IMAGE_CATEGORIES)];
    }
} 
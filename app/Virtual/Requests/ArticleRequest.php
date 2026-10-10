<?php

namespace App\Virtual\Requests;

/**
 * @OA\Schema(
 *     title="Article Request",
 *     description="Запрос на создание/обновление статьи",
 *     type="object",
 *     required={"title", "content"}
 * )
 */
class ArticleRequest
{
    /**
     * @OA\Property(
     *     title="Title",
     *     description="Заголовок статьи",
     *     example="Введение в Laravel"
     * )
     *
     * @var string
     */
    public $title;

    /**
     * @OA\Property(
     *     title="Content",
     *     description="Содержание статьи",
     *     example="Полное содержание статьи..."
     * )
     *
     * @var string
     */
    public $content;

    /**
     * @OA\Property(
     *     title="Image",
     *     description="Изображение статьи",
     *     type="string",
     *     format="binary"
     * )
     *
     * @var string
     */
    public $image;

    /**
     * @OA\Property(
     *     title="Status",
     *     description="Статус статьи",
     *     enum={"draft", "published"},
     *     example="draft"
     * )
     *
     * @var string
     */
    public $status;

    /**
     * @OA\Property(
     *     title="Tags",
     *     description="ID тегов",
     *     type="array",
     *     @OA\Items(type="integer"),
     *     example={1, 2, 3}
     * )
     *
     * @var array
     */
    public $tags;
} 
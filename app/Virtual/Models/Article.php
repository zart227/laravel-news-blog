<?php

namespace App\Virtual\Models;

/**
 * @OA\Schema(
 *     title="Article",
 *     description="Модель статьи",
 *     @OA\Xml(name="Article")
 * )
 */
class Article
{
    /**
     * @OA\Property(
     *     title="ID",
     *     description="ID статьи",
     *     format="int64",
     *     example=1
     * )
     *
     * @var integer
     */
    private $id;

    /**
     * @OA\Property(
     *     title="Title",
     *     description="Заголовок статьи",
     *     example="Введение в Laravel"
     * )
     *
     * @var string
     */
    private $title;

    /**
     * @OA\Property(
     *     title="Content",
     *     description="Содержание статьи",
     *     example="Полное содержание статьи..."
     * )
     *
     * @var string
     */
    private $content;

    /**
     * @OA\Property(
     *     title="Image Path",
     *     description="Путь к изображению статьи",
     *     example="articles/image.jpg"
     * )
     *
     * @var string
     */
    private $image_path;

    /**
     * @OA\Property(
     *     title="Status",
     *     description="Статус статьи",
     *     enum={"draft", "published"},
     *     example="published"
     * )
     *
     * @var string
     */
    private $status;

    /**
     * @OA\Property(
     *     title="Author ID",
     *     description="ID автора статьи",
     *     format="int64",
     *     example=1
     * )
     *
     * @var integer
     */
    private $user_id;

    /**
     * @OA\Property(
     *     title="Created at",
     *     description="Дата создания",
     *     example="2024-01-01 12:00:00",
     *     format="datetime",
     *     type="string"
     * )
     *
     * @var \DateTime
     */
    private $created_at;

    /**
     * @OA\Property(
     *     title="Updated at",
     *     description="Дата обновления",
     *     example="2024-01-01 12:00:00",
     *     format="datetime",
     *     type="string"
     * )
     *
     * @var \DateTime
     */
    private $updated_at;

    /**
     * @OA\Property(
     *     title="Author",
     *     description="Автор статьи"
     * )
     *
     * @var \App\Virtual\Models\User
     */
    private $user;

    /**
     * @OA\Property(
     *     title="Tags",
     *     description="Теги статьи",
     *     type="array",
     *     @OA\Items(ref="#/components/schemas/Tag")
     * )
     *
     * @var array
     */
    private $tags;
} 
<?php

namespace App\Virtual\Models;

/**
 * @OA\Schema(
 *     title="Tag",
 *     description="Модель тега",
 *     @OA\Xml(name="Tag")
 * )
 */
class Tag
{
    /**
     * @OA\Property(
     *     title="ID",
     *     description="ID тега",
     *     format="int64",
     *     example=1
     * )
     *
     * @var integer
     */
    private $id;

    /**
     * @OA\Property(
     *     title="Name",
     *     description="Название тега",
     *     example="Laravel"
     * )
     *
     * @var string
     */
    private $name;

    /**
     * @OA\Property(
     *     title="Slug",
     *     description="URL-friendly версия названия",
     *     example="laravel"
     * )
     *
     * @var string
     */
    private $slug;

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
} 
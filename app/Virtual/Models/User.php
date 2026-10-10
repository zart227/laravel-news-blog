<?php

namespace App\Virtual\Models;

/**
 * @OA\Schema(
 *     title="User",
 *     description="Модель пользователя",
 *     @OA\Xml(name="User")
 * )
 */
class User
{
    /**
     * @OA\Property(
     *     title="ID",
     *     description="ID пользователя",
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
     *     description="Имя пользователя",
     *     example="John Doe"
     * )
     *
     * @var string
     */
    private $name;

    /**
     * @OA\Property(
     *     title="Email",
     *     description="Email пользователя",
     *     format="email",
     *     example="user@example.com"
     * )
     *
     * @var string
     */
    private $email;

    /**
     * @OA\Property(
     *     title="Role",
     *     description="Роль пользователя",
     *     enum={"user", "admin"},
     *     example="user"
     * )
     *
     * @var string
     */
    private $role;

    /**
     * @OA\Property(
     *     title="Email Verified At",
     *     description="Дата верификации email",
     *     format="datetime",
     *     example="2024-01-01 12:00:00",
     *     nullable=true
     * )
     *
     * @var \DateTime
     */
    private $email_verified_at;

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
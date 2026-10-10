<?php

namespace App\Virtual;

/**
 * @OA\Info(
 *     version="1.0.0",
 *     title="Laravel News Blog API Documentation",
 *     description="API документация для новостного блога на Laravel",
 *     @OA\Contact(
 *         email="admin@example.com"
 *     ),
 *     @OA\License(
 *         name="MIT",
 *         url="https://opensource.org/licenses/MIT"
 *     )
 * )
 *
 * @OA\Server(
 *     url=L5_SWAGGER_CONST_HOST,
 *     description="API Server"
 * )
 *
 * @OA\SecurityScheme(
 *     securityScheme="sanctum",
 *     type="http",
 *     scheme="bearer"
 * )
 *
 * @OA\Tag(
 *     name="Articles",
 *     description="API эндпоинты для работы со статьями"
 * )
 * @OA\Tag(
 *     name="Comments",
 *     description="API эндпоинты для работы с комментариями"
 * )
 * @OA\Tag(
 *     name="Tags",
 *     description="API эндпоинты для работы с тегами"
 * )
 */
class ApiInfo
{
} 
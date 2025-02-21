<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ArticleRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'content' => ['required', 'string', 'min:10'],
            'image' => [
                'nullable',
                'image',
                'max:2048',
                'mimes:jpeg,png,jpg,gif',
                'dimensions:min_width=100,min_height=100,max_width=2000,max_height=2000'
            ],
            'tags' => ['array'],
            'tags.*' => ['exists:tags,id']
        ];
    }

    public function messages()
    {
        return [
            'title.required' => 'Заголовок обязателен для заполнения',
            'title.max' => 'Заголовок не может быть длиннее 255 символов',
            'content.required' => 'Содержание статьи обязательно для заполнения',
            'content.min' => 'Содержание статьи должно быть не менее 10 символов',
            'image.image' => 'Файл должен быть изображением',
            'image.max' => 'Размер изображения не должен превышать 2MB',
            'image.mimes' => 'Допустимые форматы изображений: jpeg, png, jpg, gif',
            'image.dimensions' => 'Размеры изображения должны быть от 100x100 до 2000x2000 пикселей',
            'tags.array' => 'Теги должны быть массивом',
            'tags.*.exists' => 'Один или несколько выбранных тегов не существуют'
        ];
    }
} 
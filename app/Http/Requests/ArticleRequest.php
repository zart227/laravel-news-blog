<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ArticleRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'title' => [
                'required',
                'string',
                'max:255',
                Rule::unique('articles', 'title')->ignore($this->article)
            ],
            'content' => [
                'required',
                'string',
                'min:10'
            ],
            'image' => [
                'nullable',
                'image',
                'max:2048',
                'mimes:jpeg,png,jpg,gif',
                'dimensions:min_width=100,min_height=100,max_width=2000,max_height=2000'
            ],
            'status' => [
                'required',
                Rule::in(['draft', 'published'])
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
            'title.unique' => 'Статья с таким заголовком уже существует',
            'content.required' => 'Содержание статьи обязательно для заполнения',
            'content.min' => 'Содержание статьи должно быть не менее 10 символов',
            'image.image' => 'Файл должен быть изображением',
            'image.max' => 'Размер изображения не должен превышать 2MB',
            'image.mimes' => 'Допустимые форматы изображений: jpeg, png, jpg, gif',
            'image.dimensions' => 'Размеры изображения должны быть от 100x100 до 2000x2000 пикселей',
            'status.required' => 'Статус статьи обязателен',
            'status.in' => 'Недопустимый статус статьи',
            'tags.array' => 'Теги должны быть массивом',
            'tags.*.exists' => 'Один или несколько выбранных тегов не существуют'
        ];
    }

    protected function prepareForValidation()
    {
        if ($this->isMethod('PUT') && !$this->has('status')) {
            $this->merge([
                'status' => $this->article->status
            ]);
        }
    }
} 
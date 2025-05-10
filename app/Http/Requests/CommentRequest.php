<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CommentRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'content' => ['required', 'string', 'min:3', 'max:1000'],
            'parent_id' => ['nullable', 'exists:comments,id']
        ];
    }

    public function messages()
    {
        return [
            'content.required' => 'Текст комментария обязателен',
            'content.min' => 'Комментарий должен содержать минимум 3 символа',
            'content.max' => 'Комментарий не может быть длиннее 1000 символов',
            'parent_id.exists' => 'Родительский комментарий не найден'
        ];
    }
} 
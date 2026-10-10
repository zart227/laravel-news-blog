<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ArticleViewRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'ip_address' => ['required', 'ip'],
            'user_id' => ['nullable', 'exists:users,id'],
        ];
    }

    public function messages()
    {
        return [
            'ip_address.required' => 'IP адрес обязателен',
            'ip_address.ip' => 'Некорректный формат IP адреса',
            'user_id.exists' => 'Указанный пользователь не существует'
        ];
    }

    protected function prepareForValidation()
    {
        $this->merge([
            'ip_address' => $this->ip(),
            'user_id' => auth()->id(),
        ]);
    }
} 
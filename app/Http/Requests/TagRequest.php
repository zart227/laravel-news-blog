<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class TagRequest extends FormRequest
{
    public function authorize()
    {
        return auth()->user()->role === 'admin';
    }

    public function rules()
    {
        $rules = [
            'name' => [
                'required',
                'string',
                'min:2',
                'max:50',
                Rule::unique('tags')->ignore($this->tag)
            ],
            'slug' => [
                'required',
                'string',
                'min:2',
                'max:50',
                'alpha_dash',
                Rule::unique('tags')->ignore($this->tag)
            ],
        ];

        return $rules;
    }

    public function messages()
    {
        return [
            'name.required' => 'Название тега обязательно',
            'name.min' => 'Название тега должно содержать минимум 2 символа',
            'name.max' => 'Название тега не может быть длиннее 50 символов',
            'name.unique' => 'Тег с таким названием уже существует',
            'slug.required' => 'URL-идентификатор обязателен',
            'slug.min' => 'URL-идентификатор должен содержать минимум 2 символа',
            'slug.max' => 'URL-идентификатор не может быть длиннее 50 символов',
            'slug.alpha_dash' => 'URL-идентификатор может содержать только буквы, цифры, дефисы и подчеркивания',
            'slug.unique' => 'Тег с таким URL-идентификатором уже существует',
        ];
    }

    protected function prepareForValidation()
    {
        if ($this->has('name') && !$this->has('slug')) {
            $this->merge([
                'slug' => \Str::slug($this->name),
            ]);
        }
    }
} 
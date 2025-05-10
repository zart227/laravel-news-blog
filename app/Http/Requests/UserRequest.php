<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;

class UserRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        $rules = [
            'name' => ['required', 'string', 'min:2', 'max:255'],
            'email' => [
                'required',
                'string',
                'email',
                'max:255',
                Rule::unique('users')->ignore($this->user)
            ],
        ];

        // Добавляем правила для пароля только при создании или смене пароля
        if ($this->isMethod('post') || $this->has('password')) {
            $rules['password'] = ['required', 'confirmed', Password::defaults()];
        }

        // Правила для роли (только для админа)
        if (auth()->user()?->role === 'admin') {
            $rules['role'] = ['sometimes', 'required', 'string', Rule::in(['admin', 'user'])];
        }

        return $rules;
    }

    public function messages()
    {
        return [
            'name.required' => 'Имя пользователя обязательно',
            'name.min' => 'Имя пользователя должно содержать минимум 2 символа',
            'name.max' => 'Имя пользователя не может быть длиннее 255 символов',
            'email.required' => 'Email обязателен',
            'email.email' => 'Некорректный формат email',
            'email.unique' => 'Пользователь с таким email уже существует',
            'password.required' => 'Пароль обязателен',
            'password.confirmed' => 'Пароли не совпадают',
            'role.required' => 'Роль обязательна',
            'role.in' => 'Недопустимое значение роли',
        ];
    }

    protected function prepareForValidation()
    {
        // Если пароль пустой и это не создание нового пользователя,
        // удаляем его из валидации
        if ($this->isMethod('put') && empty($this->password)) {
            $this->request->remove('password');
            $this->request->remove('password_confirmation');
        }
    }
} 
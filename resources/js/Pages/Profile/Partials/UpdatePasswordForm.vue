<template>
    <section>
        <header>
            <h2 class="text-lg font-medium text-gray-900">
                Обновление пароля
            </h2>

            <p class="mt-1 text-sm text-gray-600">
                Убедитесь, что ваша учетная запись использует длинный случайный пароль для обеспечения безопасности.
            </p>
        </header>

        <form @submit.prevent="form.put(route('password.update'))" class="mt-6 space-y-6">
            <input type="text" 
                   class="hidden" 
                   name="username" 
                   :value="userEmail" 
                   autocomplete="username" />

            <div>
                <InputLabel for="current_password" value="Текущий пароль" />
                <TextInput
                    id="current_password"
                    ref="currentPasswordInput"
                    v-model="form.current_password"
                    type="password"
                    class="mt-1 block w-full"
                    autocomplete="current-password"
                />
                <InputError :message="form.errors.current_password" class="mt-2" />
            </div>

            <div>
                <InputLabel for="password" value="Новый пароль" />
                <TextInput
                    id="password"
                    ref="passwordInput"
                    v-model="form.password"
                    type="password"
                    class="mt-1 block w-full"
                    autocomplete="new-password"
                />
                <InputError :message="form.errors.password" class="mt-2" />
            </div>

            <div>
                <InputLabel for="password_confirmation" value="Подтверждение пароля" />
                <TextInput
                    id="password_confirmation"
                    v-model="form.password_confirmation"
                    type="password"
                    class="mt-1 block w-full"
                    autocomplete="new-password"
                />
                <InputError :message="form.errors.password_confirmation" class="mt-2" />
            </div>

            <div class="flex items-center gap-4">
                <PrimaryButton :disabled="form.processing">Сохранить</PrimaryButton>

                <Transition
                    enter-active-class="transition ease-in-out"
                    enter-from-class="opacity-0"
                    leave-active-class="transition ease-in-out"
                    leave-to-class="opacity-0"
                >
                    <p v-if="form.recentlySuccessful" class="text-sm text-gray-600">Сохранено.</p>
                </Transition>
            </div>
        </form>
    </section>
</template>

<script setup lang="ts">
import { useForm, usePage } from '@inertiajs/vue3';
import InputError from '@/Components/UI/InputError.vue';
import InputLabel from '@/Components/UI/InputLabel.vue';
import PrimaryButton from '@/Components/UI/PrimaryButton.vue';
import TextInput from '@/Components/UI/TextInput.vue';
import { ref } from 'vue';
import type { User } from '@/types/models';
import type { PageProps as InertiaPageProps } from '@inertiajs/core';

interface CustomPageProps {
    auth: {
        user: User | null;
    };
}

type PageProps = InertiaPageProps & CustomPageProps;

const currentPasswordInput = ref<HTMLInputElement>();
const passwordInput = ref<HTMLInputElement>();

const page = usePage<PageProps>();
const userEmail = page.props.auth.user?.email ?? '';

const form = useForm({
    current_password: '',
    password: '',
    password_confirmation: '',
});
</script> 
<template>
    <section class="space-y-6">
        <header>
            <h2 class="text-lg font-medium text-gray-900">
                Удаление аккаунта
            </h2>

            <p class="mt-1 text-sm text-gray-600">
                После удаления вашего аккаунта все его ресурсы и данные будут безвозвратно удалены. Перед удалением аккаунта, пожалуйста, загрузите все данные или информацию, которые вы хотите сохранить.
            </p>
        </header>

        <DangerButton @click="confirmUserDeletion">
            <span class="flex items-center">
                <svg class="h-4 w-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Удалить аккаунт
            </span>
        </DangerButton>

        <Modal :show="confirmingUserDeletion" @close="closeModal" :max-width="'xl'">
            <div class="p-6">
                <h2 class="text-lg font-medium text-gray-900">
                    Вы уверены, что хотите удалить свой аккаунт?
                </h2>

                <p class="mt-3 text-sm text-gray-600">
                    Это действие необратимо. После удаления вашего аккаунта:
                </p>

                <ul class="mt-2 text-sm text-gray-600 list-disc list-inside space-y-1">
                    <li>Все ваши данные будут удалены</li>
                    <li>Все ваши статьи и комментарии будут удалены</li>
                    <li>Ваш профиль будет полностью деактивирован</li>
                    <li>Вы потеряете доступ ко всем связанным сервисам</li>
                </ul>

                <p class="mt-4 text-sm text-gray-600">
                    Пожалуйста, введите свой пароль для подтверждения удаления аккаунта.
                </p>

                <div class="mt-6">
                    <InputLabel for="password-confirm" value="Пароль" />

                    <TextInput
                        id="password-confirm"
                        ref="passwordInput"
                        v-model="form.password"
                        type="password"
                        class="mt-1 block w-full"
                        placeholder="Введите ваш текущий пароль"
                        @keyup.enter="deleteUser"
                    />

                    <InputError :message="form.errors.password" class="mt-2" />
                </div>

                <div class="mt-6 flex justify-end space-x-3">
                    <SecondaryButton @click="closeModal">
                        Отмена
                    </SecondaryButton>

                    <DangerButton
                        :class="{ 'opacity-25': form.processing }"
                        :disabled="form.processing"
                        @click="deleteUser"
                    >
                        <span class="flex items-center">
                            <svg v-if="!form.processing" class="h-4 w-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            <svg v-else class="h-4 w-4 mr-2 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            {{ form.processing ? 'Удаление...' : 'Подтвердить удаление' }}
                        </span>
                    </DangerButton>
                </div>
            </div>
        </Modal>
    </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useForm } from '@inertiajs/vue3';
import DangerButton from '@/Components/UI/DangerButton.vue';
import InputError from '@/Components/UI/InputError.vue';
import InputLabel from '@/Components/UI/InputLabel.vue';
import Modal from '@/Components/UI/Modal.vue';
import SecondaryButton from '@/Components/UI/SecondaryButton.vue';
import TextInput from '@/Components/UI/TextInput.vue';

const confirmingUserDeletion = ref(false);
const passwordInput = ref<HTMLInputElement>();

const form = useForm({
    password: '',
});

const confirmUserDeletion = () => {
    confirmingUserDeletion.value = true;

    setTimeout(() => passwordInput.value?.focus(), 250);
};

const deleteUser = () => {
    form.delete(route('profile.destroy'), {
        preserveScroll: true,
        onSuccess: () => closeModal(),
        onError: () => passwordInput.value?.focus(),
        onFinish: () => form.reset(),
    });
};

const closeModal = () => {
    confirmingUserDeletion.value = false;
    form.reset();
};
</script> 
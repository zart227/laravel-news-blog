<script setup lang="ts">
import { onMounted, ref } from 'vue';

const connectionStatus = ref('Подключение...');
const messages = ref<string[]>([]);

onMounted(() => {
    // Подписываемся на тестовый канал
    window.Echo.channel('test-channel')
        .listen('TestEvent', (e: any) => {
            messages.value.push(e.message);
        });

    // Проверяем статус соединения
    window.Echo.connector.pusher.connection.bind('connected', () => {
        connectionStatus.value = 'Подключено';
    });

    window.Echo.connector.pusher.connection.bind('disconnected', () => {
        connectionStatus.value = 'Отключено';
    });

    window.Echo.connector.pusher.connection.bind('error', (err: any) => {
        connectionStatus.value = `Ошибка: ${err.message}`;
    });
});
</script>

<template>
    <div class="p-6">
        <h1 class="text-2xl font-bold mb-4">Тест WebSocket</h1>
        
        <div class="mb-4">
            <strong>Статус соединения:</strong>
            <span :class="{
                'text-green-600': connectionStatus === 'Подключено',
                'text-red-600': connectionStatus === 'Отключено' || connectionStatus.includes('Ошибка'),
                'text-yellow-600': connectionStatus === 'Подключение...'
            }">
                {{ connectionStatus }}
            </span>
        </div>

        <div v-if="messages.length > 0">
            <h2 class="text-xl font-semibold mb-2">Полученные сообщения:</h2>
            <ul class="list-disc list-inside">
                <li v-for="(message, index) in messages" :key="index">
                    {{ message }}
                </li>
            </ul>
        </div>
        <div v-else>
            <p class="text-gray-600">Сообщений пока нет</p>
        </div>
    </div>
</template> 
import axios from 'axios';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

window.axios = axios;
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
window.axios.defaults.headers.common['X-Inertia'] = true;
window.axios.defaults.headers.common['Accept'] = 'text/html, application/xhtml+xml';
window.axios.defaults.withCredentials = true;
window.axios.defaults.baseURL = window.location.origin;

// Получаем CSRF токен из мета-тега
const token = document.head.querySelector('meta[name="csrf-token"]');
if (token) {
    window.axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content;
}

// Настройка Laravel Echo только если есть ключ
if (window.VITE_REVERB_APP_KEY) {
    window.Pusher = Pusher;

    window.Echo = new Echo({
        broadcaster: 'reverb',
        key: window.VITE_REVERB_APP_KEY,
        wsHost: window.VITE_REVERB_HOST || window.location.hostname,
        wsPort: window.VITE_REVERB_PORT || 6001,
        scheme: window.VITE_REVERB_SCHEME || 'http',
        enabledTransports: ['ws', 'wss'],
        forceTLS: false,
        encrypted: false,
        disableStats: true,
    });
}

/**
 * Echo exposes an expressive API for subscribing to channels and listening
 * for events that are broadcast by Laravel. Echo and event broadcasting
 * allow your team to quickly build robust real-time web applications.
 */

import './echo';

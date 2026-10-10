import './bootstrap';
import '../css/app.css';

import { createApp, h } from 'vue';
import { createInertiaApp } from '@inertiajs/vue3';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { ZiggyVue } from 'ziggy-js';
import { NotificationsPlugin } from './utils/notifications';
import axios from 'axios';

// Настройка axios для CSRF
const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
if (token) {
    axios.defaults.headers.common['X-CSRF-TOKEN'] = token;
    axios.defaults.withCredentials = true;
}

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    resolve: name => {
        const pages = import.meta.glob('./Pages/**/*.vue', { eager: true })
        return pages[`./Pages/${name}.vue`]
    },
    title: title => title ? `${title} - ${appName}` : appName,
    setup({ el, App, props, plugin }) {
        const app = createApp({ render: () => h(App, props) });
        
        // Инициализируем плагины
        app.use(plugin);
        const ziggy = props.initialPage.props.ziggy;
        window.Ziggy = ziggy;
        app.use(ZiggyVue, ziggy);
        app.use(NotificationsPlugin);
        
        app.mount(el);
        return app;
    },
    progress: {
        color: '#4B5563',
    },
});

import { inject } from 'vue';
import Toast, { useToast } from 'vue-toastification';
import 'vue-toastification/dist/index.css';

// Опции для уведомлений
const toastOptions = {
    position: "top-right",
    timeout: 5000,
    closeOnClick: true,
    pauseOnFocusLoss: true,
    pauseOnHover: true,
    draggable: true,
    draggablePercent: 0.6,
    showCloseButtonOnHover: false,
    hideProgressBar: false,
    closeButton: "button",
    icon: true,
    rtl: false
};

let toastInstance = null;

// Создаем инстанс Toast
const getToastInstance = () => {
    if (!toastInstance) {
        toastInstance = useToast();
    }
    return toastInstance;
};

// Экспортируем методы уведомлений
export const notify = {
    success: (message, options = {}) => {
        const toast = getToastInstance();
        if (toast) {
            toast.success(message, options);
        }
    },
    error: (message, options = {}) => {
        const toast = getToastInstance();
        if (toast) {
            toast.error(message, options);
        }
    },
    info: (message, options = {}) => {
        const toast = getToastInstance();
        if (toast) {
            toast.info(message, options);
        }
    },
    warning: (message, options = {}) => {
        const toast = getToastInstance();
        if (toast) {
            toast.warning(message, options);
        }
    }
};

// Композабл для использования уведомлений
export function useNotifications() {
    return inject('notify', notify);
}

// Плагин для Vue
export const NotificationsPlugin = {
    install: (app) => {
        app.use(Toast, toastOptions);
        app.provide('notify', notify);
        app.config.globalProperties.$notify = notify;
    }
}; 
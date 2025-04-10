import { ToastOptions } from 'vue-toastification'

export const toastOptions: ToastOptions = {
    position: 'top-right',
    timeout: 3000,
    closeOnClick: true,
    pauseOnFocusLoss: true,
    pauseOnHover: true,
    draggable: true,
    draggablePercent: 0.6,
    showCloseButtonOnHover: false,
    hideProgressBar: false,
    closeButton: 'button',
    icon: true,
    rtl: false,
    transition: 'Vue-Toastification__bounce',
    maxToasts: 5,
    newestOnTop: true,
    filterBeforeCreate: (toast, toasts) => {
        if (toasts.filter(t => t.type === toast.type).length !== 0) {
            // Возвращаем null, чтобы предотвратить дублирование уведомлений одного типа
            return null;
        }
        return toast;
    },
} 
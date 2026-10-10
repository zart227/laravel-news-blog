import { notify } from './notifications';

export function handleError(error) {
    if (error.response) {
        // Ошибка от сервера
        const status = error.response.status;
        const data = error.response.data;

        if (status === 422) {
            // Ошибки валидации
            const errors = Object.values(data.errors).flat();
            errors.forEach(error => notify.error(error));
        } else if (status === 403) {
            // Ошибка доступа
            notify.error(data.message || 'У вас нет прав для выполнения этого действия');
        } else if (status === 404) {
            // Не найдено
            notify.error(data.message || 'Запрашиваемый ресурс не найден');
        } else if (status === 401) {
            // Не авторизован
            notify.error('Необходимо войти в систему');
            window.location = '/login';
        } else {
            // Другие ошибки сервера
            notify.error(data.message || 'Произошла ошибка на сервере');
        }
    } else if (error.request) {
        // Ошибка сети
        notify.error('Ошибка сети. Проверьте подключение к интернету');
    } else {
        // Другие ошибки
        notify.error(error.message || 'Произошла неизвестная ошибка');
    }
    console.error('Error:', error);
}

export function showSuccess(message) {
    notify.success(message);
}

export function showInfo(message) {
    notify.info(message);
}

export function showWarning(message) {
    notify.warning(message);
} 
import { route } from './index';

export const ZiggyVue = {
    install: (app) => {
        app.config.globalProperties.$route = route;
    }
};

export { route }; 
declare module 'ziggy-js' {
    import { Config, RouteParam, RouteParamsWithQueryOverload } from 'ziggy-js';

    export default function route(
        name: string,
        params?: RouteParamsWithQueryOverload | RouteParam,
        absolute?: boolean,
        config?: Config
    ): string;

    export interface Config {
        url: string;
        port: number | null;
        defaults: Record<string, string>;
        routes: Record<string, any>;
    }

    export const Ziggy: Config;
    export const ZiggyVue: any;
}

declare module 'vue' {
    interface ComponentCustomProperties {
        route(
            name: string,
            params?: Record<string, any>,
            absolute?: boolean
        ): string;
    }
}

declare global {
    interface Window {
        route(
            name: string,
            params?: Record<string, any>,
            absolute?: boolean
        ): string;
    }
}

export {}; 
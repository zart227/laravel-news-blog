import { Ziggy } from '../../ziggy';

export function route(name, params, absolute, config = Ziggy) {
    const url = new URL(config.url);
    
    if (config.port && (url.protocol === 'http:' && config.port !== 80 || url.protocol === 'https:' && config.port !== 443)) {
        url.port = config.port;
    }
    
    let route = config.routes[name];
    
    if (!route) {
        throw new Error(`Route "${name}" not found in Ziggy configuration.`);
    }
    
    let uri = route.uri.replace(/\{([^}]+)\}/g, (_, param) => {
        if (!params || !params[param]) {
            throw new Error(`Missing required parameter "${param}" for route "${name}".`);
        }
        return params[param];
    });
    
    if (absolute) {
        return url.origin + '/' + uri.replace(/^\//, '');
    }
    
    return '/' + uri.replace(/^\//, '');
} 
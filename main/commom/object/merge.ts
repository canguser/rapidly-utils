import { deepAssign } from './deepAssign';

export function merge<T extends object, F extends object>(target: T, ...origins: F[]): T & F {
    return origins.reduce<T & F>(
        (result, origin) =>
            deepAssign(result, origin, {
                ignoreUndefined: true
            }),
        target as T & F
    );
}

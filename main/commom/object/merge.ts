import { deepAssign } from './deepAssign';

/**
 * Merge origin objects to target object.
 * Undefined properties in origin object will be ignored.
 * **Target object will be modified**
 * **Properties in target object might be overridden.**
 * @param target
 * @param origins
 */
export function merge<T extends object, F extends object>(target: T, ...origins: F[]): T & F {
    return origins.reduce<T & F>(
        (result, origin) =>
            deepAssign(result, origin, {
                ignoreUndefined: true
            }),
        target as T & F
    );
}

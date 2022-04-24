import { deepAssign, DeepAssignOptions } from './deepAssign';

export interface MergeOptions extends DeepAssignOptions {}

const defaultOptions: MergeOptions = {
    ignoreUndefined: true
};

export function configureMerge(options: MergeOptions = {}) {
    return function <T extends object, F extends object>(target: T, ...origins: F[]): T & F {
        return origins.reduce<T & F>(
            (result, origin) =>
                deepAssign(result, origin, {
                    ...defaultOptions,
                    ...options
                }),
            target as T & F
        );
    };
}

/**
 * Merge origin objects to target object.
 * Undefined properties in origin object will be ignored.
 * **Target object will be modified**
 * **Properties in target object might be overridden.**
 * @param target
 * @param origins
 */
export const merge: <T extends object, F extends object>(target: T, ...origins: F[]) => T & F = configureMerge();

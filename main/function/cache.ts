import { hashCode } from '../object/hashCode';

/**
 * Cache the result of a function.
 * @param _self
 */
export function cache<T extends (...args) => any>(_self: T): T & { clearCache: () => void } {
    const cacheMap = new Map<any, any>();

    const result = (...args) => {
        const key = hashCode(args);
        if (cacheMap.has(key)) {
            const { returnValue, isAsync } = cacheMap.get(key) || {};
            if (isAsync) {
                return Promise.resolve(returnValue);
            }
            return returnValue;
        }
        const returnValue = _self(...args);
        if (returnValue instanceof Promise) {
            return returnValue.then((value) => {
                cacheMap.set(key, { returnValue: value, isAsync: true });
                return value;
            });
        }
        cacheMap.set(key, { returnValue, isAsync: false });
        return returnValue;
    };

    result.clearCache = () => {
        cacheMap.clear();
    };

    return result as T & { clearCache: () => void };
}
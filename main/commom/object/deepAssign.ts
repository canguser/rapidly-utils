import { isBasicData } from '../isBasicData';

export interface DeepAssignOptions {
    ignoreUndefined?: boolean;
    ignoreNull?: boolean;
    useSymbol?: boolean;
    useNonenumerable?: boolean;
}

function _getKeys(obj: any, useSymbol: boolean, useNonenumerable: boolean): any[] {
    const keys: any[] = [];
    if (useSymbol) {
        Object.getOwnPropertySymbols(obj).forEach((key) => {
            keys.push(key);
        });
    }
    if (useNonenumerable) {
        Object.getOwnPropertyNames(obj).forEach((key) => {
            if (!keys.includes(key)) {
                keys.push(key);
            }
        });
        return keys;
    }
    return [...keys, ...Object.keys(obj)];
}

function _deepAssign<T extends object, F extends object>(
    target: T,
    origin: F,
    options?: DeepAssignOptions,
    _parentStack: { target: object; origin: object }[] = []
): T & F {
    const { ignoreUndefined = false, ignoreNull = false, useSymbol = false, useNonenumerable = false } = options || {};

    for (let key of _getKeys(origin, useSymbol, useNonenumerable)) {
        const _value = origin[key];
        if (ignoreUndefined && _value === undefined) {
            continue;
        }
        if (ignoreNull && _value === null) {
            continue;
        }
        if (isBasicData(_value)) {
            target[key] = _value;
            continue;
        }
        if (typeof _value === 'object') {
            if (!target[key]) {
                target[key] = Array.isArray(_value) ? [] : {};
            }
            const index = _parentStack.findIndex((item) => item.origin === _value);

            if (index === -1) {
                _deepAssign(target[key], _value, options, [
                    ..._parentStack,
                    {
                        target: target[key],
                        origin: _value
                    }
                ]);
            } else {
                target[key] = _parentStack[index].target;
            }
            continue;
        }
        target[key] = _value;
    }

    return target as T & F;
}

export function deepAssign<T extends object, F extends object>(
    target: T,
    origin: F,
    options?: DeepAssignOptions
): T & F {
    return _deepAssign(target, origin, options, []);
}

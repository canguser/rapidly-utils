import { isBasicData } from '../isBasicData';
import { getKeys } from './getKeys';

export interface DeepAssignOptions {
    ignoreUndefined?: boolean;
    ignoreNull?: boolean;
    useSymbol?: boolean;
    useNonenumerable?: boolean;
    integralClasses?: any[] | (() => any[]);
    integralObjects?: any[] | (() => any[]);
}

function _deepAssign<T extends object, F extends object>(
    target: T,
    origin?: F,
    options?: DeepAssignOptions,
    _parentStack: { target: object; origin: object }[] = []
): T & F {
    if (origin == null) {
        return target as T & F;
    }

    let {
        ignoreUndefined = false,
        ignoreNull = false,
        useSymbol = false,
        useNonenumerable = false,
        integralClasses = [],
        integralObjects = []
    } = options || {};

    if (typeof integralClasses === 'function') {
        options.integralClasses = integralClasses = integralClasses() || [];
    }

    if (typeof integralObjects === 'function') {
        options.integralObjects = integralObjects = integralObjects() || [];
    }

    loop: for (let key of getKeys(origin, useSymbol, useNonenumerable)) {
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
        for (let _class of integralClasses) {
            if (_value instanceof _class) {
                target[key] = _value;
                continue loop;
            }
        }
        if (integralObjects.includes(_value)) {
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

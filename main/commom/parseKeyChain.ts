import { OptionalArray } from './types/types';
import { getBindingExpressions } from './string/getBindingExpressions';
import { flat } from '../array/flat';

function parseBracket(str) {
    const { raws, expressions } = getBindingExpressions(str, '[', ']');
    const result = [...raws];
    expressions.forEach((expression, index) => {
        result.splice(2 * index + 1, 0, expression || '[]');
    });
    return result.filter((r) => r);
}

/**
 * Parse the property name to name array.
 * @param keyChain
 */
export function parseKeyChain(keyChain: OptionalArray<PropertyKey>): PropertyKey[] {
    if (typeof keyChain === 'string') {
        keyChain = flat(
            keyChain.split('.').map((key) => parseBracket(key.trim())),
            2
        );
    }
    if (!Array.isArray(keyChain)) {
        return [keyChain];
    }
    return keyChain.map((k) => {
        if (typeof k === 'string') {
            return k.replace(/ /g, '');
        }
        return k;
    });
}

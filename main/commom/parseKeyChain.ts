import { OptionalArray } from './types/types';

/**
 * Parse the property name to name array.
 * @param keyChain
 */
export function parseKeyChain(keyChain: OptionalArray<PropertyKey>): PropertyKey[] {
    if (typeof keyChain === 'string') {
        keyChain = keyChain.split('.');
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
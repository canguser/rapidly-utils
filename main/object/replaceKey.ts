import { replaceKeyMap } from './replaceKeyMap';

export function replaceKey<T extends object, K extends keyof T>(obj: T, oldKey: K, newKey: string): any {
    return replaceKeyMap(obj, {
        [oldKey]: newKey
    });
}

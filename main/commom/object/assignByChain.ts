import { setProperty } from '../../object/setProperty';

export function assignByChain<T extends object>(target: T, ...sources: any[]): T {
    sources.forEach((source) => {
        for (const key in source) {
            setProperty(target, key, source[key]);
        }
    });
    return target;
}

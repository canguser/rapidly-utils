/**
 * Expand an object with the properties of another object
 * Existing properties are not overridden
 * @param target
 * @param sources
 */
export function expand(target: any, ...sources: any[]): any {
    if (!sources.length) return target;
    const source = sources.shift();
    if (Array.isArray(source)) {
        if (!Array.isArray(target)) {
            target = [];
        }
        target.push(...source);
    } else if (typeof source === 'object') {
        for (const key in source) {
            if (!(key in target)) {
                target[key] = source[key];
            }
        }
    }
    return expand(target, ...sources);
}

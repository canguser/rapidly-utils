export function fromEntries<T = any>(entries: Array<readonly [PropertyKey, T]>): { [k: string]: T } {
    const result = {};
    entries.forEach(entry => {
        result[entry[0] == null ? '' : entry[0]] = entry[1];
    });
    return result;
}
export function getKeys(obj: any, useSymbol: boolean, useNonenumerable: boolean): any[] {
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
const _uniqueArrayStore = [];

function _getUniqueArray(...args) {
    let [arr] = args;
    if (!Array.isArray(arr) || args.length > 1) {
        arr = args;
    }
    const limit = 256;
    if (_uniqueArrayStore.length > limit) {
        _uniqueArrayStore.splice(0, _uniqueArrayStore.length - limit);
    }
    for (const items of _uniqueArrayStore) {
        if (items.length !== arr.length) {
            continue;
        }
        if (items.reduce((is, item, i) => is && item === arr[i], true)) {
            return items;
        }
    }
    const result = [...arr];
    _uniqueArrayStore.push(result);
    return result;
}

export function unique<T>(...args: T[]): T[]
export function unique<T>(arr: T[]): T[]
export function unique(...args) {
    return _getUniqueArray(...args);
}
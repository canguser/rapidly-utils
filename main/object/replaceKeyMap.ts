export function replaceKeyMap<T extends object, K extends object>(
    _object: T,
    keyMap: { [oldKey: string]: string }
): any {
    for (const key in keyMap) {
        const newKey = keyMap[key];
        if (key in _object) {
            _object[newKey] = _object[key];
            delete _object[key];
        }
    }
    return _object;
}

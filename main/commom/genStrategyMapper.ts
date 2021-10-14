export function genStrategyMapper<T extends object, V = any>(mapper: T, defaultValue: V = undefined, ignoreCase = false): T {
    return new Proxy({ ...mapper }, {
        get(target, p, receiver) {
            if (Object.getOwnPropertyNames(target)
                .map<string | symbol>(name => ignoreCase ? name.toLowerCase() : name).includes((ignoreCase && typeof p === 'string') ? p.toLowerCase() : p)) {
                return Reflect.get(target, p, receiver);
            }
            return defaultValue;
        }
    });
}
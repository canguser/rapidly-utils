export function neverPromise<T>() {
    return new Promise<T>(() => undefined);
}

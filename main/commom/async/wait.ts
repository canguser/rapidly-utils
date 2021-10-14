export async function wait<T>(ms: number, payload?: T): Promise<T> {
    return new Promise<T>(resolve => {
        setTimeout(() => {
            resolve(payload)
        }, ms)
    })
}
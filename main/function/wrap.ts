export function wrap(fn: (...args: any[]) => any, ...args: any[]): any {
    return fn.bind(this, ...args);
}

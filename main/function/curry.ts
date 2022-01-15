export function curry(fn, ...args) {
    return fn.length <= args.length ? fn(...args) : curry.bind(this, fn, ...args);
}

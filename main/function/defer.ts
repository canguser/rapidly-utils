/**
 * 推迟调用，直到当前堆栈清理完毕。调用时，任何附加的参数会传给函数。
 * @param {function} _self  要延迟的函数
 * @param {*[]} args        会在调用时传给函数的参数
 */
export function defer<T>(_self: (...args) => T, ...args): Promise<T> {
    return Promise.resolve().then(() => _self.call(this, ...args));
}

/**
 * Get the item of the connection from index (Can be negative).
 * @param {*[]}     _self   - The connection object.
 * @param {number}  i       - The index of the connection. Could be negative.
 */
export function index<T>(_self: T[], i: number): T {
    return _self[i >= 0 ? i : _self.length + i];
}

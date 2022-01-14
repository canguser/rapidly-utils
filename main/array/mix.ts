/**
 * Adds each item in the array between each item in the target array.
 * **The source array will be modified.**
 * @param _self
 * @param targets
 */
export function mix<T, O>(_self: T[], targets: O[]): (T | O)[] {
    const results = _self as (T | O)[];
    for (let i = 0; i < targets.length; i++) {
        results.splice(2 * i + 1, 0, targets[i]);
    }
    return results;
}

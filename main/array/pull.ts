/**
 * Removes all given values from array.
 * **The source array will be modified.**
 * @param _self
 * @param values
 */
export function pull<T>(_self: T[], ...values: any[]): T[] {
    for (let i = 0; i < values.length; i++) {
        const toRemoveValue = values[i];
        for (let index = _self.indexOf(toRemoveValue); index >= 0; index = _self.indexOf(toRemoveValue)) {
            _self.splice(index, 1);
        }
    }
    return _self;
}

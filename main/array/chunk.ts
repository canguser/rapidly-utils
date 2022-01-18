/**
 * Creates an array of elements split into groups the length of size.
 * If array can't be split evenly, the final chunk will be the remaining elements.
 * @param _array
 * @param size
 */
export function chunk<T>(_array: T[], size: number): T[][] {
    const chunked_arr = [];
    let index = 0;
    while (index < _array.length) {
        chunked_arr.push(_array.slice(index, (index += size)));
    }
    return chunked_arr;
}

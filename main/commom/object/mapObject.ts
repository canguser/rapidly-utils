/**
 * This method creates a new object filled with the results of calling the provided function for each value in the calling object.
 * @param object
 * @param callback
 */
export function mapObject<T>(object: T, callback: (value: T[keyof T], key: keyof T) => any): T & any {
    const result: T = {} as T;
    for (const key in object) {
        if (object.hasOwnProperty(key)) {
            result[key] = callback(object[key], key);
        }
    }
    return result;
}
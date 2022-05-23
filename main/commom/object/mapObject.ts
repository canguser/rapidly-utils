/**
 * This method creates a new object filled with the results of calling the provided function for each key & value in the calling object.
 * @param object
 * @param callback
 * @param mapKey Specifies whether new key values can be mapped
 */
export function mapObject<
    T extends object = object,
    O extends object = object,
    MapKey extends boolean = false,
    A = any
>(
    object: T,
    callback: (value: T[keyof T], key: keyof T) => MapKey extends true ? O : A,
    mapKey?: MapKey
): MapKey extends true ? O : { [key in keyof T]: A } {
    const result: MapKey extends true ? O : { [key in keyof T]: A } = {} as MapKey extends true
        ? O
        : { [key in keyof T]: A };
    for (const key in object) {
        if (object.hasOwnProperty(key)) {
            const cResult = callback(object[key], key);
            const keyValue = mapKey ? cResult : { [key]: cResult };
            Object.assign(result, keyValue);
        }
    }
    return result;
}
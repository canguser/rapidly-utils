export function flat(array, deep = 1) {
    if (deep == 0) {
        return array;
    }
    return array.reduce((acc, val) => {
        if (Array.isArray(val)) {
            return acc.concat(flat(val, deep - 1));
        } else {
            return acc.concat(val);
        }
    }, []);
}

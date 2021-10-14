export function isNumberProperty(key) {
    return typeof key === 'number' || /^[0-9]*$/.test(key)
}
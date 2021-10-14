export function isNumberProperty(key: PropertyKey): boolean {
    return typeof key !== 'symbol' && (typeof key === 'number' || /^[0-9]*$/.test(key));
}
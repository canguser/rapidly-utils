export function containsAny(array: any[], ...values: any): boolean {
    return values.some((value) => array.indexOf(value) !== -1);
}

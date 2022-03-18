export function contains(array: any[], ...values: any): boolean {
    return values.every((value) => array.indexOf(value) !== -1);
}

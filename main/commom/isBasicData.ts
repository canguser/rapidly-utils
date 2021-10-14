export function isBasicData(data: any): boolean {
    return ['string', 'number', 'boolean', 'function'].includes(typeof data) || data instanceof Date || data == null;
}
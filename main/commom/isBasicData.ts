export function isBasicData(obj) {
    return ['string', 'number', 'boolean', 'function'].includes(typeof obj) || obj instanceof Date || obj == null;
}
export function toBoolean(value: any): boolean {
    if (typeof value === 'string' && value.trim()) {
        try {
            return !!JSON.parse(value.trim());
        } catch (e) {
            return !!value;
        }
    }
    return !!value;
}

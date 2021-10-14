export function isBlank(str: string): boolean {
    return str == null || str.trim() === '';
}
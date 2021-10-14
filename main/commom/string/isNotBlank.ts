import { isBlank } from './isBlank';

export function isNotBlank(str: string): boolean {
    return !isBlank(str);
}
import { flat } from './flat';

/**
 * Flattens an array.
 * @param arr
 */
export function flatten(arr: any[]) {
    return flat(arr, 1);
}

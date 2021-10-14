import { unique as _unique } from '../commom/unique'

export function unique<T>(items: T[]): T[] {
    return _unique(...items)
}
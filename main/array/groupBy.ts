import { unique } from '../commom/unique'

export function groupBy<T>(items: T[], ...fields: Array<keyof T>): Map<any, Set<T>> {
    const result = new Map<any, Set<T>>()
    const isMultiField = fields.length > 1
    for (const item of items) {
        const key = isMultiField ? unique(fields.map(field => item[field])) : item[fields[0]]
        const values = result.get(key) || new Set<T>()
        values.add(item)
        result.set(key, values)
    }
    return result
}
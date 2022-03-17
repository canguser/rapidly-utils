import { parseKeyChain } from '../commom/parseKeyChain'

/**
 * Get the object property, it's support to using link property name like: a.b.c.d.e.f
 * @param _self
 * @param propertyName
 * @param defaultValue
 * @returns {*}
 */
export function getProperty<T = any>(_self, propertyName: any[] | string, defaultValue?: any): T {
    if (_self == null) {
        return defaultValue
    }
    propertyName = parseKeyChain(propertyName)
    if (propertyName.length === 1) {
        return _self[propertyName[0]] ?? defaultValue
    } else if (propertyName.length > 1) {
        return getProperty(_self[propertyName[0]], propertyName.splice(1))
    }
    return defaultValue
}
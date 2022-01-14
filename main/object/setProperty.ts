import { isNumberProperty } from '../commom/isNumberProperty'
import { parseKeyChain } from '../commom/parseKeyChain'

/**
 * Set the object property, it's support to using link property name like: a.b.c.d.e.f
 * @param _self
 * @param propertyName {string|Array}
 * @param value
 * @returns {*}
 */
export function setProperty(_self, propertyName: any[] | string, value: any): boolean {
    propertyName = parseKeyChain(propertyName)
    if (propertyName.length === 0) {
        return true
    }
    if (_self == null) {
        return false
    }
    if (propertyName.length === 1) {
        _self[propertyName[0]] = value
        return true
    } else if (propertyName.length > 1) {
        let thisKey = propertyName.splice(0, 1)
        const [key] = thisKey
        const [key2] = propertyName
        let canSet = setProperty(_self[key], propertyName, value)
        if (!canSet) {
            if (isNumberProperty(key2)) {
                _self[key] = []
            } else {
                _self[key] = {}
            }
            return setProperty(_self[key], propertyName, value)
        }
    }
    return true
}
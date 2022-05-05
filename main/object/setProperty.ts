import { isNumberProperty } from '../commom/isNumberProperty';
import { parseKeyChain } from '../commom/parseKeyChain';

export interface SetPropertyOptions {
    allowDuplicates?: boolean;
}

/**
 * Set the object property, it's support to using link property name like: a.b.c.d.e.f
 * @param _self
 * @param propertyName {string|Array}
 * @param value
 * @param options
 * @returns {*}
 */
export function setProperty(_self, propertyName: any[] | string, value: any, options?: SetPropertyOptions): boolean {
    const { allowDuplicates = false } = options || {};
    propertyName = parseKeyChain(propertyName);
    if (propertyName.length === 0) {
        return true;
    }
    if (_self == null) {
        return false;
    }
    if (propertyName.length === 1) {
        const key = propertyName[0];
        if (allowDuplicates && _self[key] !== undefined) {
            if (Array.isArray(_self[key])) {
                _self[key].push(value);
            } else {
                _self[key] = [_self[key], value];
            }
            return true;
        }
        if (key === '[]') {
            if (!Array.isArray(_self)) {
                return false;
            }
            _self.push(value);
            return true;
        }
        _self[propertyName[0]] = value;
        return true;
    } else if (propertyName.length > 1) {
        let thisKey = propertyName.splice(0, 1);
        const [key] = thisKey;
        const [key2] = propertyName;
        let canSet = setProperty(_self[key], propertyName, value, options);
        if (!canSet) {
            if (isNumberProperty(key2) || key2 === '[]') {
                _self[key] = [];
            } else {
                _self[key] = {};
            }
            return setProperty(_self[key], propertyName, value, options);
        }
    }
    return true;
}

import { hashCode as _hashCode } from '../string/hashCode';

export function hashCode(obj) {
    return _hashCode(JSON.stringify(obj));
}

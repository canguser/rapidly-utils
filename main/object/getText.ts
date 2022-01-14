import { flat } from '../array/flat';

export function getText(_self, deep) {
    deep == null && (deep = 10);
    if (deep <= 0) {
        return [];
    }
    if (!_self || typeof _self === 'string') {
        return [_self];
    }
    deep = deep - 1;
    return flat(Object.keys(_self).map(key => {
        return this.getMessage(_self[key], deep);
    }), deep).filter(r => r != null && r !== '');
}
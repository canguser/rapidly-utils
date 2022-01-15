const _join = Array.prototype.join;

export function joinWith<T>(_self: T[], separator: string | ((arrIndex?: number, arr?: T[]) => any)) {
    if (typeof separator === 'function') {
        let resultStr = '';
        _self.forEach((item, index) => {
            if (index < _self.length - 1) {
                const part = item + '';
                resultStr += part;
                resultStr += separator(index, _self);
            }else {
                resultStr += item;
            }
        });
        return resultStr;
    }
    return _join.call(_self, separator);
}

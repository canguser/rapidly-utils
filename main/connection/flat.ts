export function flat(array, deep = Infinity) {

    const flat = (Array.prototype as any).flat || function(deep = Infinity) {
        if (deep < 1) {
            return this;
        }
        let result = [];
        const nextDeep = deep - 1;
        this.forEach(a => {
            if (a instanceof Array) {
                result = result.concat(flat.call(a, nextDeep));
            } else {
                result.push(a);
            }
        });
        return result;
    };

    return flat.call(array, deep);

}
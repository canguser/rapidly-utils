export interface PaddingArrayOptions {
    minLeft?: number;
    minRight?: number;
    paddingItem?: any;
    total?: number;
    leftFirst?: boolean;
    infectSelf?: boolean;
}

const defaultOptions: PaddingArrayOptions = {
    minLeft: 0,
    minRight: 0,
    leftFirst: true,
    infectSelf: false
};

export function padding(_array = [], options?: PaddingArrayOptions): any[] {
    const opts = Object.assign({}, defaultOptions, options);
    const { minLeft, minRight, paddingItem, leftFirst, infectSelf } = opts;
    let { total } = opts;
    const minTotal = _array.length + minLeft + minRight;
    if (!total || total < minTotal) {
        total = minTotal;
    }
    const leftItems = Array.from({ length: minLeft }).map(() => paddingItem);
    const rightItems = Array.from({ length: minRight }).map(() => paddingItem);
    if (total > minTotal) {
        const extraItems = Array.from({ length: total - minTotal }).map(() => paddingItem);
        if (leftFirst) {
            leftItems.push(...extraItems);
        } else {
            rightItems.push(...extraItems);
        }
    }
    if (infectSelf) {
        _array.unshift(...leftItems);
        _array.push(...rightItems);
        return _array;
    }
    return [...leftItems, ..._array, ...rightItems];
}

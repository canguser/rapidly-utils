import { deepAssign } from '../commom/object/deepAssign';

export interface TrimArrayOptions {
    emptyItems?: any[];
    maxLeft?: number;
    maxRight?: number;
    trimLength?: number;
    leftFirst?: boolean;
    infectSelf?: boolean;
}

const defaultOptions: TrimArrayOptions = {
    emptyItems: [undefined, null],
    maxLeft: Infinity,
    maxRight: Infinity,
    trimLength: 0,
    leftFirst: true,
    infectSelf: false
};

export function trim(_array: any[], options?: TrimArrayOptions) {
    const opts = deepAssign({}, { ...defaultOptions, ...options }, { ignoreUndefined: true });
    const {
        emptyItems,
        maxLeft,
        maxRight,
        leftFirst,
        infectSelf
    } = opts;
    let { trimLength } = opts;
    const length = _array.length;
    const endIndex = length - 1;
    const maxLength = length - maxLeft - maxRight;
    if (trimLength < maxLength) {
        trimLength = maxLength < 0 ? 0 : maxLength;
    }

    let leftIndex = 0, rightIndex = endIndex;
    const maxLeftIndex = leftIndex + maxLeft;
    const maxRightIndex = rightIndex - maxRight;
    let leftEnd = false, rightEnd = false;

    while (rightIndex - leftIndex > trimLength - 1 && (!leftEnd || !rightEnd)) {
        const leftItem = _array[leftIndex];
        const rightItem = _array[rightIndex];
        const maxLeftDone = maxLeftIndex <= leftIndex;
        const maxRightDone = maxRightIndex >= rightIndex;

        const firstItem = leftFirst ? leftItem : rightItem;
        const secondItem = leftFirst ? rightItem : leftItem;
        let firstEnd = leftFirst ? leftEnd : rightEnd;
        let secondEnd = leftFirst ? rightEnd : leftEnd;
        const firstDone = leftFirst ? maxLeftDone : maxRightDone;
        const secondDone = leftFirst ? maxRightDone : maxLeftDone;

        if (!firstEnd) {
            if (
                emptyItems.reduce((equals, item) => {
                    return equals || item === firstItem;
                }, false) && !firstDone
            ) {
                if (leftFirst) {
                    leftIndex++;
                } else {
                    rightIndex--;
                }
            } else {
                firstEnd = true;
            }
        } else {
            if (
                emptyItems.reduce((equals, item) => {
                    return equals || item === secondItem;
                }, false) && !secondDone
            ) {
                if (leftFirst) {
                    rightIndex--;
                } else {
                    leftIndex++;
                }
            } else {
                secondEnd = true;
            }
        }

        if (leftFirst) {
            leftEnd = firstEnd;
            rightEnd = secondEnd;
        } else {
            rightEnd = firstEnd;
            leftEnd = secondEnd;
        }
    }

    if (infectSelf) {
        _array.splice(rightIndex + 1);
        _array.splice(0, leftIndex);
        return _array;
    }

    return _array.slice(leftIndex, rightIndex + 1);
}

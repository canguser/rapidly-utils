import { mapObject } from '../commom/object/mapObject';
import { expand } from '../commom/object/expand';

export interface ProtoMethodsMap {
    [key: string]: (...args: any[]) => any;
}

export function applyPrototype(constructor: Function, prototype: ProtoMethodsMap = {}) {
    const targetMap = mapObject(prototype, (value, key) => {
        return function (...args: any[]) {
            return value.apply(this, [this, ...args]);
        };
    });
    expand(constructor.prototype, targetMap);
}

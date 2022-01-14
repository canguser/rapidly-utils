export function applyPrototype(constructor: Function, prototype: any) {
    Object.assign(constructor.prototype, prototype);
}


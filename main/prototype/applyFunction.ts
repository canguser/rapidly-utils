import { applyPrototype } from './applyPrototype';
import { defer } from '../function/defer';
import { wrap } from '../function/wrap';
import { curry } from '../function/curry';

export function applyFunction() {
    applyPrototype(Function, {
        curry,
        defer,
        wrap
    });
}

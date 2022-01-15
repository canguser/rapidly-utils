import { applyArray } from './applyArray';
import { applyString } from './applyString';
import { applyObject } from './applyObject';
import { applyNumber } from './applyNumber';
import { applyPromise } from './applyPromise';
import { applyFunction } from './applyFunction';

export function applyAll() {
    applyArray();
    applyString();
    applyObject();
    applyNumber();
    applyPromise();
    applyFunction();
}

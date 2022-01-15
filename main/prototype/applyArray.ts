import { applyPrototype } from './applyPrototype';
import { trim } from '../array/trim';
import { pull } from '../array/pull';
import { unique } from '../array/unique';
import { padding } from '../array/padding';
import { contains } from '../array/containsAny';
import { containsAny } from '../array/contains';
import { flat } from '../array/flat';
import { flatten } from '../array/flatten';
import { groupBy } from '../array/groupBy';
import { index } from '../array';
import { joinWith } from '../array/joinWith';
import { mix } from '../array/mix';

export function applyArray() {
    applyPrototype(Array, {
        contains,
        containsAny,
        flat,
        flatten,
        groupBy,
        index,
        join: joinWith,
        mix,
        padding,
        pull,
        trim,
        unique
    });
}

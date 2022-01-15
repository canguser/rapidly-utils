import { applyPrototype } from './applyPrototype';
import { replaceKeyMap } from '../object/replaceKeyMap';
import { setProperty } from '../object/setProperty';
import { hashCode } from '../object/hashCode';
import { getText } from '../object/getText';
import { getProperty } from '../object/getProperty';
import { replaceKey } from '../object/replaceKey';

export function applyObject() {
    applyPrototype(Object, {
        getProperty,
        getText,
        hashCode,
        replaceKey,
        replaceKeyMap,
        setProperty
    });
}

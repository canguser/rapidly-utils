import { applyPrototype } from './applyPrototype';
import { hashCode } from '../string/hashCode';
import { capitalizes } from '../string/capitalizes';

export function applyString(){
    applyPrototype(String,{
        capitalizes,
        hashCode,
    })
}
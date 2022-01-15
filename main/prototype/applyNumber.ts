import { convertPercent } from '../number/convertPercent';
import { convertCurrency } from '../number/convertCurrency';
import { applyPrototype } from './applyPrototype';

export function applyNumber(){
    applyPrototype(Number, {
        convertCurrency,
        convertPercent
    });
}
import { isBasicData } from '../isBasicData';

export function deepAssign(target, origin){
    for(let key in origin){
        if(origin.hasOwnProperty(key)){
            const _value = origin[key];
            if(isBasicData(_value)) {
                target[key] = _value;
            }else if (typeof _value === 'object') {
                if(!target[key]){
                    target[key] = Array.isArray(target[key]) ? [] : {};
                }
                deepAssign(target[key], _value);
            } else {
                target[key] = _value;
            }
        }
    }
    return target;
}
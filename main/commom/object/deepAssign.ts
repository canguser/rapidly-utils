export function deepAssign(target, origin){
    for(let key in origin){
        if(origin.hasOwnProperty(key)){
            if(typeof origin[key] === 'object'){
                target[key] = deepAssign(target[key] || {}, origin[key]);
            }else{
                target[key] = origin[key];
            }
        }
    }
    return target;
}
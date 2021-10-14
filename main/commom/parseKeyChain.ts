/**
 * Parse the property name to name array.
 *  eg:
 *      'a.b.c.d.e.t' => [a,b,c,d,e,t]
 * @param keyChain
 * @returns {*}
 */
export function parseKeyChain(keyChain) {
    if (typeof keyChain === 'string') {
        keyChain = keyChain.split('.')
    }
    return keyChain.filter((k) => typeof k === 'string').map((k) => k.replace(/ /g, ''))
}
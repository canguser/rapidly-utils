import { replaceAll } from './replaceAll';

const SPECIFIED_PREFIX_CODE = '\x00';
const SPECIFIED_SUFFIX_CODE = '\x01';
function _replaceUnescapeString(source, target, to) {
    return replaceAll(source, target, (a, index, str) => {
        if (str[index - 1] !== '\\') {
            return to;
        }
        return a;
    });
}

export function getBindingExpressions(_self, prefix = '{', suffix = '}') {
    _self = _replaceUnescapeString(_self, SPECIFIED_PREFIX_CODE, '');
    _self = _replaceUnescapeString(_self, SPECIFIED_SUFFIX_CODE, '');
    _self = _replaceUnescapeString(_self, prefix, SPECIFIED_PREFIX_CODE);
    _self = _replaceUnescapeString(_self, suffix, SPECIFIED_SUFFIX_CODE);
    const regex = new RegExp(`${SPECIFIED_PREFIX_CODE}.*?${SPECIFIED_SUFFIX_CODE}`);
    const regexGlobal = new RegExp(`${SPECIFIED_PREFIX_CODE}(.*?)${SPECIFIED_SUFFIX_CODE}`, 'g');
    const matchResults = [..._self.matchAll(regexGlobal)];
    return {
        raws: _self
            .split(regex)
            .map((p) => replaceAll(replaceAll(p, SPECIFIED_PREFIX_CODE, prefix), SPECIFIED_SUFFIX_CODE, suffix)),
        expressions: matchResults.map(([, expression]) => expression)
    };
}

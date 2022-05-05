import { getProperty } from '../../object/getProperty';
import { execExpression } from './execExpression';
import { getBindingExpressions } from './getBindingExpressions';
import { joinWith } from '../../array/joinWith';

export interface TemplateOptions {
    suffix?: string;
    prefix?: string;
    withFunction?: boolean;
    ignoreUndefined?: boolean;
    ignoreNull?: boolean;
    stringifyObject?: boolean;
    escapeChar?: string;
}

const defaultOptions: TemplateOptions = {
    prefix: '{',
    suffix: '}',
    withFunction: false,
    escapeChar: '\\',
    ignoreUndefined: true,
    ignoreNull: true,
    stringifyObject: false
};

export function template(_self: string, context: object, options?: TemplateOptions): string {
    const opts = Object.assign({}, defaultOptions, options);
    const { prefix, suffix, withFunction } = opts;
    const { raws = [], expressions = [] } = getBindingExpressions(_self, prefix, suffix);
    if (expressions.length === 0) {
        return _self;
    }
    return joinWith(raws, (index) => {
        const expression = expressions[index] || '';
        if (withFunction) {
            return execExpression(expression, context) || '';
        }
        return getProperty(context, expression) || '';
    });
}

export function templateByLoop(_self: string, context: object, options?: TemplateOptions): string {
    const opts = Object.assign({}, defaultOptions, options);
    const { prefix, suffix, withFunction, escapeChar } = opts;
    let resultStr = '';
    let matchPrefixIndex = 0,
        matchPart = '',
        matchPrefix = false,
        matchSuffix = false,
        tempPrefixPart = '',
        tempPrefixPartSec = '';

    const resetState = () => {
        matchPrefixIndex = 0;
        matchPart = '';
        matchPrefix = false;
        matchSuffix = false;
        tempPrefixPart = '';
        tempPrefixPartSec = '';
    };

    for (let mainIndex = 0; mainIndex < _self.length; mainIndex++) {
        const char = _self[mainIndex];

        if (char === escapeChar) {
            mainIndex++;
            resultStr += tempPrefixPart + tempPrefixPartSec + matchPart + char + _self[mainIndex];
            resetState();
            continue;
        }

        if (prefix[matchPrefixIndex] === char) {
            tempPrefixPartSec += char;
            if (matchPrefixIndex === prefix.length - 1) {
                if (matchPrefix) {
                    // if already match prefix, then allow to append temp prefix part in last matches
                    resultStr += tempPrefixPart + matchPart;
                    matchPart = '';
                    tempPrefixPart = '';
                    tempPrefixPartSec = '';
                }
                matchPrefix = true;
                matchPrefixIndex = 0;
                // move existing matched part to temp prefix part
                tempPrefixPart += tempPrefixPartSec;
                tempPrefixPartSec = '';
                continue;
            }
            matchPrefixIndex++;
            continue;
        } else if (matchPrefixIndex > 0) {
            matchPrefixIndex = 0;
            // allow continue to add temp part to result string or matched part
        }

        if (matchPrefix) {
            for (let suffixIndex = 0; suffixIndex < suffix.length; suffixIndex++) {
                const suffixChar = suffix[suffixIndex];
                const compareIndex = mainIndex + suffixIndex;
                const compareChar = _self[mainIndex + suffixIndex];
                if (suffixChar === compareChar) {
                    if (suffixIndex === suffix.length - 1) {
                        matchSuffix = true;
                        mainIndex = compareIndex;
                    }
                } else {
                    break;
                }
            }
        }

        if (matchSuffix) {
            const value = withFunction ? execExpression(matchPart, context) : getProperty(context, matchPart);
            if (value === undefined && opts.ignoreUndefined) {
                resultStr += '';
            } else if (value === null && opts.ignoreNull) {
                resultStr += '';
            } else {
                resultStr += opts.stringifyObject && typeof value === 'object' ? JSON.stringify(value) : value;
            }
            resetState();
        } else if (matchPrefix && mainIndex < _self.length - 1) {
            matchPart += tempPrefixPartSec + char;
            tempPrefixPartSec = '';
        } else {
            resultStr += tempPrefixPart + tempPrefixPartSec + matchPart + char;
            tempPrefixPartSec = '';
            tempPrefixPart = '';
            matchPart = '';
        }
    }
    return resultStr;
}

import { getBindingExpressions } from './getBindingExpressions';
import { joinWith } from '../../array/joinWith';
import { getProperty } from '../../object/getProperty';
import { execExpression } from './execExpression';

export interface TemplateOptions {
    suffix?: string;
    prefix?: string;
    withFunction?: boolean;
}

const defaultOptions: TemplateOptions = {
    prefix: '{',
    suffix: '}',
    withFunction: false
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

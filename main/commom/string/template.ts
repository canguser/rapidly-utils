import { getBindingExpressions } from './getBindingExpressions';
import { join } from '../../array/join';

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

function _execExpression(expression: string, context: object): string {
    if (!expression || !expression.trim()) {
        return undefined;
    }
    try {
        return new Function('context', `with(context){return (${expression})}`)(
            new Proxy(context, {
                has(): boolean {
                    return true;
                }
            })
        );
    } catch (e) {
        console.warn("there's some un-except expression: " + expression, e);
        return undefined;
    }
}

export function template(_self: string, context: object, options?: TemplateOptions): string {
    const opts = Object.assign({}, defaultOptions, options);
    const { prefix, suffix, withFunction } = opts;
    const { raws = [], expressions = [] } = getBindingExpressions(_self, prefix, suffix);
    if (expressions.length === 0) {
        return _self;
    }
    return join(raws, (index) => {
        const expression = expressions[index] || '';
        if (withFunction) {
            return _execExpression(expression, context) || '';
        }
        return context[expression.trim()] || '';
    });
}

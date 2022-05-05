import { template, TemplateOptions } from './template';

const MATCH_PLACEHOLDER = '\x02';

const schemaMapping = {
    string: (value: string) => (value || '') + '',
    number: (value: string) => parseFloat(value),
    boolean: (value: string) => value.toLowerCase() === 'true'
} as const;

export interface MatchTemplateOptions<T extends object = object> extends TemplateOptions {
    schema?: {
        [key in keyof T]?: keyof typeof schemaMapping;
    };
}

export function matchTemplate<T extends object>(
    _self: string,
    templateStr: string,
    options?: MatchTemplateOptions<T>
): T {
    const { schema = {} } = options || {};
    const keys = [];
    const orderContext = new Proxy(
        {},
        {
            get: (target, key) => {
                keys.push(key);
                return MATCH_PLACEHOLDER;
            },
            has: () => true
        }
    );
    const escapeRegExp = (str: string) => {
        return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    };
    const templateReg = escapeRegExp(template(templateStr, orderContext, options)).replace(/\x02/g, '(.*)');
    const reg = new RegExp(`^${templateReg}$`, 'g');
    const matches = [..._self.matchAll(reg)][0] || [];
    const result = {};
    if (matches.length > 0) {
        for (let i = 0; i < keys.length; i++) {
            const value = matches[i + 1];
            const key = keys[i];
            const type = schema[key] || 'string';
            result[keys[i]] = schemaMapping[type](value);
        }
        return result as T;
    }
    return undefined;
}

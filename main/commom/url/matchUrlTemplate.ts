import { matchTemplate, MatchTemplateOptions } from '../string/matchTemplate';
import { formatUrl } from './formatUrl';

export interface MatchUrlTemplateOptions<T extends object = object> extends MatchTemplateOptions<T> {
    matchPrefix?: boolean;
}

interface UrlMatchResult<T extends object = object> {
    partial?: boolean;
    match?: string;
    params?: T;
}

export function matchUrlTemplate<T extends object>(
    _self: string,
    templateUrlStr: string,
    options?: MatchUrlTemplateOptions<T>
): UrlMatchResult<T> {
    const { matchPrefix = false } = options || {};
    const toMatchParts = formatUrl(_self || '')
        .split('/')
        .filter((p) => p !== '');
    const templateParts = formatUrl(templateUrlStr || '')
        .split('/')
        .filter((p) => p !== '');
    const isPartial = templateParts.length < toMatchParts.length && matchPrefix;
    if (templateParts.length !== toMatchParts.length && !isPartial) {
        return undefined;
    }
    let result: UrlMatchResult<T> = {
        partial: isPartial,
        match: '',
        params: {} as T
    } as UrlMatchResult<T>;
    const matchParts = [];

    for (let i = 0; i < templateParts.length; i++) {
        const templatePart = templateParts[i];
        const toMatchPart = toMatchParts[i];
        const matchResult = matchTemplate(toMatchPart, templatePart, options);
        if (!matchResult) {
            return undefined;
        }
        Object.assign(result.params, matchResult);
        matchParts.push(toMatchPart);
    }

    result.match = formatUrl(matchParts.join('/'));
    return result;
}

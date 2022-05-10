import { matchTemplate, MatchTemplateOptions } from '../string/matchTemplate';
import { urlJoin } from './urlJoin';

export function matchUrlTemplate<T extends object>(
    _self: string,
    templateUrlStr: string,
    options?: MatchTemplateOptions<T>
): T {
    const toMatchParts = urlJoin(_self || '')
        .split('/')
        .filter((part) => part);
    const templateParts = urlJoin(templateUrlStr || '')
        .split('/')
        .filter((part) => part);
    if (templateParts.length !== toMatchParts.length) {
        return undefined;
    }
    let result: T = {} as T;

    for (let i = 0; i < templateParts.length; i++) {
        const templatePart = templateParts[i];
        const toMatchPart = toMatchParts[i];
        const matchResult = matchTemplate(toMatchPart, templatePart, options);
        if (!matchResult) {
            return undefined;
        }
        Object.assign(result, matchResult);
    }
    return result;
}

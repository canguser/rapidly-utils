import { setProperty } from '../../object/setProperty';

export function parseQueryString(queryString: string): { [key: string]: string } {
    const query = {};
    const pairs = queryString.split('&');
    for (let i = 0; i < pairs.length; i++) {
        const pair = pairs[i].split('=');
        const [key, value] = pair;
        setProperty(query, decodeURIComponent(key), decodeURIComponent(value || ''), { allowDuplicates: true });
    }
    return query;
}

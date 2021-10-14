import { getHostUrl } from '../url/getHostUrl';

export function pathJoin(url: string, toPath: string | string[], split = '/') {
    const host = getHostUrl(url);
    if (/[a-z0-9]+:\/\/[^/]+$/.test(url)) {
        return url;
    }
    if (typeof toPath === 'string') {
        const toPathHost = getHostUrl(toPath);
        console.log(toPathHost);
        return pathJoin(url, toPath.replace(toPathHost, '').split(split), split);
    }
    if (toPath[0] === '') {
        url = host;
    }
    for (const p of toPath) {
        if (p === '.') {
            continue;
        }
        if (p === '..') {
            url = host + (url.replace(host, '').replace(/\/[^\/]+$/, ''));
            continue;
        }
        if (p) {
            url += split + p;
        }
    }
    return url;
}
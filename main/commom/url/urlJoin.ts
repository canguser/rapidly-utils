import { pathJoin } from '../path/pathJoin';
import { getHostUrl } from './getHostUrl';

export function urlJoin(url: string, ...toPath: string[]): string {
    const host = getHostUrl(url);
    const pathParts = toPath.map((path) => pathJoin('../', path));
    return host + pathJoin(url.replace(host, '/'), pathParts);
}

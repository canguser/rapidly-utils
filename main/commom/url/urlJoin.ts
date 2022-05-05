import { pathJoin } from '../path/pathJoin';
import { getHostUrl } from './getHostUrl';

export function urlJoin(url: string, ...toPath: string[]): string {
    const host = getHostUrl(url);
    const pathParts = toPath.map((path) => pathJoin('../', path));
    const path = url.replace(host, '/');
    return host + pathJoin(path, pathParts);
}

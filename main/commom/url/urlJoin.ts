import { pathJoin } from '../path/pathJoin';
import { getHostUrl } from './getHostUrl';

export function urlJoin(url, toPath) {
    const host = getHostUrl(url);
    return pathJoin(host + (url.replace(host, '').replace(/\/[^\/]+$/, '')), toPath);
}
export function getHostUrl(url) {
    return (url.match(/[a-z0-9]+:\/\/[^/]+/g) || [])[0] || '';
}
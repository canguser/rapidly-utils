function getPathSplits(path?: string, separator = '/'): string[] {
    if (path == null || path.trim() === '') return [];
    return path
        .split(separator)
        .map((part) => part.trim())
        .filter((part, i) => part.length > 0 || i === 0);
}

export function pathJoin(path: string, toPath?: string | string[], separator = '/') {
    if (typeof toPath === 'string' || toPath == null) {
        const originPathSplits = getPathSplits(path, separator);
        const toPathSplits = getPathSplits(toPath as string, separator);
        for (let i = 0; i < toPathSplits.length; i++) {
            const part = toPathSplits[i];
            if (part === '') {
                originPathSplits.splice(0, originPathSplits.length, '');
                continue;
            }
            if (part === '..') {
                const oPart = originPathSplits.pop();
                if (oPart === '.' || oPart === '..') {
                    originPathSplits.push(oPart, part);
                }
                if (originPathSplits.length === 0) {
                    originPathSplits.push('');
                }
                continue;
            }
            if (part !== '.') {
                originPathSplits.push(part);
            }
        }
        return originPathSplits.join(separator) || '/';
    }
    if (Array.isArray(toPath)) {
        return toPath.reduce((path, part) => pathJoin(path, part, separator), path);
    }
}

export function waitNextFrame(args?: any) {
    return new Promise(async resolve => {
        if (typeof window.requestAnimationFrame === 'function') {
            window.requestAnimationFrame(() => {
                resolve(args);
            });
        } else {
            await Promise.resolve();
            resolve(args);
        }
    });
}
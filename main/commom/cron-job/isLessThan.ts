function getMinInterval(part: string, maxInterval: number = Infinity) {
    if (part === '*') {
        return 1;
    }
    if (/^(\d+|\*)\/(\d+|\*)$/.test(part)) {
        const interval = part.split('/')[1];
        return interval === '*' ? 1 : Number(interval || 1);
    }
    const parts = part.split(',');
    if (parts.length === 0) {
        return maxInterval;
    }
    const notNumberParts = [];
    const numberParts = [];
    for (const p of parts) {
        const n = Number(p);
        if (isNaN(n)) {
            notNumberParts.push(p);
            continue;
        }
        numberParts.push(n);
    }
    const numberMinInterval = numberParts.sort().reduce(({ minInterval, last }, num) => {
        if (last == null) {
            minInterval = Infinity;
        } else {
            minInterval = Math.abs(num - last) < minInterval ? Math.abs(num - last) : minInterval;
        }
        return {
            minInterval,
            last: num
        };
    }, { minInterval: undefined, last: undefined }).minInterval;
    return Math.min(...[
        numberMinInterval,
        ...notNumberParts.map(p => getMinInterval(p))
    ]);
}

export function isLessThan(cronExp: string, minute: number): boolean {
    const [s, m, h, d] = cronExp.split(/[\s\t\n\r]/);
    return minute > 1 && getMinInterval(m) < minute;
}
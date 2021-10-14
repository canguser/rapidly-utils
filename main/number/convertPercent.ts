export function convertPercent(num, percentFixed = false) {
    num = parseFloat(num);
    if (Number.isNaN(num)) {
        num = 0;
    }
    if (percentFixed) {
        num /= 100.0;
    }
    if (!Number.isFinite(num)) {
        num = 1;
    }
    return (num * 100).toFixed(0) + '%';
}
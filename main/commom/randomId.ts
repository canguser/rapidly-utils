export function randomId(length = 7) {
    return Number(Math.random().toString().substr(3, length) + Date.now()).toString(36);
};
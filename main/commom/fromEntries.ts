export function fromEntries(entries) {
    const result = {};
    entries.forEach(entry => {
        result[entry[0] == null ? '' : entry[0]] = entry[1];
    });
    return result;
}
let initialId = 1;

export function genOrderedId(): string {
    return '' + initialId++;
}
export function hashCode(obj) {
    return this.getStrHashCode(JSON.stringify(obj));
}
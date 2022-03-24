export function execExpression<T = any>(expression: string, context?: object): T {
    if (!expression || !expression.trim()) {
        return undefined;
    }
    try {
        return new Function('context', `with(context){return (${expression})}`)(
            new Proxy(context || {}, {
                has(): boolean {
                    return true;
                },
                get(target: object, p: string | symbol): any {
                    return Reflect.get(target, p, target);
                },
                set(target: object, p: string | symbol, value: any): boolean {
                    return Reflect.set(target, p, value, target);
                },
            })
        );
    } catch (e) {
        console.warn("there's some un-except expression: " + expression, e);
        return undefined;
    }
}
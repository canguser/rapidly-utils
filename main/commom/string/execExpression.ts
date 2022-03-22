export function execExpression(expression: string, context: object): string {
    if (!expression || !expression.trim()) {
        return undefined;
    }
    try {
        return new Function('context', `with(context){return (${expression})}`)(
            new Proxy(context, {
                has(): boolean {
                    return true;
                }
            })
        );
    } catch (e) {
        console.warn("there's some un-except expression: " + expression, e);
        return undefined;
    }
}
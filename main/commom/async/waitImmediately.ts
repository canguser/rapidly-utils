export function waitImmediately(context?: any, apiName: string = '_waitImmediatelyPS') {
    if (!context[apiName]) {
        context[apiName] = new Promise(resolve => {
            setTimeout(() => {
                context[apiName] = undefined;
                delete context[apiName];
                resolve(undefined);
            }, 0);
        });
    }
    return context[apiName];
}
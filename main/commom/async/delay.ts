export function delay(context, apiName, ms = 0) {
    const eqName = `_delay_${apiName}`
    clearTimeout(context[eqName])
    return new Promise(resolve => {
        context[eqName] = setTimeout(() => {
            resolve(true)
        }, ms)
    })
}
/**
 * Limit the function called intervals times
 * @param context
 * @param apiName
 * @param ms
 */
import { wait } from './wait';

export function limit(context, apiName, ms) {
    const canExecName = `_limit_${apiName}_no_exec`;
    const noExec = context[canExecName];
    if (!noExec) {
        context[canExecName] = true;
        wait(ms)
            .then(() => {
                context[canExecName] = false;
            });
        return Promise.resolve();
    }
    return new Promise(() => undefined);
}
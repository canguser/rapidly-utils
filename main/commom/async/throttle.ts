import { randomId } from '../randomId';
import { wait } from './wait';
import { neverPromise } from './neverPromise';

export interface ThrottleOptions {
    interval?: number;
    context?: object;
    uniqueApi?: string;
    callback?: (...args: any[]) => any;
}

const defaultContext = {};

export function throttle(intervalOrOptions: number | ThrottleOptions = 200): Promise<any> {
    const throttleOptions: ThrottleOptions =
        typeof intervalOrOptions === 'number'
            ? {
                  interval: intervalOrOptions
              }
            : intervalOrOptions;
    const {
        interval,
        context = defaultContext,
        uniqueApi = 'default_api',
        callback = () => undefined
    } = throttleOptions;
    const uniqueName = `_throttle_${uniqueApi}`;
    const noExec = context[uniqueName];
    if (!noExec) {
        context[uniqueName] = true;
        wait(interval).then(() => {
            context[uniqueName] = false;
        });
        return Promise.resolve(callback());
    }
    return neverPromise();
}

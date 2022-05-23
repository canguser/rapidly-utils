import { neverPromise } from './neverPromise';

export interface DebounceOptions {
    leading?: boolean;
    during?: number;
    context?: object;
    uniqueApi?: string;
    callback?: (...args: any[]) => any;
}

const defaultContext = {};

export function debounce(duringOrOptions: number | DebounceOptions = 200): Promise<any> {
    const debounceOptions = typeof duringOrOptions === 'number' ? { during: duringOrOptions } : duringOrOptions;
    const {
        leading = false,
        during = 200,
        context = defaultContext,
        uniqueApi = 'defaultApi',
        callback = () => undefined
    } = debounceOptions;
    const eqName = `_debounce_${uniqueApi}`;
    if (!leading) {
        clearTimeout(context[eqName]);
    }
    if (!leading || !context[eqName]) {
        return new Promise((resolve) => {
            context[eqName] = setTimeout(() => {
                context[eqName] = undefined;
                resolve(callback());
            }, during);
        });
    } else {
        return neverPromise();
    }
}

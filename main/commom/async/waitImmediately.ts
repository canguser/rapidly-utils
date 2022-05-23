import { wait } from './wait';

export interface WaitImmediatelyOptions {
    type: 'timeout' | 'promise';
}

export function waitImmediately<T>(payload?: T, options?: WaitImmediatelyOptions): Promise<T> {
    const { type = 'timeout' } = options || {};
    if (type === 'timeout') {
        return wait(0, payload);
    } else {
        return Promise.resolve(payload);
    }
}

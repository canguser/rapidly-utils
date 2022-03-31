import { neverPromise } from './neverPromise';

const queueWeakMap = new WeakMap<any[], Promise<any>>();

export async function nextTick(queue: any[], scheduler = () => Promise.resolve()) {
    const promise: Promise<any> = queueWeakMap.get(queue) || scheduler();
    queueWeakMap.set(queue, promise);
    await promise;
    const copiedQueue = queue.splice(0);
    if (copiedQueue.length > 0) {
        queueWeakMap.delete(queue);
        return copiedQueue;
    }
    return neverPromise();
}
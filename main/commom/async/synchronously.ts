import { TaskLike } from '../types/types';
import { asyncQueue } from './asyncQueue';

export async function synchronously(identity: any, ...tasks: TaskLike[]) {
    return asyncQueue(identity, 1, ...tasks);
}
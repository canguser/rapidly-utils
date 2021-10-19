import { Method, Task, TaskLike } from '../types/types';

const execQueueMap = new Map<any, Task[]>();
const syncQueueMap = new Map<any, Task[]>();

function isTask(task: any) {
    return typeof task === 'function' || typeof task.task === 'function';
}

function executeTasks(execQueue: Task[]) {
    const promises = Promise.all(execQueue.map(task => {
        if (typeof task.task === 'function') {
            const args = Array.isArray(task.args) ? task.args : [task.args];
            return task.task.apply(task.context, args);
        }
    }));
    execQueue.splice(0);
    return promises;
}

async function startExecSyncQueue(identity: any, execSize = 1) {

    if (!syncQueueMap.has(identity)) {
        return;
    }

    let result;
    await Promise.resolve();
    const waitQueue = syncQueueMap.get(identity);

    while (waitQueue.length > 0) {
        const execQueue = execQueueMap.get(identity) || [];
        execQueue.push(...waitQueue.splice(0, execSize));
        execQueueMap.set(identity, execQueue);
        const results = await executeTasks(execQueue);
        result = results[results.length - 1];
    }

    return result;
}

function waitTaskExecute(task: Method): { promise: Promise<any>, task: Method } {
    let resultTask;
    const pr = new Promise(
        resolve => {
            resultTask = async function(...args) {
                const result = await task.apply(this, args);
                resolve(result);
                return result;
            };
        }
    );
    return {
        promise: pr,
        task: resultTask
    };
}

export async function asyncQueue(identity: any, startSizeLimit: number, ...tasks: TaskLike[]) {

    const existQueue = syncQueueMap.get(identity) || [];

    const hasTasks = existQueue.length > 0;

    const taskMappings = tasks.filter(t => isTask(t))
        .map<Task>(t => {
            if (typeof t === 'function') {
                return {
                    task: t
                };
            }
            return t;
        })
        .map(t => {
            const { task, promise } = waitTaskExecute(t.task);
            return {
                task: {
                    ...t,
                    task
                },
                promise
            };
        });

    existQueue.push(...taskMappings.map<Task>(({ task }) => task));

    if (!hasTasks) {
        syncQueueMap.set(identity, existQueue);
        startExecSyncQueue(identity, startSizeLimit);
    }

    const results = await Promise.all(taskMappings.map(({ promise }) => promise));

    return results[results.length - 1];
}
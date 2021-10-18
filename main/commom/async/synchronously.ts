const syncQueueMap = new Map<any, Task[]>();
type Method = (...args: any[]) => any
type Task = {
    task: Method,
    context?: any,
    args?: any | any[]
}

type TaskLike = Method | Task

function isTask(task: any) {
    return typeof task === 'function' || typeof task.task === 'function';
}

async function startExecSyncQueue(queue: Task[]) {
    let result;
    await Promise.resolve();
    for (let task = queue.shift(); queue.length >= 0 && task; task = queue.shift()) {
        if (typeof task.task === 'function') {
            const args = Array.isArray(task.args) ? task.args : [task.args];
            result = await task.task.apply(task.context, args);
        }
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

export async function synchronously(identity: any, ...tasks: TaskLike[]) {

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
        startExecSyncQueue(existQueue);
    }

    const results = await Promise.all(taskMappings.map(({ promise }) => promise));

    return results[results.length - 1];
}
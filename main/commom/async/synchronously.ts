const syncQueueMap = new Map();

async function startExecSyncQueue(queue, ...args) {
    let result;
    await Promise.resolve();
    for (let task = queue.shift(); queue.length >= 0 && task; task = queue.shift()) {
        if (typeof task === 'function') {
            result = await task(...args);
        }
    }
    return result;
}

function waitTaskExecute(task) {
    let resultTask;
    const pr = new Promise(
        resolve => {
            resultTask = async (...args) => {
                const result = await task(...args);
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

export async function synchronously(identity: any, ...tasks: ((...args: any[]) => any)[]) {

    const existQueue = syncQueueMap.get(identity) || [];

    const hasTasks = existQueue.length > 0;

    const taskMappings = tasks.filter(t => typeof t === 'function').map(t => waitTaskExecute(t));

    existQueue.push(...taskMappings.map(({ task }) => task));

    if (!hasTasks) {
        syncQueueMap.set(identity, existQueue);
        startExecSyncQueue(existQueue);
    }

    const results = await Promise.all(taskMappings.map(({ promise }) => promise));

    return results[results.length - 1];
}
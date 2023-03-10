import { Task, TaskLike } from '../types/types';
import { wait } from './wait';

// 执行区间
const execScope = new Map<any, Promise<any>>();
// 同步队列
const syncQueueMap = new Map<any, Task[]>();

function isTask(task: any): task is TaskLike {
    return typeof task === 'function' || typeof task.task === 'function';
}

function toTask(task: TaskLike): Task{
    if (isTask(task)){
        if (typeof task === 'function'){
            return { task };
        }
        return task;
    }
    return null
}

function execTasks(tasks: Task[]) {
    return Promise.all(tasks.map((task) => {
        return task.task.apply(task.context||this,task.args|| [])
    })).catch(e=>{
        console.warn('async queue error: ', e);
    });
}


function waitingEnterQueue(identity: any, startSizeLimit: number): void {
    const syncQueue = syncQueueMap.get(identity) || [];
    let execPromise = execScope.get(identity);

    if (!execPromise){
        execPromise = execTasks(syncQueue.splice(0, startSizeLimit))
            .then(()=>{
                execScope.delete(identity);
                if (syncQueue.length > 0){
                    return waitingEnterQueue(identity, startSizeLimit);
                }
            });
        execScope.set(identity, execPromise);
    }
}

export async function asyncQueue(identity: any, startSizeLimit: number, task: TaskLike): Promise<any>
export async function asyncQueue(identity: any, startSizeLimit: number, ...tasks: TaskLike[]): Promise<[]>
export async function asyncQueue(identity: any, startSizeLimit: number, ...tasks: TaskLike[]) {
    // 捕获异步结果
    const promises = []
    const realTasks: Task[] = tasks.map(toTask)
    realTasks.forEach(t=>{
        if (!t){
            promises.push(Promise.resolve(null))
        }
        const originTask = t.task
        let onResolve: (result: any)=>any = null
        let onReject: (error: any)=>any = null
        promises.push(new Promise((resolve, reject)=>{
           onResolve = resolve
           onReject = reject
        }))
        t.task = function(...args){
            return new Promise((resolve, reject) => {
                return Promise.resolve(originTask.apply(this, args)).then((result)=>{
                    onResolve && onResolve(result)
                    return resolve(result)
                }).catch(e=>{
                    onReject && onReject(e)
                    return reject(null)
                })
            })
        }
    })

    // 加入同步队列
    const taskQueue = syncQueueMap.get(identity) || [];
    taskQueue.push(...realTasks.filter(t => t));
    syncQueueMap.set(identity, taskQueue);

    if (!execScope.get(identity)){
        // async waiting
        wait(0).then(()=>{
            waitingEnterQueue(identity, startSizeLimit);
        })
    }

    if (promises.length === 1){
        return promises[0]
    }

    return Promise.all(promises)
}
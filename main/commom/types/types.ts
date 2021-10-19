export type OptionalArray<T> = T | T[];

export type Method = (...args: any[]) => any

export type Task = {
    task: Method,
    context?: any,
    args?: any | any[]
}

export type TaskLike = Method | Task
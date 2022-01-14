import { deepAssign, DeepAssignOptions } from './deepAssign';

export interface DeepCloneOptions extends DeepAssignOptions {}

export function deepClone<T extends object>(origin: T, options?: DeepCloneOptions): T {
    return deepAssign({}, origin, options);
}

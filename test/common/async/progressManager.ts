import { createProgressManager } from '../../../main/commom/async/progressManager';
import { wait } from '../../../main/commom/async/wait';

describe('test async progress manager', () => {
    it('should using in single manager', async function () {
        const context: any = new Proxy(
            {},
            {
                set(target: {}, p: string | symbol, value: any, receiver: any): boolean {
                    expect(p).toBe('isLoading');
                    return Reflect.set(target, p, value, receiver);
                }
            }
        );
        const manager = createProgressManager(context, 'isLoading');
        async function loadData() {
            manager.start();
            await new Promise((resolve) => setTimeout(resolve, Math.random() * 100 + 100));
            manager.stop();
        }
        const promise = loadData();
        expect(context.isLoading).toBe(true);
        await Promise.all([promise, loadData(), loadData(), loadData(), loadData()]);
        expect(context.isLoading).toBe(false);
        expect.assertions(4);
    });

    it('should using in multi managers', async function () {
        const context: any = new Proxy(
            {},
            {
                set(target: {}, p: string | symbol, value: any, receiver: any): boolean {
                    expect(1).toBe(1);
                    return Reflect.set(target, p, value, receiver);
                }
            }
        );
        const parentManager = createProgressManager(context, 'isLoadingParent');
        const manager = createProgressManager(context, 'isLoading', parentManager);
        async function loadData() {
            manager.start();
            await new Promise((resolve) => setTimeout(resolve, Math.random() * 100 + 100));
            manager.stop();
        }
        async function loadParentData() {
            parentManager.start();
            await new Promise((resolve) => setTimeout(resolve, Math.random() * 100 + 100));
            parentManager.stop();
        }
        const promises = [loadData(), loadData(), loadData(), loadData()];
        expect(context.isLoadingParent).toBe(true);
        expect(context.isLoading).toBe(true);
        await wait(100);
        const parentPromises = [loadParentData(), loadParentData(), loadParentData(), loadParentData()];
        expect(context.isLoadingParent).toBe(true);
        await Promise.all(promises);
        expect(context.isLoadingParent).toBe(true);
        expect(context.isLoading).toBe(false);
        await Promise.all(parentPromises);
        expect(context.isLoadingParent).toBe(false);
        expect.assertions(10);
    });
});

import { synchronously } from '../../../main/commom/async/synchronously';
import { wait } from '../../../main/commom/async/wait';

describe('common/async/synchronously test', () => {

    it('normal tasks', async function() {
        expect.assertions(3 + 6);
        const store = [];
        const result = await Promise.all([
            synchronously('test01', async function() {
                expect(store.length).toBe(0);
                await wait(500);
                store.push(1);
                expect(store.length).toBe(1);
                return 1;
            }),

            synchronously('test01', async function() {
                expect(store.length).toBe(1);
                await wait(500);
                store.push(1);
                expect(store.length).toBe(3);
                return 2;
            }),

            synchronously('test02', async function() {
                expect(store.length).toBe(0);
                await wait(700);
                store.push(3);
                expect(store.length).toBe(2);
                return 3;
            })
        ]);
        expect(result[0]).toBe(1);
        expect(result[1]).toBe(2);
        expect(result[2]).toBe(3);
    });

    it('standard tasks', async function() {
        expect.assertions(2 + 4);
        const store = [];
        const result = await Promise.all([
            synchronously('test01', {
                async task(a, b) {
                    expect(store.length).toBe(0);
                    await wait(500);
                    this.push(a, b);
                    expect(store.length).toBe(2);
                    return a;
                },
                context: store,
                args: [1, 2]
            }),

            synchronously('test01', {
                async task(a) {
                    expect(store.length).toBe(2);
                    await wait(500);
                    this.push(a);
                    expect(store.length).toBe(3);
                    return a;
                },
                context: store,
                args: 2
            })
        ]);
        expect(result[0]).toBe(1);
        expect(result[1]).toBe(2);
    });

});
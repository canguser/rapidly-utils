import { wait } from '../../../main/commom/async/wait';
import { asyncQueue } from '../../../main/commom/async/asyncQueue';

describe('common/async/asyncQueue test', () => {
    it('should do - normal test', async function () {
        expect.assertions(4 + 8);
        const store = [];
        const result = await Promise.all([
            asyncQueue('test01', 2, async function () {
                expect(store.length).toBe(0);
                await wait(300);
                store.push(1);
                console.log('push')
                expect(store.length).toBe(1);
                return 1;
            }),

            asyncQueue('test01', 2, async function () {
                console.log('?', store.length)
                expect(store.length).toBe(0);
                await wait(500);
                store.push(1);
                expect(store.length).toBe(2);
                return 2;
            }),

            asyncQueue('test01', 2, async function () {
                expect(store.length).toBe(2);
                await wait(400);
                store.push(1);
                expect(store.length).toBe(4);
                return 3;
            }),
            asyncQueue('test02', 2, async function () {
                expect(store.length).toBe(0);
                await wait(700);
                store.push(3);
                console.log('test 02 finished')
                expect(store.length).toBe(3);
                return 4;
            })
        ]);
        expect(result[0]).toBe(1);
        expect(result[1]).toBe(2);
        expect(result[2]).toBe(3);
        expect(result[3]).toBe(4);
    });
    it('should in order', async function() {
        let a = 0
        const results = await  Promise.all([
             asyncQueue('test01', 1, async function () {
                 expect(a++).toBe(0);
                 console.log('1');
                    await wait(300);
                 console.log('2');
                    return 1;
             }),
             wait(100).then(()=>asyncQueue('test01', 1, async function () {
                    expect(a++).toBe(3);
                 console.log('3');
                 await wait(1000);
                 console.log('4');
                 return 3;
             })),
             asyncQueue('test01', 1, async function () {
                    expect(a++).toBe(1);
                 console.log('5');
                 await wait(300);
                 console.log('6');
                 return 4;
             }),
             asyncQueue('test01', 1, async function () {
                    expect(a++).toBe(2);
                 console.log('7');
                 await wait(300);
                 console.log('8');
                 return 5;
             }),
         ])
        expect(results).toEqual([1, 3, 4, 5]);
    });
});

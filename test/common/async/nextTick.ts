import { nextTick } from '../../../main/commom/async/nextTick';

describe('test async nextTick', () => {
    it('test nextTick', async () => {
        const idList = [];
        async function addListAndDo(item) {
            idList.push(item);
            const allIdList = await nextTick(idList);
            expect(allIdList).toEqual([1, 2, 3, 4, 5, 6]);
        }
        const list = [];
        for (let i = 1; i <= 6; i++) {
            list.push(addListAndDo(i));
        }
        await Promise.race(list);
        expect.assertions(1);
    });
    it('test nextTick - 01', async () => {
        const idList = [];
        async function addListAndDo(item) {
            idList.push(item);
            const allIdList = await nextTick(
                idList,
                () =>
                    new Promise((resolve) => {
                        setTimeout(() => {
                            resolve();
                        }, 1000);
                    })
            );
            expect(allIdList).toEqual([1, 2, 3, 4, 5, 6]);
        }
        const list = [];
        for (let i = 1; i <= 6; i++) {
            list.push(addListAndDo(i));
        }
        await Promise.race(list);
        expect.assertions(1);
    });
});

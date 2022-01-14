import { pull } from '../../main/array/pull';

describe('test array pull', () => {
    it('test pull', () => {
        const collection = [1, 2, 3, 4, 5];
        const result = pull(collection, 3);
        expect(result).toBe(collection);
        expect(result).toEqual([1, 2, 4, 5]);
    });
    it('test pull 1', () => {
        const collection = [1, 2, 3, 4, 5, 4, 3, 1];
        const result = pull(collection, 3, 4);
        expect(result).toEqual([1, 2, 5, 1]);
    });
});

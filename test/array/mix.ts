import { mix } from '../../main/array/mix';

describe('test mix', () => {
    it('should return a string', () => {
        const result = mix(['a', 'b', 'c'], ['d', 'e', 'f', 'g']);
        expect(result).toEqual(['a', 'd', 'b', 'e', 'c', 'f', 'g']);
    });
});

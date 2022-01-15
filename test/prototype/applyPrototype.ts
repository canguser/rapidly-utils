import { applyPrototype } from '../../main/prototype/applyPrototype';

describe('test applyPrototype', () => {
    it('should apply prototype', () => {
        function a(_self, a, b) {
            return a + b + _self;
        }

        applyPrototype(String, {
            a: a,
            split: function (str) {
                return [];
            }
        });

        expect('a'['a'](1, 2)).toBe('3a');
        expect('a'['split']('')).toEqual(['a']);
    });
});

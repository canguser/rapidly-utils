import { execExpression } from '../../main/commom/string/execExpression';

describe('test execExpression', () => {
    it('test execExpression', () => {
        const result = execExpression('1 + 2');
        expect(result).toBe(3);
    });
    it('test execExpression - 1', () => {
        const result = execExpression('1 + 2 * 3');
        expect(result).toBe(7);
    });
    it('test execExpression using object', () => {
        const result = execExpression('a + b', { a: 1, b: 2 });
        expect(result).toBe(3);
    });
    it('test execExpression using object to setter', () => {
        const obj: any = {
            a: 1,
            b: 2
        };
        execExpression('a += b, c=200', obj);
        expect(obj.c).toBe(200);
        expect(obj.a).toBe(3);
    });
    it('should using origin target', function () {
        const obj: any = new Proxy(
            {
                a: 1,
                b: 2
            },
            {
                set: function (target, key, value, receiver) {
                    expect(receiver).toBe(obj);
                    target[key] = value;
                    return true;
                }
            }
        );
        execExpression('c=200', obj);
        expect(obj.c).toBe(200);
        expect.assertions(2);
    });
});

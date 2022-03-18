import { template } from '../../main/commom/string/template';

describe('test string template func', () => {
    it('test string template func', () => {
        const str = 'hello {name}, age {age}';
        const result = template(str, { name: 'world', age: 18 });
        expect(result).toBe('hello world, age 18');

        const str2 = 'hello {{!name}}, age {{!age}}';
        const result2 = template(str2, { name: 'world', age: 18 }, { prefix: '{{!', suffix: '}}' });
        expect(result2).toBe('hello world, age 18');

        const str3 = 'hello {name()}, age {age()}';
        const result3 = template(
            str3,
            {
                name: () => 'world',
                age() {
                    return this._age;
                },
                _age: 18
            },
            { withFunction: true }
        );
        expect(result3).toBe('hello world, age 18');

        const str4 = 'hello {1}, age {0}';
        const result4 = template(str4, [18, 'world']);
        expect(result4).toBe('hello world, age 18');
    });

    it('should works for escaped code', function() {
        const str = 'hello \\{name}, age {age}';
        const result = template(str, { name: 'world', age: 18 });
        expect(result).toBe('hello \\{name}, age 18');
    });

    it('should works for escaped code 2', function() {
        const str = 'hello \\{{name}, age {age}';
        const result = template(str, { name: 'world', age: 18 });
        expect(result).toBe('hello \\{world, age 18');
    });

    it('should works for escaped code 3', function() {
        const str = 'hello {{\\!name}}, age {{!age}}';
        const result = template(str, { name: 'world', age: 18 }, { prefix: '{{!', suffix: '}}' });
        expect(result).toBe('hello {{\\!name}}, age 18');
    });

    it('should works for escaped code 4', function() {
        const str = 'hello {{!name}\\}, age {{!age}}';
        const result = template(str, { name: 'world', age: 18 }, { prefix: '{{!', suffix: '}}' });
        expect(result).toBe('hello {{!name}\\}, age 18');
    });

    it('should using inside prefix and suffix', function() {
        const str = 'hello {{name}}, age {{age}}';
        const result = template(str, { name: 'world', age: 18 });
        expect(result).toBe('hello {world}, age {18}');
    });
});

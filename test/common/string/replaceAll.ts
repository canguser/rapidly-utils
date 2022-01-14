import { replaceAll } from '../../../main/commom/string/replaceAll';

describe('test replaceAll', () => {
    it('test replaceAll', () => {
        const str = 'abcdefg';
        const result = replaceAll(str, 'c', 'C');
        expect(result).toBe('abCdefg');
    });
    it('test replaceAll 2', () => {
        const str = 'abcdefg';
        const result = replaceAll(str, 'c', (match,index,str)=>{
            expect(match).toBe('c');
            expect(index).toBe(2);
            expect(str).toBe('abcdefg');
            return 'C';
        });
        expect(result).toBe('abCdefg');
    });

    it('should works', function() {
        const str = 'hello {{!name}}, age {{!age}}'
        let result = replaceAll(str, '{{!', (a, index, str) => {
            // if (str[index - 1] !== '\\') {
            //     return '';
            // }
            return '\x00';
        });
        expect(result).toBe('hello \x00name}}, age \x00age}}');
        result = replaceAll(result, '}}', '\x01');
        expect(result).toBe('hello \x00name\x01, age \x00age\x01');
    });
});

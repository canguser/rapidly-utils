import { pathJoin } from '../../../main/commom/path/pathJoin';

describe('pathJoin', () => {
    it('should join paths - 01', () => {
        expect(pathJoin('/', '/')).toBe('/');
        expect(pathJoin('/', '/a')).toBe('/a');
        expect(pathJoin('/', '/a/')).toBe('/a');
        expect(pathJoin('/', '/a/b')).toBe('/a/b');
        expect(pathJoin('', '/a/b/')).toBe('/a/b');
        expect(pathJoin('', 'a/b/')).toBe('a/b');

        // test join ./
        expect(pathJoin('/', './')).toBe('/');
        expect(pathJoin('/', './a')).toBe('/a');
        expect(pathJoin('/', './a/')).toBe('/a');
        expect(pathJoin('/', './a/b')).toBe('/a/b');

        // test join ../
        expect(pathJoin('/', '../')).toBe('/');
        expect(pathJoin('/', '../a')).toBe('/a');
        expect(pathJoin('/', '../a/')).toBe('/a');
        expect(pathJoin('/', '../a/b')).toBe('/a/b');
    });

    it('should join paths - 02', () => {
        expect(pathJoin('../', '../')).toBe('../..');
        expect(pathJoin('..', '../')).toBe('../..');
        expect(pathJoin('../', '..')).toBe('../..');
        expect(pathJoin('..', '..')).toBe('../..');
    });

    it('should join paths - 03', () => {
        expect(pathJoin('////asd//fasd///g/')).toBe('/asd/fasd/g');
        expect(pathJoin('////asd//fasd///g/',[])).toBe('/asd/fasd/g');
        expect(pathJoin('/', ['../', '////asd//fasd///g/'])).toBe('/asd/fasd/g');
        expect(pathJoin('/', ['../////asd//fasd///g/'])).toBe('/asd/fasd/g')
    });
});

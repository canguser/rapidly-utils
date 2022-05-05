import { parseQueryString } from '../../../main/commom/url/parseQueryString';

describe('parseQueryString', () => {
    it('should parse query string - 01', () => {
        const queryString = 'a=1&b=2&c=3';
        const result = parseQueryString(queryString);
        expect(result).toEqual({ a: '1', b: '2', c: '3' });
    });

    it('should parse query string - 02', () => {
        const queryString = 'a=1&a=2&a=3&a=4';
        const result = parseQueryString(queryString);
        expect(result).toEqual({ a: ['1', '2', '3', '4'] });
    });

    it('should parse query string - 03', () => {
        const queryString = 'a[]=2&a[]=3&a[]=4';
        const result = parseQueryString(queryString);
        expect(result).toEqual({ a: ['2', '3', '4'] });
    });
    it('should parse query string - 04', () => {
        const queryString = 'a[]=1';
        const result = parseQueryString(queryString);
        expect(result).toEqual({ a: ['1'] });
    });
    it('should parse query string - 05', () => {
        const queryString = 'a[1]=1&a[2]=2&a[3]=3&a[0]=0';
        const result = parseQueryString(queryString);
        expect(result).toEqual({ a: ['0', '1', '2', '3'] });
    });
    it('should parse query string deep object - 01', () => {
        const queryString = 'a[b][c][d]=1&a[b][c][d]=2&a[b][c][d]=3&a[b][c][d]=4';
        const result = parseQueryString(queryString);
        expect(result).toEqual({ a: { b: { c: { d: ['1', '2', '3', '4'] } } } });
    })
});

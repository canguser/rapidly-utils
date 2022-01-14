import { parseKeyChain } from '../../main/commom/parseKeyChain';

describe('test parseKeyChain', () => {
  it('should parse key chain 1', () => {
    const keyChain = parseKeyChain('a.b.c');
    expect(keyChain).toEqual(['a', 'b', 'c']);
  });

    it('should parse key chain 2', () => {
        const keyChain = parseKeyChain('a[b].c');
        expect(keyChain).toEqual(['a', 'b', 'c']);
    });
});
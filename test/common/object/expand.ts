import { expand } from '../../../main/commom/object/expand';

describe('test expand', () => {
  it('should expand object', () => {
    const obj = {
      a: 1,
      b: 2,
    };
    const sources = [
      {
        a: 11,
        b: 22,
        f: 2,
      },
      {
        a: 111,
        b: 222,
        e: 2,
      },
    ];
    const result = expand(obj,...sources);
    expect(result).toEqual({
      a: 1,
      b: 2,
      f: 2,
      e: 2,
    });
  });

  it('should expand object with empty sources', () => {
    const obj = {
      a: 1,
      b: 2,
    };
    const sources = [];
    const result = expand(obj,...sources);
    expect(result).toEqual({
      a: 1,
      b: 2,
    });
  });

  it('should expand array', function() {
    const arr = [1, 2];
    const sources = [
      [11, 22],
      [111, 222],
    ];
    const result = expand(arr,...sources);
    expect(result).toEqual([1, 2, 11, 22, 111, 222]);
  });
});
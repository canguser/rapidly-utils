import { setProperty } from '../../../main/object/setProperty';

describe('setProperty', () => {
    it('should set property - array - 01', () => {
        const obj: any = {};
        setProperty(obj, 'a[1]', 1);

        expect(obj.a).toEqual([, 1]);
    });

    it('should set property - array - 02', () => {
        const obj: any = {};
        setProperty(obj, 'a[]', 1);
        setProperty(obj, 'a[]', 2);

        expect(obj['a']).toEqual([1, 2]);
    });

    it('should add value for duplicate', function () {
        const obj: any = {};
        setProperty(obj, 'a', 1, { allowDuplicates: true });
        expect(obj.a).toEqual(1);
        setProperty(obj, 'a', 2, { allowDuplicates: true });
        expect(obj.a).toEqual([1, 2]);
    });
});

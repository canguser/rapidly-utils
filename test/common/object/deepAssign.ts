import { deepAssign } from '../../../main/commom/object/deepAssign';

describe('test deepAssign', () => {

    it('should works for one level', function() {
        const target = {
            a: 1,
            b: 2,
            c: 3,
        };
        const origin = {
            a: 4,
            d: 5,
            f: 6,
        };
        const result = deepAssign(target, origin);

        // console.log(result);

        expect(result).toEqual(target);
        // origin should be assigned to target
        expect(result.a).toEqual(origin.a);
        expect(result.b).toEqual(2);
        expect(result.c).toEqual(3);
        expect(result.d).toEqual(5);
        expect(result.f).toEqual(6);
    });

    it('should works for multi level & support array', function() {
        const target = {
            a: 1,
            b: 2,
            c: 3,
            d: {
                e: 4,
                f: 5,
                g: 6,
            },
            h: [
                {
                    i: 7,
                    j: 8,
                    k: 9,
                },
                {
                    i: 10,
                    j: 11,
                    k: 12,
                },
            ],
        };
        const origin = {
            a: 4,
            d: {
                e: 5,
                f: 6,
                g1: 7,
            },
            h: [
                {
                    i: 8,
                    j: 9,
                    k1: 10,
                    k2: 10,
                },
                {
                    i: 11,
                    j: 12,
                    k: 13,
                },
                {
                    i: 14,
                    j: 15,
                    k: 16,
                }
            ],
        };
        const result = deepAssign(target, origin);
        expect(result.a).toEqual(4);
        expect(result.b).toEqual(2);
        expect(result.c).toEqual(3);
        expect(result.d.e).toEqual(5);
        expect(result.d.f).toEqual(6);
        expect(result.d.g).toEqual(6);
        expect(result.d.g1).toEqual(7);
        expect(result.h[0].i).toEqual(8);
        expect(result.h[0].j).toEqual(9);
        expect(result.h[0].k).toEqual(9);
        expect(result.h[0].k1).toEqual(10);
        expect(result.h[0].k2).toEqual(10);
        expect(result.h[1].i).toEqual(11);
        expect(result.h[1].j).toEqual(12);
        expect(result.h[1].k).toEqual(13);
        expect(result.h[2].i).toEqual(14);
        expect(result.h[2].j).toEqual(15);
        expect(result.h[2].k).toEqual(16);
        expect(Array.isArray(result.h)).toBeTruthy();
        expect(result.h.length).toEqual(3);
    });

    it('should assigned ignore undefined or null', function() {
        const target = {
            a: 1,
            b: 2,
            c: 3,
            d: {
                e: 4,
                f: 5,
                g: 6,
            },
        };
        const origin = {
            a: undefined,
            b: 2,
            d: {
                e: 5,
                f: null,
                g1: 7,
            },
            h: undefined,
        };

        const result = deepAssign(target, origin, {
            ignoreUndefined: true,
            ignoreNull: true,
        });
        expect(result.a).toEqual(1);
        expect(result.b).toEqual(2);
        expect(result.c).toEqual(3);
        expect(result.d.e).toEqual(5);
        expect(result.d.f).toEqual(5);
        expect(result.d.g).toEqual(6);
        expect(result.d.g1).toEqual(7);
        expect(Object.keys(result).includes('h')).toBeFalsy();

    });

    it('should assign deeply related object', function() {
        const target = {};
        const origin: any = {
            a: 1,
            b: 2,
        }
        origin.t = origin;

        const result = deepAssign(target, origin);

        expect(result.a).toEqual(1);
        expect(result.b).toEqual(2);
        expect(result.t.a).toEqual(1);
        expect(result.t.b).toEqual(2);
        expect(result.t.t.a).toEqual(1);
        expect(result.t.t.b).toEqual(2);
        expect(result.t).toEqual(result.t.t);
        expect(result.t === origin).toBeFalsy();

    });

});

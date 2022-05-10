import { matchUrlTemplate } from '../../../main/commom/url/matchUrlTemplate';


describe('test string match url template func', () => {
    it('should simply run - 01', () => {
        expect(matchUrlTemplate('/Name/Luoli/Age/10', 'Name/{name}/Age/{age}')).toEqual({
            partial: false,
            match: '/Name/Luoli/Age/10',
            params: {
                name: 'Luoli',
                age: '10'
            }
        });
    });
    it('should convert type', function () {
        expect(
            matchUrlTemplate('Name/Luoli/Age/10/IsWoman/true', '/Name/{name}/Age/{age}/IsWoman/{women}', {
                schema: {
                    name: 'string',
                    age: 'number',
                    women: 'boolean'
                }
            })
        ).toEqual({
            partial: false,
            match: '/Name/Luoli/Age/10/IsWoman/true',
            params: {
                name: 'Luoli',
                age: 10,
                women: true
            }
        });
    });
    it('test not match', ()=>{
        expect(
            matchUrlTemplate('Name/Luoli/Age/10', '/Name/{name}/Age/{age}/IsWoman/{women}', {
                schema: {
                    name: 'string',
                    age: 'number',
                    women: 'boolean'
                }
            })
        ).toEqual(undefined);

        expect(
            matchUrlTemplate('Name/Luo/li/Age/10', '/Name/{name}/Age/{age}', {
                schema: {
                    name: 'string',
                    age: 'number',
                    women: 'boolean'
                }
            })
        ).toEqual(undefined);
    })
    it('should match prefix', function() {
        expect(matchUrlTemplate('/Name/lili/age/20/id/asdas', '/Name/{name}/age/{age}',{
            matchPrefix: true
        })).toEqual({
            partial: true,
            match: '/Name/lili/age/20',
            params: {
                name: 'lili',
                age: '20'
            }
        });
    });
});

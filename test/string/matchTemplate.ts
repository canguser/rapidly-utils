import { matchTemplate } from '../../main/commom/string/matchTemplate';

describe('test string match template func', () => {
    it('should simply run - 01', () => {
        expect(matchTemplate('Name: Luoli, Age: 10', 'Name: {name}, Age: {age}')).toEqual({
            name: 'Luoli',
            age: '10'
        });
    });
    it('should convert type', function () {
        expect(
            matchTemplate('Name: Luoli, Age: 10, IsWoman: true', 'Name: {name}, Age: {age}, IsWoman: {women}', {
                schema: {
                    name: 'string',
                    age: 'number',
                    women: 'boolean'
                }
            })
        ).toEqual({
            name: 'Luoli',
            age: 10,
            women: true
        });
    });
    it('test not match', ()=>{
        expect(
            matchTemplate('Name: Luoli, Age: 10', 'Name: {name}, Age: {age}, IsWoman: {women}', {
                schema: {
                    name: 'string',
                    age: 'number',
                    women: 'boolean'
                }
            })
        ).toEqual(undefined);
    })
});

import { urlJoin } from '../../../main/commom/url/urlJoin';

describe('urlJoin', () => {
    it('should join url paths - 01', () => {
        const origin = 'http://localhost:8080';

        expect(urlJoin(origin, '/api/v1/users')).toBe(origin + '/api/v1/users');
        expect(urlJoin(origin, '/api/v1/users', '/')).toBe(origin + '/');
        expect(urlJoin(origin, '/api/v1/users', '/', '/asdf')).toBe(origin + '/asdf');
        expect(urlJoin(origin, '/api/v1/users', '/', '/asdf', '/')).toBe(origin + '/');

        // test ./
        expect(urlJoin(origin, '/api/v1/users', './')).toBe(origin + '/api/v1');
        expect(urlJoin(origin, '/api/v1/users', './asdf')).toBe(origin + '/api/v1/asdf');
        expect(urlJoin(origin, '/api/v1/users', './', '/asdf')).toBe(origin + '/asdf');
        expect(urlJoin(origin, '/api/v1/users', './', '/asdf', '/')).toBe(origin + '/');

        // test ../
        expect(urlJoin(origin, '/api/v1/users', '../')).toBe(origin + '/api');
        expect(urlJoin(origin, '/api/v1/users', '../asdf')).toBe(origin + '/api/asdf');
        expect(urlJoin(origin, '/api/v1/users', '../', '/asdf')).toBe(origin + '/asdf');
        expect(urlJoin(origin, '/api/v1/users', '../', './asdf')).toBe(origin + '/asdf');
        expect(urlJoin(origin, '/api/v1/users', '../../../../../')).toBe(origin + '/');

    });
});

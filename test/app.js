import { request, expect } from './helpers';


describe('Routes Index', () => {
    describe('Route GET /', () => {
        it('should return a 200 response', (done) => {
            request
                .get('/')
                .set('Accept', 'application/json')
                .expect(200, done);
        });
    });
});

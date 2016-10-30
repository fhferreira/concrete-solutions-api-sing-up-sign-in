import { request, expect } from './helpers';


describe('Routes Index', () => {
  describe('Route GET /', () => {
    it('should return a 404 response', (done) => {
      request
                .get('/')
                .set('Accept', 'application/json')
                .expect(404, done);
    });
  });

  describe('Route GET /api', () => {
    it('should return a 404 response not found', (done) => {
      request
                .get('/api')
                .set('Accept', 'application/json')
                .expect(404, done);
    });
  });
});

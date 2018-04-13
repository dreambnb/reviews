//const app = require('../server');
var request = require('request');

describe('server', function() {
    it('should respond to GET requests for /reviews with a 200 status code', function (done) {
        request({method: 'GET',
                uri : 'http://127.0.0.1:3000/reviews/1'},
                function(error, response, body) {
            expect(response.statusCode).toBe(200);
            done();
          });
    });

    it('Should 404 when asked for a nonexistent endpoint', function(done) {
        request('http://127.0.0.1:3000/arglebargle', function(error, response, body) {
          expect(response.statusCode).toBe(404);
          done();
        });
      });
    
      it('Should 404 when asked for a nonexistent endpoint', function(done) {
        request('http://127.0.0.1:3000/arglebargle', function(error, response, body) {
          expect(response.statusCode).toBe(404);
          done();
        });
      });
});


const db = require('../db')
describe('db test for creating and finding reviews', function() {
    
    it('should find reviews from db', function (done) {
        // var sampleData = [{
        //     locationId : 0,
        //     customerName : 'From test 1', 
        //     customerProfilePhotoUrl : 'From test 1',
        //     customerReview : 'From test 1',
        //     createdAt : new Date(),
        //     ratingCleanliness : 1,
        //     ratingCheckIn : 1,
        //     ratingLocation : 1,
        //     ratingValue : 1
        // }]
        // var callback = ((err, results) => {
        //     if (err) {
        //     console.log('db.test error ocured in saving to db-', err);
        //     }
        //     console.log('db.test results saving to db-', results);
        //     expect(results[0]['customerName']).toBe('From test 1');
        //     done();
        // });

        db.find(1, (err, result) => {
            expect(result.length).toBeGreaterThan(0);
            done();
        });       
    });

    it('should return empty array when locationId is not present in db', function (done) {
        db.find(10001, (err, result) => {

            expect(result.length).toBe(0);
            done();
        });
    });

});
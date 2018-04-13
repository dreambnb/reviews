const db = require('../db')
describe('db test for creating and finding reviews', function() {
    
    it('should save and find reviews from db', function () {
        var sampleData = [{
            houseId : 0,
            customerName : 'From test 1', 
            customerProfilePhotoUrl : 'From test 1',
            customerReview : 'From test 1',
            createdAt : new Date(),
            ratingCleanliness : 1,
            ratingCheckIn : 1,
            ratingLocation : 1,
            ratingValue : 1
        }]
        var callback = function(err, results) {
            if (err) {
            console.log('db.test error ocured in saving to db-', err);
            }
            console.log('db.test results saving to db-', results);
            expect(results[0]['customerName']).toBe('From test 1');
        }
        db.save(sampleData, callback);
        
    });
});
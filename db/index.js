const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/review');

//create a review schema
let ReviewSchema = mongoose.Schema({
    //reviewId : {type: Number, unique: true},
    houseId : Number,
    customerName : String, 
    customerProfilePhotoUrl : String,
    customerReview : String,
    createdAt : Date,
    ratingCleanliness : Number,
    ratingCheckIn : Number,
    ratingLocation : Number,
    ratingValue : Number
});

let Review = mongoose.model('Review', ReviewSchema);

//save reviews in db
let save = function(sampleReviews, callback) {
    var sampleReviewsObject = sampleReviews.map (function(review) {
        return new Review ({
            houseId : review.houseId,
            customerName : review.customerName, 
            customerProfilePhotoUrl : review.customerProfilePhotoUrl,
            customerReview : review.customerReview,
            createdAt : review.createdAt,
            ratingCleanliness : review.ratingCleanliness,
            ratingCheckIn : review.ratingCheckIn,
            ratingLocation : review.ratingLocation,
            ratingValue : review.ratingValue
        });
    });
    Review.create(sampleReviewsObject, function(err) {
        if (err) {
            console.log('error in db while adding into db-', err);
            callback(err, null)
            return;
        }
        console.log('saved into db successfully-');
        callback(null, 'saved into db');
    })

}
// get reviews from db
let find = function(callback) {
    Review.find(function(err, results) {
        if (err) {
            callback(err, null);
            return;
        }
        callback(null, results);
        return;
    })
}
module.exports.save = save;
module.exports.find = find;

var sampleReviews = 
    [{
        houseId : 1,
        customerName : 'customer1', 
        customerProfilePhotoUrl : 'url1',
        customerReview : 'text1',
        createdAt : new Date(),
        ratingCleanliness : 1,
        ratingCheckIn : 1,
        ratingLocation : 1,
        ratingValue : 1
    },
    {
        houseId : 2,
        customerName : 'customer2', 
        customerProfilePhotoUrl : 'url2',
        customerReview : 'text2',
        createdAt : new Date(),
        ratingCleanliness : 1,
        ratingCheckIn : 1,
        ratingLocation : 1,
        ratingValue : 1
    },
    {
        houseId : 3,
        customerName : 'customer3', 
        customerProfilePhotoUrl : 'url3',
        customerReview : 'text3',
        createdAt : new Date(),
        ratingCleanliness : 1,
        ratingCheckIn : 1,
        ratingLocation : 1,
        ratingValue : 1
    }
    ];
// save(sampleReviews, function(err, results) {
//     if (err) {
//         console.log('error ocured in saving to db-', err);
//     }
//     console.log('results saving to db-', results);
// });

//create fake data using faker.js
const sampleReviewsFromFaker = {
    houseId : 3,
    customerName : 'customer3', 
    customerProfilePhotoUrl : 'url3',
    customerReview : 'text3',
    createdAt : new Date(),
    ratingCleanliness : 1,
    ratingCheckIn : 1,
    ratingLocation : 1,
    ratingValue : 1
}
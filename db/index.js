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
    Review.create(sampleReviewsObject, function(err, results) {
        if (err) {
            console.log('error in db while adding into db-', err);
            callback(err, null)
            return;
        }
        console.log('saved into db successfully-');
        callback(null, results);
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
    },
    {
        houseId : 4,
        customerName : 'customer4', 
        customerProfilePhotoUrl : 'url4',
        customerReview : 'text4',
        createdAt : new Date(),
        ratingCleanliness : 1,
        ratingCheckIn : 1,
        ratingLocation : 1,
        ratingValue : 1
    },
    {
        houseId : 5,
        customerName : 'customer5', 
        customerProfilePhotoUrl : 'url5',
        customerReview : 'text5',
        createdAt : new Date(),
        ratingCleanliness : 1,
        ratingCheckIn : 1,
        ratingLocation : 1,
        ratingValue : 1
    },
    {
        houseId : 6,
        customerName : 'customer6', 
        customerProfilePhotoUrl : 'url6',
        customerReview : 'text6',
        createdAt : new Date(),
        ratingCleanliness : 1,
        ratingCheckIn : 1,
        ratingLocation : 1,
        ratingValue : 1
    },
    {
        houseId : 7,
        customerName : 'customer7', 
        customerProfilePhotoUrl : 'url7',
        customerReview : 'text7',
        createdAt : new Date(),
        ratingCleanliness : 1,
        ratingCheckIn : 1,
        ratingLocation : 1,
        ratingValue : 1
    },
    {
        houseId : 8,
        customerName : 'customer8', 
        customerProfilePhotoUrl : 'url8',
        customerReview : 'text8',
        createdAt : new Date(),
        ratingCleanliness : 1,
        ratingCheckIn : 1,
        ratingLocation : 1,
        ratingValue : 1
    },
    {
        houseId : 9,
        customerName : 'customer9', 
        customerProfilePhotoUrl : 'url9',
        customerReview : 'text9',
        createdAt : new Date(),
        ratingCleanliness : 1,
        ratingCheckIn : 1,
        ratingLocation : 1,
        ratingValue : 1
    },
    {
        houseId : 10,
        customerName : 'customer10', 
        customerProfilePhotoUrl : 'url10',
        customerReview : 'text10',
        createdAt : new Date(),
        ratingCleanliness : 1,
        ratingCheckIn : 1,
        ratingLocation : 1,
        ratingValue : 1
    },
    {
        houseId : 11,
        customerName : 'customer11', 
        customerProfilePhotoUrl : 'url11',
        customerReview : 'text11',
        createdAt : new Date(),
        ratingCleanliness : 1,
        ratingCheckIn : 1,
        ratingLocation : 1,
        ratingValue : 1
    },
    {
        houseId : 12,
        customerName : 'customer12', 
        customerProfilePhotoUrl : 'url12',
        customerReview : 'text12',
        createdAt : new Date(),
        ratingCleanliness : 1,
        ratingCheckIn : 1,
        ratingLocation : 1,
        ratingValue : 1
    },
    {
        houseId : 13,
        customerName : 'customer13', 
        customerProfilePhotoUrl : 'url13',
        customerReview : 'text13',
        createdAt : new Date(),
        ratingCleanliness : 1,
        ratingCheckIn : 1,
        ratingLocation : 1,
        ratingValue : 1
    },
    {
        houseId : 14,
        customerName : 'customer14', 
        customerProfilePhotoUrl : 'url14',
        customerReview : 'text14',
        createdAt : new Date(),
        ratingCleanliness : 1,
        ratingCheckIn : 1,
        ratingLocation : 1,
        ratingValue : 1
    },
    {
        houseId : 15,
        customerName : 'customer15', 
        customerProfilePhotoUrl : 'url15',
        customerReview : 'text15',
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
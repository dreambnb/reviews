//

const { name, image, lorem, date } = require('faker');
const fs = require('fs');

var generateReviewsNumber = function() {
  return Math.floor(Math.random() * 5);
}

var createFakeData = function(startListing, endListing, fileName) {
  let batch = '';
  for (let i = startListing; i <= endListing; i++) {
    let totalReviews = generateReviewsNumber();
      for (let j = 0; j <= totalReviews; j++) {
        var listing = {
          locationId : i,
          customerName : name.firstName(), 
          customerProfilePhotoUrl : image.avatar(),
          customerReview : lorem.sentences(),
          createdAt : date.between('2018-02-01', '2018-05-02'),
          ratingAccuracy: Math.ceil(Math.random() * 5),
          ratingCommunication: Math.ceil(Math.random() * 5),
          ratingCleanliness : Math.ceil(Math.random() * 5),
          ratingCheckIn : Math.ceil(Math.random() * 5),
          ratingLocation : Math.ceil(Math.random() * 5),
          ratingValue : Math.ceil(Math.random() * 5)
      }
      batch += JSON.stringify(listing) + '\n';
    }
    if ( i % 10000 === 0) {
      console.log(`function is still working...seeding #${i}`)
      fs.appendFileSync(fileName, batch);
      batch = '';
    }
  }
}

module.exports.createFakeData = createFakeData;
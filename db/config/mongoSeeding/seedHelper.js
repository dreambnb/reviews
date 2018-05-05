// This script contains a function for creating fake data en masse, and 
// writing it to a file of your choice.
// I call this function in seed1.js, seed2.js, seed3.js, and seed4.js. 
// These files respectively create 2.5 million listings each.
// Each listing creates between 1 and 5 documents, that represent the reviews of that listing
// Therefore, I am actually seeding ~30 million entries rather than 10 million
// You can run all 4 files at once with `npm run fakeData`.

// Once that script finishes (~6 minutes), run `npm run db`
// This will upload the file to mongoDB (~9 minutes) for a total seed time of ~15 minutes

// After you have seeded the database, open mongo, and go to the Reviews database.
// Then index the database with 
// `db.reviews.createIndex({ locationId: 1 })`

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
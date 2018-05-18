const mongoose = require('mongoose');
mongoose.connect('mongodb://ec2-52-14-26-218.us-east-2.compute.amazonaws.com/reviews');
const db = require('../../index.js');
// Seed data directly to Mongo,
// unlike seedHelper.js which writes data to a file

const { name, image, lorem, date } = require('faker');
const fs = require('fs');

var generateReviewsNumber = function() {
  return Math.floor(Math.random() * 5);
}

let count = 0;
async function seeder() {
  for (let i = 0; i < 1000; i += 1) {
    let batch = [];
    for (let j = 0; j < 10000; j += 1) {
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
      batch.push(listing);
      count += 1;
    }
    await db.Review.insertMany(batch); 
    if(count % 10000 === 0) {
      console.log(count);
    }
    if(count === 10000000) {
      console.log('10 mil entries seeded');
    }
  }
}
seeder();
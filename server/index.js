var nr = require('newrelic');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const responseTime = require('response-time')
const redis = require('redis');
const db = require('../db/index.js');

// var host = process.env.NODE_ENV === 'production' ? 'ec2-13-58-30-232.us-east-2.compute.amazonaws.com' : 'localhost';
var host = 'localhost';

const client = redis.createClient('6379', host);

// if an error occurs, print it to the console
client.on('error', function (err) {
    console.log("Error " + err);
});

client.on('ready',function() {
console.log("Redis is ready");
});

let app = express();
app.use(bodyParser.json());

// for crossoriginrequest
app.use(cors());

app.use(responseTime());

//server static content
app.use('/rooms/:roomid', express.static(path.join(__dirname, '../client/dist')));

app.get('/reviews', function (req, res) {
    const locationId = req.query.locationId;
    console.log('location id is ', locationId)

    // use the redis client 
    client.get(locationId, function (error, result) {
        if (result) {
            // the result exists in our cache - return it to the user immediately
            console.log('from Redis')
            const { getFive, totalReviews, searchResultsReviewsTotal, averageRatings } = result;
            res.send(result);
        } else {
            // we couldn't find the key in our cache, so we'll get it from our db
            const pageIndex = Number(req.query.index);
            console.log('page index is ', pageIndex)
            if (locationId === undefined) {res.sendStatus(404);return;
            }
            const startIndex = 5 * (pageIndex - 1);
            const endIndex = 5 * pageIndex;
            db.find(locationId, function (err, results) {
                if (err) {
                    res.sendStatus(404);
                } else {
                  //get reviews of each customer
                  const reviewInfo = results.map(review => {
                      return {
                          customerName: review.customerName,
                          createdAt: review.createdAt,
                          customerProfilePhotoUrl: review.customerProfilePhotoUrl,
                          customerReview: review.customerReview,}
                  });
                  const averageRatings = calculateRatings(results);
                  let getFive = reviewInfo.slice(startIndex, endIndex);
                  let totalReviews = reviewInfo.length;
                  let searchResults = [];
                  let searchResultsReviewsTotal = 0;
                  if (req.query.keyword) {
                      searchResults = reviewInfo.filter(review => {
                          return (review['customerReview'].indexOf(req.query.keyword)) > -1;
                      });
                      getFive = searchResults.slice(startIndex, endIndex);
                      searchResultsReviewsTotal = searchResults.length;
                      // PRIYA: Ask Sujitha why she is calling setex within the search keyword. I don't understand what's happening here.
                      client.setex(locationId, 60, JSON.stringify({getFive, totalReviews, searchResultsReviewsTotal, averageRatings}));
                      res.json({ getFive, totalReviews, searchResultsReviewsTotal});
                  } else {
                      searchResultsReviewsTotal = totalReviews;
                      client.setex(locationId, 60, JSON.stringify({getFive, totalReviews, searchResultsReviewsTotal, averageRatings}));
                      res.json({ getFive, totalReviews, searchResultsReviewsTotal, averageRatings });
                  }
                }
            });  
        }
    });
})

    const calculateRatings = (results) => {
        // console.log('results inside server index-',results)
        var ratingAccuracy = { total: 0, count: 0 };
        var ratingCommunication = { total: 0, count: 0 };
        var ratingCleanliness = { total: 0, count: 0 };
        var ratingCheckIn = { total: 0, count: 0 };
        var ratingLocation = { total: 0, count: 0 };
        var ratingValue = { total: 0, count: 0 };
        for (var i = 0; i < results.length; i++) {
            if (results[i].ratingAccuracy) {
                ratingAccuracy.total += results[i].ratingAccuracy;
                ratingAccuracy.count++;
            }
            if (results[i].ratingCommunication) {
                ratingCommunication.total += results[i].ratingCommunication;
                ratingCommunication.count++;
            }
            if (results[i].ratingCleanliness) {
                ratingCleanliness.total += results[i].ratingCleanliness;
                ratingCleanliness.count++;
            }
            if (results[i].ratingCheckIn) {
                ratingCheckIn.total += results[i].ratingCheckIn;
                ratingCheckIn.count++;
            }
            if (results[i].ratingLocation) {
                ratingLocation.total += results[i].ratingLocation;
                ratingLocation.count++;
            }
            if (results[i].ratingValue) {
                ratingValue.total += results[i].ratingValue;
                ratingValue.count++;
            }
        }
        var averageRatings = {};
        averageRatings.Accuracy = +(Math.round((ratingAccuracy.total / ratingAccuracy.count) + 'e+1') + 'e-1');
        averageRatings.Communication = +(Math.round((ratingCommunication.total / ratingCommunication.count) + 'e+1') + 'e-1');
        averageRatings.Cleanliness = +(Math.round((ratingCleanliness.total / ratingCleanliness.count) + 'e+1') + 'e-1');
        averageRatings.CheckIn = +(Math.round((ratingCheckIn.total / ratingCheckIn.count) + 'e+1') + 'e-1');
        averageRatings.Location = +(Math.round((ratingLocation.total / ratingLocation.count) + 'e+1') + 'e-1');
        averageRatings.Value = +(Math.round((ratingValue.total / ratingValue.count) + 'e+1') + 'e-1');
        averageRatings.overallRating = +(Math.round(((averageRatings.Accuracy + averageRatings.Communication + averageRatings.Cleanliness + averageRatings.CheckIn +
            averageRatings.Location + averageRatings.Value) / 4) + 'e+1') + 'e-1');
        return averageRatings;
    }

    app.post('/reviews/:locationId', function (req, res) {
        db.save(req.body, function (err, results) {
            if (err) {
                console.log('error ocured in saving to db-', err);
                res.sendStatus(404);
            } else {
                console.log('results saving to db-', results);
                res.sendStatus(201);
            }

        });
    });

    var port = process.env.PORT || 8080

    app.listen(port, function () {
        console.log(`listening on port ${port}`);

    });

    module.exports.app = app;
const express = require('express');
const db = require('../db/index.js');
const bodyParser = require('body-parser');
// for cross-origin-request
const cors = require('cors');
const path = require('path');

let app = express();
app.use(bodyParser.json());
app.use(cors());

//server static content
app.use(express.static(path.join(__dirname, '../client/dist')))
app.get('/reviews', function(req, res) {
    var pageIndex = Number(req.url.split('=')[1]);
    var getFive; var len;   
    var endIndex = pageIndex + 5;
    var startIndex = pageIndex;
    var reviewInfo; 
    console.log('inside app get method-', req.url, reviewInfo)
    //if (pageIndex === 0) {
        db.find(function(err, results) {
            if (err) {
                console.log('server index err while fetching data from db-', err);
                res.sendStatus(404);
            }
            // console.log('server index.js results-', results);
            //get reviews of each customer
            reviewInfo = results.map(review => {
                return {customerName : review.customerName,
                        createdAt : review.createdAt,
                        customerProfilePhotoUrl : review.customerProfilePhotoUrl,
                        customerReview: review.customerReview,
                        }
            })
            //get ratings from customers and calculate average rating
            getFive = reviewInfo.slice(pageIndex, endIndex);
            console.log('this is reviewInfo reviews-', getFive, pageIndex, endIndex);
            len = reviewInfo.length;
            //sending reviews and ratings separately
            res.json({getFive, len});
        })
   // }
    // } else {
    //     getFive = reviewInfo.slice(pageIndex, endIndex);
    //     res.json({getFive, len});
    // }
});

let port = 3000;

app.listen(port, function () {
  console.log(`listening on port ${port}`);
});

module.exports.app = app;
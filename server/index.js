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
app.get('/reviews/:location_id', function(req, res) {
    db.find(req.params.location_id, function(err, results) {
        if (err) {
            console.log('server index err while fetching data from db-', err);
            res.sendStatus(404);
        } else {
        // console.log('server index.js results-', results);
        //get reviews of each customer
            reviewInfo = results.map(review => {
                return {customerName : review.customerName,
                    createdAt : review.createdAt,
                    customerProfilePhotoUrl : review.customerProfilePhotoUrl,
                    customerReview: review.customerReview,
                }
            });
            res.json(reviewInfo);
        }
    });
});

let port = 3000;

app.listen(port, function () {
  console.log(`listening on port ${port}`);
});

module.exports.app = app;
import React from 'react';
import sinon from 'sinon';
import Review from '../src/components/Review.jsx';
import Ratings from '../src/components/Ratings.jsx';
import ReviewItem from '../src/components/ReviewItem.jsx';

describe('<Review/>', () => {
  test('Should get all reviews from the server upon mounting', () => {
    sinon.spy(Review.prototype, 'getReviews');
    const wrapper = mount( <Review locationId={1} /> );
    expect(Review.prototype.getReviews.calledOnce).toBe(true);
    Review.prototype.getReviews.restore();
  });
});

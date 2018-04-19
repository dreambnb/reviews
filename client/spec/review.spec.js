import React from 'react';
import Review from '../src/components/Review.jsx';
import Ratings from '../src/components/Ratings.jsx';
import Paginations from '../src/components/Paginations.jsx';
import { shallow, render, mount } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import sinon from 'sinon';

Enzyme.configure({ adapter: new Adapter() });


// Make Enzyme functions available in all test files without importing
// global.shallow = shallow;
// global.render = render;
// global.mount = mount;

describe('Review component testing', () => {  
  let wrapper;
  it('Should call getReviews and renderReviews  upon mounting', () => {
    console.log('inside-', Review.prototype);
    const spyGetReview = sinon.spy(Review.prototype, 'getReviews');
    const spyRenderReview = sinon.spy(Review.prototype, 'renderReviews');

    wrapper = mount( <Review locationId={1}/> );
    expect(spyGetReview.calledOnce).toBe(true);
    expect(spyRenderReview.calledOnce).toBe(true);
    spyGetReview.restore();
    spyRenderReview.restore();
  });
  
  it('Should have Ratings and Paginations as children', () => {
    expect(wrapper.find(Ratings)).toHaveLength(1);
    expect(wrapper.find(Paginations)).toHaveLength(1);
  });
  
  it('Should have expected props for Ratings', () => {
    const expectedPropsForRatings = {
      averageRatings: [],
      searchKeyword: (keyword) => null,
      totalReviews: -1,
    }
    expect(wrapper.find(Ratings).prop('averageRatings')).toEqual([]);
    expect(wrapper.find(Ratings).prop('totalReviews')).toEqual(0);
  });

  it('Should have expected props for Paginations', () => {
    const expectedPropsForPaginations = {
      searchReviews: 0,
    }
    expect(wrapper.find(Paginations).prop('searchReviews')).toEqual(0);
  });
});
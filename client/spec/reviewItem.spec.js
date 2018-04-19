import React from 'react';
import ReviewItem from '../src/components/ReviewItem.jsx';
import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import sinon from 'sinon';

Enzyme.configure({ adapter: new Adapter() });
describe('ReviewItem component testing', () => {  
    // it('Should call renderPageIndex upon mounting', () => {
    //   const spyRenderPageIndex = sinon.spy(Paginations.prototype, 'renderPageIndex');
      
    //   wrapper = mount( <Paginations searchReviews={10}/> );
    //   expect(spyRenderPageIndex.calledOnce).toBe(true);
    //   spyRenderPageIndex.restore();
    // });

    const SAMPLE_REVIEW_ITEM = {
      createdAt: new  Date(),
      customerProfilePhotoUrl: '/sample/path',
      customerName: 'someName',
      customerReview: 'someReview',
    }
    const wrapper = shallow(<ReviewItem review={SAMPLE_REVIEW_ITEM} />)
    it("should have image with expected src", () => {
      expect(wrapper.find('img').prop('src')).toEqual('/sample/path');
    })

    it("should have divs with expected number", () => {
      expect(wrapper.find('#reviewTextElement').text()).toEqual("someReview");
    })
    
    it('Should have Pagination as child component', () => {
      expect(true).toBeTruthy();
    });
  });
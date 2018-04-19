import React from 'react';
import Ratings from '../src/components/Ratings.jsx';
import StarWidget from '../src/components/StarWidget.jsx';
import Search from '../src/components/Search.jsx';
import { shallow, render, mount } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import sinon from 'sinon';

Enzyme.configure({ adapter: new Adapter() });
describe('Ratings component testing', () => {  
    let wrapper;
    it('Should call renderLeftRatings and renderRightRatings  upon mounting', () => {
      const spyRenderLeftRatings = sinon.spy(Ratings.prototype, 'renderLeftRatings');
      const spyRenderRightRatings = sinon.spy(Ratings.prototype, 'renderRightRatings');
      const ratingsProps = {
            'Accuracy': 1,
            'Communication': 1,
            'Value': 1,
            'overallRating': 1
        }
      wrapper = mount( <Ratings averageRatings={ratingsProps}/> );
      expect(spyRenderLeftRatings.calledOnce).toBe(true);
      expect(spyRenderRightRatings.calledOnce).toBe(true);
      spyRenderLeftRatings.restore();
      spyRenderRightRatings.restore();
    });
    
    it('Should have StarWidget as child component', () => {
      expect(wrapper.find(StarWidget)).toHaveLength(7);
    });

    it('Should have Search as child component', () => {
        expect(wrapper.find(Search)).toHaveLength(1);
      });
  });
import React from 'react';
import Paginations from '../src/components/Paginations.jsx';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import sinon from 'sinon';

describe('Paginations component testing', () => {  
    let wrapper;
    it('Should call renderPageIndex upon mounting', () => {
      const spyRenderPageIndex = sinon.spy(Paginations.prototype, 'renderPageIndex');
      
      wrapper = mount( <Paginations searchReviews={10}/> );
      expect(spyRenderPageIndex.calledOnce).toBe(true);
      spyRenderPageIndex.restore();
    });
    
    it('Should have Pagination as child component', () => {
      expect(wrapper.find(PaginationItem)).toHaveLength(2);
    });
  });
import React from 'react';
import Search from '../src/components/Search.jsx';
import sinon from 'sinon';

describe('Search component testing', () => {
    const spyRenderPageIndex = sinon.spy(Search.prototype, '_handleKeyPress');
    const sampleCb = jest.fn();

    afterEach(() => {
        sampleCb.mockReset();
        spyRenderPageIndex.reset();
    })

    afterAll(() => {
        sambleCb.mockRestore();
        spyRenderPageIndex.restore();
    })

    it('Should call renderPageIndex upon mounting', () => {
        const SAMPLE_INPUT = "abc";
        const wrapper = shallow(<Search searchReviews={10} cb={sampleCb} />);
        wrapper.find('input').simulate('keypress', { key: 'Enter', target: { value: SAMPLE_INPUT } });
        wrapper.update();
        expect(spyRenderPageIndex.calledOnce).toBe(true);
        expect(sampleCb.mock.calls[0][0]).toBe(SAMPLE_INPUT);
    });
});
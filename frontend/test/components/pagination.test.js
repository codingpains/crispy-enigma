import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import Pagination from '../../src/components/pagination';

describe('Pagination', () => {
  let onPageChange, nextPage, prevPage;
  beforeEach(() => {
      onPageChange = sinon.spy();
      nextPage = 2;
      prevPage = null;
  });

  it('should render with correct class', () => {
    const wrapper = shallow(
      <Pagination onPageChange={onPageChange} nextPage={nextPage} prevPage={prevPage}/>
    );
    expect(wrapper.hasClass('pagination'));
  });

  it('should have a next page link', () => {
    const wrapper = shallow(
      <Pagination onPageChange={onPageChange} nextPage={nextPage} prevPage={prevPage}/>
    );
    expect(wrapper.find('.next-page.page-link')).to.have.lengthOf(1);
  });

  it('should call onPageChange with correct page upon next page click', () => {
    const wrapper = shallow(
      <Pagination onPageChange={onPageChange} nextPage={nextPage} prevPage={prevPage}/>
    );
    wrapper.find('.next-page').simulate('click');
    expect(onPageChange.calledOnce).to.be.true;
    expect(onPageChange.calledWith(25, nextPage)).to.be.true;
  });

  it('should have a prev page link', () => {
    const wrapper = shallow(
      <Pagination onPageChange={onPageChange} nextPage={nextPage} prevPage={prevPage}/>
    );
    expect(wrapper.find('.prev-page.page-link')).to.have.lengthOf(1);
  });

  it('should call onPageChange with correct page upon prev page click', () => {
    const wrapper = shallow(
      <Pagination onPageChange={onPageChange} nextPage={nextPage} prevPage={prevPage}/>
    );
    wrapper.find('.prev-page').simulate('click');
    expect(onPageChange.calledOnce).to.be.true;
    expect(onPageChange.calledWith(25, prevPage)).to.be.true;
  });

});

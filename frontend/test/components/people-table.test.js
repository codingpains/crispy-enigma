import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import { PeopleTable } from '../../src/components/people-table';
import PersonRow from '../../src/components/people-table/person-row';
import Pagination from '../../src/components/pagination';


describe('PeopleTable', () => {
  let onLoadPeople, people, subject, prevPage, nextPage;
  beforeEach(() => {
    onLoadPeople = sinon.spy();
    prevPage = null;
    nextPage = 2;
    people = [
      {firstName: 'Jon', lastName: 'Snow', title: 'Lord Commander', emailAddress: 'jon@nightswatch.com'},
      {firstName: 'Jora', lastName: 'Mormont', title: 'Friendzone Expert', emailAddress: 'ilovedanny@exile.com'},
    ];
    subject = shallow(
      <PeopleTable onLoadPeople={onLoadPeople} people={people} prevPage={prevPage} nextPage={nextPage} />
    );
  });

  it('should render with correct class', () => {
    expect(subject.hasClass('people-table')).to.be.true;
  });

  it('should render pagination with correct props', () => {
    const pagination = subject.find(Pagination);
    expect(pagination).to.have.lengthOf(1);
    expect(pagination.prop('prevPage')).to.equal(prevPage);
    expect(pagination.prop('nextPage')).to.equal(nextPage);
    expect(pagination.prop('onPageChange')).to.equal(onLoadPeople);
  });

  it('should render a row for each person displayed', () => {
    expect(subject.find(PersonRow)).to.have.lengthOf(people.length);
  });
});

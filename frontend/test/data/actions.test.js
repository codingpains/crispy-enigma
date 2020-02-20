import dotenv from 'dotenv';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { expect } from 'chai';
import nock from 'nock';

dotenv.config();
console.log('ENV -> ', process.env.API_HOST)
import {
  fetchPeople,
  FETCH_PEOPLE,
  FETCH_PEOPLE_SUCCESS,
} from '../../src/data/actions';

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('fetchPeople', () => {
  afterEach(() => nock.cleanAll());

  it('creates FETCH_PEOPLE_SUCCESS after fetching people', () => {
    const mockData = {
      metatada: {},
      data: [
        { name: 'Jon Doe', email: 'some@email.com' },
        { name: 'Jane Doe', email: 'some2@email.com' },
      ]
    };

    // nock(process.env.API_HOST)
    //   .filteringPath(path => '/v2/people')
    //   .get('/people')
    //   .reply(200, mockData);

    const expectedActions = [
      { type: FETCH_PEOPLE, payload: { perPage: 25, page: 1 }},
      { type: FETCH_PEOPLE_SUCCESS, data: mockData },
    ];

    const store = mockStore({ people: [] })
    return store.dispatch(fetchPeople()).then(() => {
      console.log(store.getActions()[1])
      expect(store.getActions()).to.eql(expectedActions);
    })
  })
})

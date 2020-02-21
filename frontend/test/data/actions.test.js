import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  fetchPeople,
  fetchEmailLetterFrequencies,
  FETCH_PEOPLE,
  FETCH_PEOPLE_SUCCESS,
  FETCH_FREQUENCIES,
  FETCH_FREQUENCIES_SUCCESS,
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

    nock(process.env.API_HOST)
      .filteringPath(path => '/people')
      .get('/people')
      .reply(200, mockData);

    const expectedActions = [
      { type: FETCH_PEOPLE, payload: { perPage: 25, page: 1 }},
      { type: FETCH_PEOPLE_SUCCESS, data: mockData },
    ];

    const store = mockStore({ people: [] })
    return store.dispatch(fetchPeople()).then(() => {
      expect(store.getActions()).to.eql(expectedActions);
    });
  });
});

describe('fetchEmailLetterFrequencies', () => {
  afterEach(() => nock.cleanAll());

  it('creates FETCH_FREQUENCIES_SUCCESS after fetching email letter frequecies', () => {
    const mockData = [
      { letter: 's', frequency: 3 },
      { letter: 'c', frequency: 4 },
    ];

    nock(process.env.API_HOST)
      .get('/people/email-letters-frequency')
      .reply(200, mockData);

    const expectedActions = [
      { type: FETCH_FREQUENCIES },
      { type: FETCH_FREQUENCIES_SUCCESS, data: mockData },
    ];

    const store = mockStore({ people: [] })
    return store.dispatch(fetchEmailLetterFrequencies()).then(() => {
      expect(store.getActions()).to.eql(expectedActions);
    })
  })
});

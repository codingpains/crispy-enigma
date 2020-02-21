import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import camelobj from 'camelobj';

import {
  fetchPeople,
  fetchEmailLetterFrequencies,
  fetchDuplicatedPeople,
  types,
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
      { type: types.FETCH_PEOPLE, payload: { perPage: 25, page: 1 }},
      { type: types.FETCH_PEOPLE_SUCCESS, data: mockData },
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
      { type: types.FETCH_FREQUENCIES },
      { type: types.FETCH_FREQUENCIES_SUCCESS, data: mockData },
    ];

    const store = mockStore({ emailLetterFrequencies: [] })
    return store.dispatch(fetchEmailLetterFrequencies()).then(() => {
      expect(store.getActions()).to.eql(expectedActions);
    })
  })
});

describe('fetchDuplicatedPeople', () => {
  afterEach(() => nock.cleanAll());

  it('creates FETCH_DUPLICATED_SUCCESS after fetching email letter frequecies', () => {
    const mockData = [
      [
       {
           first_name: "Steven",
           last_name: "Pease",
           email_address: "sakatius@gmail.com"
       },
       {
           first_name: "Possibly",
           last_name: "Duplicate",
           email_address: "sakatiuss@gmail.com"
       }
     ],
    ];

    nock(process.env.API_HOST)
      .get('/people/duplicated')
      .reply(200, mockData);

    const expectedActions = [
      { type: types.FETCH_DUPLICATED },
      { type: types.FETCH_DUPLICATED_SUCCESS, data: camelobj(mockData) },
    ];

    const store = mockStore({ duplicatedPeople: [] })
    return store.dispatch(fetchDuplicatedPeople()).then(() => {
      expect(store.getActions()).to.eql(expectedActions);
    })
  })
});

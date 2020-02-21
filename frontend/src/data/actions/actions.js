import Api from '../api';
import snakeobj from 'snakeobj';
import types from './types';

export const fetchPeople = (perPage = 25, page = 1) => (
  (dispatch) => {
    dispatch({ type: types.FETCH_PEOPLE, payload: { perPage, page } });
    return Api.get('/people', { params: snakeobj({ perPage, page }) })
      .then(res => dispatch(fetchPeopleSuccess(res.data)))
      .catch(err => dispatch(fetchPeopleFailed(err)));
  }
);

const fetchPeopleSuccess = data => ({ type: types.FETCH_PEOPLE_SUCCESS, data });
const fetchPeopleFailed = error => ({ type: types.FETCH_PEOPLE_FAILED, error });

export const fetchEmailLetterFrequencies = () => (
  (dispatch) => {
    dispatch({ type: types.FETCH_FREQUENCIES });
    return Api.get('people/email-letters-frequency')
    .then(res => dispatch(fetchEmailLetterFrequenciesSuccess(res.data)))
    .catch(err => dispatch(fetchEmailLetterFrequenciesFailed(err)));
  }
);

const fetchEmailLetterFrequenciesSuccess = data => ({ type: types.FETCH_FREQUENCIES_SUCCESS, data });
const fetchEmailLetterFrequenciesFailed = error => ({ type: types.FETCH_FREQUENCIES_FAILED, error });

export const fetchDuplicatedPeople = () => (
  (dispatch) => {
    dispatch({ type: types.FETCH_DUPLICATED });
    return Api.get('people/duplicated')
    .then(res => dispatch(fetchDuplicatedPeopleSuccess(res.data)))
    .catch(err => dispatch(fetchDuplicatedPeopleFailed(err)));
  }
);

const fetchDuplicatedPeopleSuccess = data => ({ type: types.FETCH_DUPLICATED_SUCCESS, data });
const fetchDuplicatedPeopleFailed = error => ({ type: types.FETCH_DUPLICATED_FAILED, error });

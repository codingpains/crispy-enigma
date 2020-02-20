import Api from './api';
import snakeobj from 'snakeobj';

export const FETCH_PEOPLE = 'FETCH_POSTS_REQUEST';
export const FETCH_PEOPLE_SUCCESS = 'FETCH_PEOPLE_SUCCESS';
export const FETCH_PEOPLE_FAILED = 'FETCH_PEOPLE_FAILED';

export const fetchPeople = (perPage = 25, page = 1) => (
  (dispatch) => {
    dispatch({ type: FETCH_PEOPLE, payload: { perPage, page } });
    return Api.get('/people', { params: snakeobj({ perPage, page }) })
      .then(res => dispatch(fetchPeopleSuccess(res.data)))
      .catch(err => dispatch(fetchPeopleFailed(err)));
  }
);

const fetchPeopleSuccess = data => ({ type: FETCH_PEOPLE_SUCCESS, data });
const fetchPeopleFailed = error => ({ type: FETCH_PEOPLE_FAILED, error });

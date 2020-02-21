import { combineReducers } from 'redux';
import { FETCH_PEOPLE_SUCCESS, FETCH_FREQUENCIES_SUCCESS } from './actions';

const people = (state = {}, action) => {
  switch (action.type) {
    case FETCH_PEOPLE_SUCCESS:
      return { ...action.data };
    default:
      return state;
  }
};

const emailLetterFrequencies = (state = {}, action) => {
  switch (action.type) {
    case FETCH_FREQUENCIES_SUCCESS:
      return parseFrequencies(action.data);
    default:
      return state;
  }
};

const parseFrequencies = (frequecies) => {
  const result = {};
  frequecies.forEach(({letter, frequency}) => {
    result[letter] = frequency;
  });
  return result;
};

const rootReducer = combineReducers({
  people,
  emailLetterFrequencies,
});

export default rootReducer;

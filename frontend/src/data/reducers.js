import { combineReducers } from 'redux';
import { types } from './actions';

const people = (state = {}, action) => {
  switch (action.type) {
    case types.FETCH_PEOPLE_SUCCESS:
      return { ...action.data };
    default:
      return state;
  }
};

const emailLetterFrequencies = (state = {}, action) => {
  switch (action.type) {
    case types.FETCH_FREQUENCIES_SUCCESS:
      return parseFrequencies(action.data);
    default:
      return state;
  }
};

const duplicatedPeople = (state = [], action) => {
  switch (action.type) {
    case types.FETCH_DUPLICATED_SUCCESS:
      return [...action.data];
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
  duplicatedPeople,
});

export default rootReducer;

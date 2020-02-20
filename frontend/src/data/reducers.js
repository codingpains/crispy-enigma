import { combineReducers } from 'redux';
import { FETCH_PEOPLE_SUCCESS } from './actions';

function people(state = {}, action) {
  switch (action.type) {
    case FETCH_PEOPLE_SUCCESS:
      return { ...action.data };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  people,
});

export default rootReducer;

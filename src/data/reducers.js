import { combineReducers } from 'redux'

function people(state = {}, action) {
  return state;
};

const rootReducer = combineReducers({
  people,
});

export default rootReducer;

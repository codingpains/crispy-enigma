import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './data/reducers';
import Root from './components/root';

const store = createStore(
  rootReducer,
  {},
  applyMiddleware(thunkMiddleware)
);

ReactDOM.render(
  <Root store={store} />, document.getElementById('app-container'),
);

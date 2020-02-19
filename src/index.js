import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './data/reducers';
import Root from './components/root';
import App from './components/app';

const store = createStore(
  rootReducer,
  {},
  applyMiddleware(thunkMiddleware)
);

const root = (
  <Root store={store}>
    <App />
  </Root>
);

ReactDOM.render(root, document.getElementById('app-container'));

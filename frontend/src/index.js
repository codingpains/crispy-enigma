import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './data/reducers';
import Root from './components/root';
import App from './components/app';

const buildEnhancer = () => {
  if (typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
    return window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      actionsBlacklist: [],
    });
  }
  return compose;
};

const enhancer = buildEnhancer()(
  applyMiddleware(thunkMiddleware),
);
/* eslint-enable */
const store = createStore(rootReducer, {}, enhancer);

const root = (
  <Root store={store}>
    <App />
  </Root>
);

ReactDOM.render(root, document.getElementById('app-container'));

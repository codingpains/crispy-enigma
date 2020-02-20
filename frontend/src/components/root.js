import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';

const Root = ({ store, children }) => (
  <Provider store={store}>
    {children}
  </Provider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
};

export default Root;

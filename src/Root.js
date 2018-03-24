import React from 'react'; import PropTypes from 'prop-types'; 
import { Provider } from 'react-redux';
import { hot } from 'react-hot-loader';

import App from 'containers/App';
import store from 'redux/store/configureStore';

const Root = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default hot(module)(Root);

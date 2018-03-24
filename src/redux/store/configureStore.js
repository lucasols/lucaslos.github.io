import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers';
import initialState from './initialState';
import freezeState from 'redux-freeze-state';

const composeEnhancers =
typeof window === 'object' &&
window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
  }) : compose;

const store = createStore(
  freezeState(rootReducer), // rootReducer, // TODO: remove in production
  initialState,
  composeEnhancers(applyMiddleware(thunkMiddleware)),
);

if (module.hot) {
  // Enable Webpack hot module replacement for reducers
  module.hot.accept(() => {
    const nextRootReducer = require('../reducers/index'); // eslint-disable-line
    store.replaceReducer(nextRootReducer);
  });
}

export const { getState, dispatch } = store;

export default store;

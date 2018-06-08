/* eslint-disable  */
import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { fromJS } from 'immutable';
import createReducer from './reducers';

/**
 * [configureStore initiates the global redux store. Combines the initial state
 * with the history object to return a new redux store]
 * @param  {Object} [initialState={}] [initial state for the app]
 * @param  {[type]} history           [history for the app]
 * @return {[type]}                   [an instance of the redux store]
 */
export default function configureStore(initialState = {}, history) {
  const middlewares = [routerMiddleware(history)]
  const enhancers = [applyMiddleware(...middlewares)]
  // If Redux DevTools Extension is installed use it, otherwise use Redux compose

  const composeEnhancers = process.env.NODE_ENV !== 'production'
    && typeof window === 'object'
    && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // TODO Try to remove when `react-router-redux` is out of beta,
      // LOCATION_CHANGE should not be fired more than once after hot reloading
      // Prevent recomputing reducers for `replaceReducer`
      shouldHotReload: false,
    })
    : compose;

  const store = createStore(createReducer(), fromJS(initialState), composeEnhancers(...enhancers))
  return store;
}

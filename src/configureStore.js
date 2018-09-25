/* eslint-disable  */
import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { createEpicMiddleware } from 'redux-observable';
// import { fromJS } from 'immutable';

import rootReducer from './reducers';
import rootEpic from './epics'
import middlewares from './middleware';

/**
 * [configureStore initiates the global redux store. Combines the initial state
 * with the history object to return a new redux store]
 * @param  {Object} [initialState={}] [initial state for the app]
 * @param  {[type]} history           [history for the app]
 * @return {[type]}                   [an instance of the redux store]
 */
export default function configureStore(initialState = {}, history) {
  const appRouterMiddleware = routerMiddleware(history);
  const epicMiddleware = createEpicMiddleware();
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const store = createStore(
    rootReducer, // Root reducer
    initialState, // Initial state
    composeEnhancers(
      applyMiddleware(
        appRouterMiddleware,        
        ...middlewares,
        epicMiddleware,
      )  
    )
  )
  epicMiddleware.run(rootEpic);
  return store;
}

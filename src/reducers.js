// import { fromJS } from 'immutable';
import { combineReducers } from 'redux-immutable';
import { LOCATION_CHANGE } from 'react-router-redux';

// import globalReducer from 'containers/App/reducer';
/**
 * [routeInitialState initial route description for app]
 * @type {Object}
 */
const routeInitialState = {
  location: null,
};
/**
 * [routeReducer reducer for route management]
 * @param  {Object} [state=routeInitialState] [takes the initial route stater]
 * @param  {String} action                    [takes a route action]
 * @return {Object}                           [a new state]
 */
function routeReducer(state = routeInitialState, action) {
  switch (action.type) {
    case LOCATION_CHANGE:
      return {
        ...state,
        location: action.payload,
      };
    default:
      return state;
  }
}
/**
 * [createReducer combines the route reducers with the injectedReducers]
 * @param  {Object} injectedReducers [custom reducers for every component]
 * @return {Object}                  [combined reducer object]
 */
export default function createReducer(injectedReducers) {
  return combineReducers({
    route: routeReducer,
    // global: injectedReducers,
  });
}

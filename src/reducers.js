// imoprt { fromJS } from  'immutable';
import { combineReducers } from 'redux-immutable';
import { LOCATION_CHANGE } from 'react-router-redux';

// import globalReducer from 'containers/App/reducer';


const routeInitialState = {
    location: null,
}

function routeReducer(state = routeInitialState, action) {
    switch(action.type) {
        case LOCATION_CHANGE:
            return {
                ...state,
                location: action.payload,
            }
        default:
            return state;
    }
}

export default function createReducer(injectedReducers) {
    return combineReducers({
        route: routeReducer,
        // global: globalReducer,        
    });
}
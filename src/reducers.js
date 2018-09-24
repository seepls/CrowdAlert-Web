import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import sidebarReducer from './components/Sidebar/reducers';
import mapReducer from './components/Map/reducers';
import feedReducer from './containers/Feed/reducers';
import eventReducer from './containers/Viewevent/reducer';
import eventPreviewReducer from './components/EventPreviewCard/reducers';
import geoLocatorReducer from './components/Geolocator/reducers';
import createEventsReducer from './containers/CreateEvent/reducers';

const rootReducer = combineReducers({
  router: routerReducer,
  sidebar: sidebarReducer,
  map: mapReducer,
  feed: feedReducer,
  event: eventReducer,
  eventPreview: eventPreviewReducer,
  geoLocator: geoLocatorReducer,
  createEvents: createEventsReducer,
});

export default rootReducer;

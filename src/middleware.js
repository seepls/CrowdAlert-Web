import { updateLocationMiddleware, fetchEventsOnMapUpdateMiddleware } from './containers/Feed/middleware';
import fetchEventDataMiddleware from './containers/Viewevent/middleware';
import eventPreviewMiddleware from './components/EventPreviewCard/middleware';
import geoLocationMiddleware from './components/Geolocator/middleware';
import createEventsMiddleware from './containers/CreateEvent/middleware';

const middlewares = [
  updateLocationMiddleware,
  fetchEventsOnMapUpdateMiddleware,
  fetchEventDataMiddleware,
  eventPreviewMiddleware,
  geoLocationMiddleware,
  createEventsMiddleware,
];

export default middlewares;

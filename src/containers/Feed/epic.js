// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/observable/dom/ajax';
/* global window */
import { ajax } from 'rxjs/observable/dom/ajax';
import { ofType, combineEpics } from 'redux-observable';
import { mergeMap, map, takeUntil, debounceTime } from 'rxjs/operators';
import { GET_EVENTS_BY_LOCATION, GET_LOCATION_BY_IP } from '../../utils/apipaths';

import {
  fetchUserLocationFinished,
  fetchEventsByLocationFinished,
} from './actions';

import { 
  FEED_FETCH_USER_LOCATION,
  FEED_FETCH_USER_LOCATION_CANCEL,
  FEED_FETCH_EVENTS_BY_LOCATION,
  FEED_FETCH_EVENTS_BY_LOCATION_CANCEL,
} from './actionTypes';

const fetchUserLocationEpic = action$ =>
  action$.pipe(
    ofType(FEED_FETCH_USER_LOCATION),
    mergeMap((action) => {
      const apiUrl = GET_LOCATION_BY_IP;
      const { payload } = action;
      return ajax
        .getJSON(apiUrl)
        .pipe(
          map(response => fetchUserLocationFinished({ ...payload, ...response })),
          takeUntil(action$.pipe(ofType(FEED_FETCH_USER_LOCATION_CANCEL))),
          // catchError(error => fetchUserLocation(error)),
        );
    }),
  );

const fetchEventsByLocationEpic = action$ =>
  action$.pipe(
    ofType(FEED_FETCH_EVENTS_BY_LOCATION),
    debounceTime(500),
    mergeMap((action) => {
      let maxPixels = 1920;
      try {
        maxPixels = Math.max(window.innerHeight, window.innerWidth);
      } catch (error) {
        maxPixels = 1920;
      }
      const { payload } = action;
      const { lat } = payload;
      const { lng } = payload;
      const { zoom } = payload;
      // https://gis.stackexchange.com/a/127949
      // metres per pixel
      const MPP = ((156543.03392 * Math.cos((lat * Math.PI) / 180)) / (2 ** zoom));
      const distance = Math.ceil(((MPP) * maxPixels) / 1000) + 1;
      const apiUrl =
      `${GET_EVENTS_BY_LOCATION}?lat=${lat}&long=${lng}&dist=${distance}&min=${MPP*0.04}`;

      return ajax
        .getJSON(apiUrl)
        .pipe(
          map(response => fetchEventsByLocationFinished({ payload, response })),
          takeUntil(action$.pipe(ofType(FEED_FETCH_EVENTS_BY_LOCATION_CANCEL))),
        );
    }),
  );

const epics = combineEpics(fetchUserLocationEpic, fetchEventsByLocationEpic);

export default epics;

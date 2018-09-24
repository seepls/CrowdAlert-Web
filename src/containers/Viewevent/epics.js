import { ajax } from 'rxjs/observable/dom/ajax';
import { ofType, combineEpics } from 'redux-observable';
import { mergeMap, map, takeUntil } from 'rxjs/operators';
import {
  fetchEventDataFinished,
  fetchReverseGeocodeSuccess,
} from './actions';

import {
  GET_EVENT_BY_ID,
  REVERSE_GEOCODE,
} from '../../utils/apipaths';

import {
  EVENT_FETCH_EVENT_DATA,
  EVENT_FETCH_EVENT_DATA_CANCEL,
  EVENT_FETCH_REVERSE_GEOCODE,
} from './actionTypes';

const fetchEventDataEpic = action$ =>
  action$.pipe(
    ofType(EVENT_FETCH_EVENT_DATA),
    mergeMap((action) => {
      const { payload } = action;
      const apiUrl = `${GET_EVENT_BY_ID}?id=${payload.eventid}`;
      return ajax
        .getJSON(apiUrl)
        .pipe(
          map(response => fetchEventDataFinished({ ...payload, ...response })),
          takeUntil(action$.pipe(ofType(EVENT_FETCH_EVENT_DATA_CANCEL))),
        );
    }),
  );

const fetchReverseGeocodeEpic = action$ =>
  action$.pipe(
    ofType(EVENT_FETCH_REVERSE_GEOCODE),
    mergeMap((action) => {
      const { lat, lng } = action.payload;
      const apiUrl = `${REVERSE_GEOCODE}?lat=${lat}&long=${lng}`;
      return ajax
        .getJSON(apiUrl)
        .pipe(map(response => fetchReverseGeocodeSuccess(response)));
    }),
  );

const epics = combineEpics(fetchEventDataEpic, fetchReverseGeocodeEpic);

export default epics;

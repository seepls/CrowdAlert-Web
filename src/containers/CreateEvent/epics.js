/* global window */
import { ajax } from 'rxjs/observable/dom/ajax';
import { of } from 'rxjs/observable/of';
import { ofType, combineEpics } from 'redux-observable';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { REVERSE_GEOCODE, GET_EVENT_BY_ID } from '../../utils/apipaths';
import { MAP_ONCLICK } from '../../components/Map/actionTypes';
import { CREATE_EVENTS_FORM_SUBMIT } from './actionTypes';
import {
  createEventsUpdateLocationText,
  submitFormSuccessCreateEvents,
  submitFormErrorCreateEvents,
} from './actions';

/**
 * Fetches the reverse geocode of a particular point
 */
const fetchReverseGeocodeEpic = action$ =>
  action$.pipe(
    ofType(MAP_ONCLICK),
    mergeMap((action) => {
      const { lat } = action.payload;
      const { lng } = action.payload;
      const apiUrl = `${REVERSE_GEOCODE}?lat=${lat}&long=${lng}&accuracy=high`;
      return ajax
        .getJSON(apiUrl)
        .pipe(map(response =>
          createEventsUpdateLocationText(response[0].formatted_address)));
    }),
  );

/**
 * Submits the incident to the server
 */
const submitEventEpic = action$ =>
  action$.pipe(
    ofType(CREATE_EVENTS_FORM_SUBMIT),
    mergeMap(action => ajax.post(GET_EVENT_BY_ID, {
      eventData: JSON.stringify(action.payload.eventData),
    }, {
      'Content-Type': 'application/json',
      token: window.sessionStorage.getItem('token'),
    }).pipe(
      map(response => submitFormSuccessCreateEvents(response)),
      catchError(error => of(submitFormErrorCreateEvents(error))),
    )),
  );


const epics = combineEpics(fetchReverseGeocodeEpic, submitEventEpic);

export default epics;

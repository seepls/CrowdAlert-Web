import { ajax } from 'rxjs/observable/dom/ajax';
import { of } from 'rxjs/observable/of';
import { ofType, combineEpics } from 'redux-observable';
import { mergeMap, map, takeUntil, debounceTime, catchError } from 'rxjs/operators';

import { USER_UPDATE_USER_DATA } from './actionTypes';
import {
  updateUserDataSuccess,
  updateUserDataError,
} from './actions';
import { USER_PROFILES } from '../../utils/apipaths';

const userProfileUpdaterEpic = action$ =>
  action$.pipe(
    ofType(USER_UPDATE_USER_DATA),
    mergeMap((action) => {
      const apiUrl = USER_PROFILES;
      return ajax
        .post(apiUrl, {
          userData: JSON.stringify(action.payload.userData),
        }, {
          'Content-Type': 'application/json',
          token: window.sessionStorage.getItem('token'),
        }).pipe(
          map(response => updateUserDataSuccess(response)),
          catchError(error => of(updateUserDataError(error))),
        );
    }),
  );

const epics = combineEpics(userProfileUpdaterEpic);

export default epics;

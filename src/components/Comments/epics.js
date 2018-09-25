import { ajax } from 'rxjs/observable/dom/ajax';
import { of } from 'rxjs/observable/of';
import { ofType, combineEpics } from 'redux-observable';
import { mergeMap, map, takeUntil, catchError } from 'rxjs/operators';
import {
  COMMENTS_FETCH_THREAD,
  COMMENTS_FETCH_THREAD_CANCEL,
  COMMENTS_POST_TO_THREAD,
  COMMENTS_POST_TO_THREAD_CANCEL,
} from './actionTypes';
import {
  fetchCommentsThreadSuccess,
  fetchCommnetsThreadError,
  postCommentToThreadSuccess,
  postCommentToThreadError,
} from './actions';
import { COMMENTS } from '../../utils/apipaths';


const fetchCommentsThread = action$ =>
  action$.pipe(
    ofType(COMMENTS_FETCH_THREAD),
    mergeMap((action) => {
      const { threadId } = action.payload;
      const apiUrl = `${COMMENTS}?thread=${threadId}`;
      return ajax
        .getJSON(apiUrl)
        .pipe(
          map(response => fetchCommentsThreadSuccess(response)),
          catchError(error => of(fetchCommnetsThreadError(error))),
          takeUntil(action$.pipe(ofType(COMMENTS_FETCH_THREAD_CANCEL))),
        );
    }),
  );
const postToCommentsThread = action$ =>
  action$.pipe(
    ofType(COMMENTS_POST_TO_THREAD),
    mergeMap((action) => {
      const apiUrl = `${COMMENTS}`;
      return ajax
        .post(apiUrl, {
          commentData: JSON.stringify({
            text: action.payload.comment,
            thread: action.payload.threadId,
          }),
        }, {
          'Content-Type': 'application/json',
          token: window.sessionStorage.getItem('token'),
        })
        .pipe(
          map(response => postCommentToThreadSuccess(response)),
          catchError(error => of(postCommentToThreadError(error.response))),
          takeUntil(action$.pipe(ofType(COMMENTS_POST_TO_THREAD_CANCEL))),
        );
    }),
  );
const epics = combineEpics(fetchCommentsThread, postToCommentsThread);

export default epics;

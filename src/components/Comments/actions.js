import {
  COMMENTS_FETCH_THREAD,
  COMMENTS_FETCH_THREAD_SUCCESS,
  COMMENTS_FETCH_THREAD_CANCEL,
  COMMENTS_FETCH_THREAD_ERROR,
  COMMENTS_POST_TO_THREAD,
  COMMENTS_POST_TO_THREAD_SUCCESS,
  COMMENTS_POST_TO_THREAD_CANCEL,
  COMMENTS_POST_TO_THREAD_ERROR,
} from './actionTypes';

export function fetchCommentsThread(threadId, showLoader) {
  return {
    type: COMMENTS_FETCH_THREAD,
    payload: {
      threadId,
      showLoader,
    },
    meta: {
      ajax: true,
    },
  };
}
export function fetchCommentsThreadSuccess(payload) {
  return {
    type: COMMENTS_FETCH_THREAD_SUCCESS,
    payload,
  };
}
export function fetchCommnetsThreadError(payload) {
  return {
    type: COMMENTS_FETCH_THREAD_ERROR,
    payload,
  };
}
export function fetchCommentsThreadCancel() {
  return {
    type: COMMENTS_FETCH_THREAD_CANCEL,
  };
}
export function postCommentToThread(comment, threadId) {
  return {
    type: COMMENTS_POST_TO_THREAD,
    payload: {
      comment,
      threadId,
    },
    meta: {
      ajax: true,
    },
  };
}
export function postCommentToThreadSuccess(payload) {
  return {
    type: COMMENTS_POST_TO_THREAD_SUCCESS,
    payload,
  };
}
export function postCommentToThreadError(payload) {
  return {
    type: COMMENTS_POST_TO_THREAD_ERROR,
    payload,
  };
}
export function postCommnetToThreadCancel() {
  return {
    type: COMMENTS_POST_TO_THREAD_CANCEL,
  };
}


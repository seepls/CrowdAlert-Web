import {
  COMMENTS_FETCH_THREAD,
  COMMENTS_FETCH_THREAD_SUCCESS,
  COMMENTS_POST_TO_THREAD,
  COMMENTS_POST_TO_THREAD_ERROR,
} from './actionTypes';

const initialState = {
  threadId: null,
  loading: true,
  commentButtonLoading: false,
  errors: false,
  message: null,
  comments: {},
  userData: {},
};

function commentsReducer(state = initialState, action) {
  if (action.type === COMMENTS_FETCH_THREAD) {
    const loading = action.payload.showLoader && state.threadId !== action.payload.threadId
    return {
      ...state,
      threadId: action.payload.threadId,
      loading,
    };
  }
  if (action.type === COMMENTS_FETCH_THREAD_SUCCESS) {
    const objComments = action.payload.comments;
    const comments = Object.keys(objComments).map(key => ({
      key,
      ...objComments[key],
    }));
    return {
      ...state,
      loading: false,
      comments,
      userData: action.payload.userData,
      commentButtonLoading: false,
    };
  }
  if (action.type === COMMENTS_POST_TO_THREAD) {
    return {
      ...state,
      commentButtonLoading: true,
    };
  }
  if (action.type === COMMENTS_POST_TO_THREAD_ERROR) {
    return {
      ...state,
      commentButtonLoading: false,
      errors: true,
      message: action.payload.detail,
    };
  }
  return state;
}

export default commentsReducer;

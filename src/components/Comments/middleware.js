import { COMMENTS_POST_TO_THREAD_SUCCESS } from './actionTypes';
import { fetchCommentsThread } from './actions';

const commentsMiddleware = store => next => (action) => {
  if (action.type === COMMENTS_POST_TO_THREAD_SUCCESS) {
    const state = store.getState();
    store.dispatch(fetchCommentsThread(state.comments.threadId));
  }
  next(action);
};

export default commentsMiddleware;

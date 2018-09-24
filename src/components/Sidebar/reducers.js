import {
  SIDEBAR_TOGGLE_VISIBILITY,
  SIDEBAR_SET_VISIBILITY,
  SIDEBAR_REMOVE_VISIBILITY,
} from './actionTypes';

const initialState = {
  isVisible: false,
  animation: 'scale down',
};

function sidebarVisibilityReducer(state = initialState, action) {
  switch (action.type) {
    case SIDEBAR_TOGGLE_VISIBILITY:
      return {
        ...state,
        isVisible: !state.isVisible,
        animation: action.payload.animation || state.animation,
      };
    case SIDEBAR_SET_VISIBILITY:
      return {
        ...state,
        isVisible: true,
        animation: action.payload.animation || state.animation,
      };
    case SIDEBAR_REMOVE_VISIBILITY:
      return {
        ...state,
        isVisible: false,
      };
    default:
      break;
  }
  return state;
}

export default sidebarVisibilityReducer;

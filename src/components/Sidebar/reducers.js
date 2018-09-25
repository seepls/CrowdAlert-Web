import {
  SIDEBAR_TOGGLE_VISIBILITY,
  SIDEBAR_SET_VISIBILITY,
  SIDEBAR_REMOVE_VISIBILITY,
  BOTTOMBAR_TOGGLE_VISIBILITY,
  BOTTTOMBAR_SET_VISIBILITY,
  BOTTTOMBAR_REMOVE_VISIBILITY,
} from './actionTypes';

const initialState = {
  isVisible: false,
  bottomBarIsVisible: true,
  bottomBarWasVisible: true,
  animation: 'scale down',
};

function sidebarVisibilityReducer(state = initialState, action) {
  switch (action.type) {
    case SIDEBAR_TOGGLE_VISIBILITY:
      return {
        ...state,
        isVisible: true,
        bottomBarIsVisible: !state.isVisible ? false : state.bottomBarWasVisible,
        bottomBarWasVisible: state.bottomBarIsVisible,
        animation: action.payload.animation || state.animation,
      }

    case SIDEBAR_SET_VISIBILITY:
      return {
        ...state,
        isVisible: true,
        animation: action.payload.animation || state.animation,
        bottomBarIsVisible: !state.isVisible ? false : state.bottomBarWasVisible,
        bottomBarWasVisible: state.bottomBarIsVisible,
      };
    case SIDEBAR_REMOVE_VISIBILITY:
      return {
        ...state,
        isVisible: false,
        bottomBarIsVisible: !state.isVisible ? false : state.bottomBarWasVisible,
        bottomBarWasVisible: state.bottomBarIsVisible,
      };
    case BOTTOMBAR_TOGGLE_VISIBILITY:
      return {
        ...state,
        bottomBarIsVisible: !state.bottomBarIsVisible,
      };
    case BOTTTOMBAR_SET_VISIBILITY:
      return {
        ...state,
        bottomBarIsVisible: true,
        bottomBarWasVisible: state.bottomBarIsVisible,
      };
    case BOTTTOMBAR_REMOVE_VISIBILITY:
      
      return {
        ...state,
        bottomBarIsVisible: false,
        bottomBarWasVisible: state.bottomBarIsVisible,
      };
    default:
      break;
  }
  return state;
}

export default sidebarVisibilityReducer;

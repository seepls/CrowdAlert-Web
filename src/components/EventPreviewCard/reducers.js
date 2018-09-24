import {
  EVENT_PREVIEW_OPEN,
  EVENT_PREVIEW_CLOSE,
} from './actionTypes';

const initialState = {
  // If the incident preview is open or not
  isOpen: false,
  event: null,
};

export default function eventPreviewReducer(state = initialState, action) {
  switch (action.type) {
    case EVENT_PREVIEW_OPEN:
      // On open show the pop up & update the payload data
      return {
        ...state,
        isOpen: true,
        event: action.payload,
      };
    case EVENT_PREVIEW_CLOSE:
      // On close clear all the data
      return initialState;
    default:
      break;
  }
  return state;
}

import { FEED_FETCH_EVENTS_BY_LOCATION_FINISHED } from './actionTypes';

const initialState = {
  0: {
    key: 'TEST',
  },
};

function fetchEventsByLocationReducer(state = initialState, action) {
  if (action.type === FEED_FETCH_EVENTS_BY_LOCATION_FINISHED) {
    const events = {};
    action.payload.response.forEach((event) => {
      events[event.key] = event;
    });
    return {
      ...state,
      [action.payload.payload.zoom]: {
        ...state[action.payload.payload.zoom],
        ...events,
      },
    };
  }

  return state;
}

export default fetchEventsByLocationReducer;

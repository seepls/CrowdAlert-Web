import {
  FEED_FETCH_USER_LOCATION,
  FEED_FETCH_USER_LOCATION_FINISHED,
  FEED_FETCH_USER_LOCATION_CANCEL,
  FEED_FETCH_EVENTS_BY_LOCATION,
  FEED_FETCH_EVENTS_BY_LOCATION_FINISHED,
} from './actionTypes';

export function fetchUserLocation(payload = {}) {
  return {
    type: FEED_FETCH_USER_LOCATION,
    payload,
  };
}
export function fetchUserLocationFinished(payload = {}) {
  // console.log(payload);
  return {
    type: FEED_FETCH_USER_LOCATION_FINISHED,
    payload,
  };
}
export function fetchUserLocationCancel(payload = {}) {
  return {
    type: FEED_FETCH_USER_LOCATION_CANCEL,
    payload,
  };
}
export function fetchEventsByLocation(payload = {}) {
  return {
    type: FEED_FETCH_EVENTS_BY_LOCATION,
    payload,
  };
}
export function fetchEventsByLocationFinished(payload = {}) {
  return {
    type: FEED_FETCH_EVENTS_BY_LOCATION_FINISHED,
    payload,
  };
}

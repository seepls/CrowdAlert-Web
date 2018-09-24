import {
  MAP_UPDATE_CENTER,
  MAP_UPDATE_ZOOM,
  MAP_ONCLICK,
} from './actionTypes';

/**
 * Updated the map center based on the scrolling activity
 * @param {*} payload : Object of { fetch, lat, lng }
 */
// TODO: Use object destructuring to validate data
export function updateMapCenter(payload = {}) {
  return {
    type: MAP_UPDATE_CENTER,
    payload,
  };
}
/**
 * Updates the map zoom based on the scroll activity
 * @param {*} payload : Object of { zoom }
 */
export function updateMapZoom(payload = {}) {
  return {
    type: MAP_UPDATE_ZOOM,
    payload,
  };
}
/**
 * Updates map on click. Used to set a pointer on the map
 * @param {*} lat : latitude - float
 * @param {*} lng : longitude - float
 */
export function updateOnClick(lat, lng) {
  return {
    type: MAP_ONCLICK,
    payload: {
      lat,
      lng,
    },
  };
}

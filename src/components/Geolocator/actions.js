import {
  GEOLOCATOR_LOCATION_FETCH,
  GEOLOCATOR_LOCATION_GET_PERMISSION,
  GEOLOCATOR_LOCATION_SUCCESS,
  GEOLOCATOR_LOCATION_DENIED,
  GEOLOCATOR_LOCATION_FAILED,
  GEOLOCATOR_MODAL_OPEN,
  GEOLOCATOR_MODAL_CLOSE,
} from './actionTypes';

/**
 * start fetching geolocation of user
 * @param {*} payload none
 */
export function geolocatorFetchLocation(payload = {}) {
  return {
    type: GEOLOCATOR_LOCATION_FETCH,
    payload,
  };
}
/**
 * Ask user for geolocation permission
 * @param {*} payload none
 */
export function geolocatoretLocationPermission(payload = {}) {
  return {
    type: GEOLOCATOR_LOCATION_GET_PERMISSION,
    payload,
  };
}
/**
 * Permission is granted by user
 * @param {*} payload none
 */
export function geolocatorLocationSuccess(payload = {}) {
  return {
    type: GEOLOCATOR_LOCATION_SUCCESS,
    payload,
  };
}
/**
 * Permission is denied by user
 * @param {*} payload none
 */
export function geolocatorLocationDenied(payload = {}) {
  return {
    type: GEOLOCATOR_LOCATION_DENIED,
    payload,
  };
}
/**
 * Geolocation failed due to hardware errors
 * @param {*} payload none
 */
export function geolocatorLocationFailed(payload = {}) {
  return {
    type: GEOLOCATOR_LOCATION_FAILED,
    payload,
  };
}
/**
 * Open the Geolocation modal
 * @param {*} payload none
 */
export function geolocatorModalOpen(payload = {}) {
  return {
    type: GEOLOCATOR_MODAL_OPEN,
    payload,
  };
}
/**
 * Close the geolocation modal
 * @param {*} payload none
 */
export function geolocatorModalClose(payload = {}) {
  return {
    type: GEOLOCATOR_MODAL_CLOSE,
    payload,
  };
}

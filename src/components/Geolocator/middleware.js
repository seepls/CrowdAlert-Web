/* global navigator */
import {
  GEOLOCATOR_LOCATION_GET_PERMISSION,
  GEOLOCATOR_LOCATION_FETCH,
  GEOLOCATOR_LOCATION_SUCCESS,
  GEOLOCATOR_LOCATION_FAILED,
} from './actionTypes';
import {
  geolocatorFetchLocation,
  geolocatorLocationSuccess,
  geolocatorLocationFailed,
  geolocatorLocationDenied,
  geolocatorModalClose,
  geolocatorModalOpen,
} from './actions';
import {
  updateMapCenter,
  updateMapZoom,
} from '../Map/actions';
import { fetchUserLocation } from '../../containers/Feed/actions';

const geoLocationMiddleware = store => next => (action) => {
  const { dispatch } = store;
  if (action.type === GEOLOCATOR_LOCATION_GET_PERMISSION) {
    try {
      navigator
        .permissions
        .query({ name: 'geolocation' })
        .then((result) => {
          if (result.state === 'granted') {
            dispatch(geolocatorFetchLocation());
            dispatch(geolocatorModalClose());
          } else if (result.state === 'prompt') {
            dispatch(geolocatorModalOpen());
            setTimeout(() => {
              dispatch(geolocatorFetchLocation());
            }, 1500);
          } else if (result.state === 'denied') {
            dispatch(geolocatorLocationDenied());
          }
        });
    } catch (error) {
      console.error('Unsupported browser', error);
      dispatch(geolocatorFetchLocation());
    }
  }
  if (action.type === GEOLOCATOR_LOCATION_FETCH) {
    try {
      navigator
        .geolocation
        .getCurrentPosition(
          (response) => {
            const lat = response.coords.latitude;
            const lng = response.coords.longitude;
            dispatch(geolocatorLocationSuccess({
              lat,
              lng,
            }));
          },
          (err) => {
            console.error(err);
            dispatch(geolocatorLocationFailed());
          }, {
            enableHighAccuracy: true,
            maximumAge: 30000,
            timeout: 20000,
          },
        );
    } catch (err) {
      console.error('Unexpected: Location Fetch Failed', err);
      dispatch(geolocatorLocationFailed());
    }
  }
  if (action.type === GEOLOCATOR_LOCATION_SUCCESS) {
    const { lat } = action.payload;
    const { lng } = action.payload;
    dispatch(updateMapCenter({
      lat,
      lng,
      zoom: 14,
    }));
    dispatch(updateMapZoom({
      lat,
      lng,
      zoom: 14,
    }));
  }
  if (action.type === GEOLOCATOR_LOCATION_FAILED) {
    dispatch(fetchUserLocation({ forced: true }));
  }

  next(action);
};

export default geoLocationMiddleware;

import {
  GEOLOCATOR_MODAL_CLOSE,
  GEOLOCATOR_MODAL_OPEN,
  GEOLOCATOR_LOCATION_DENIED,
  GEOLOCATOR_LOCATION_FAILED,
} from './actionTypes';

/* UI texts */
const PERMISSION_REQUIRED_TEXT = 'We need to access your location';
const PERMISSION_DENIED_TEXT = 'You need to enable location permissions';
const LOCATION_FAILED_TEXT = 'You need enable location services. Current location is based on your network connection.';

const initialState = {
  modalText: PERMISSION_REQUIRED_TEXT,
  isOpen: false,
};

export default function geoLocatorReducer(state = initialState, action) {
  switch (action.type) {
    case GEOLOCATOR_MODAL_OPEN:
      return {
        ...state,
        modalText: PERMISSION_REQUIRED_TEXT,
        isOpen: true,
      };
    case GEOLOCATOR_MODAL_CLOSE:
      return {
        ...state,
        modalText: PERMISSION_REQUIRED_TEXT,
        isOpen: false,
      };
    case GEOLOCATOR_LOCATION_DENIED:
      return {
        ...state,
        modalText: PERMISSION_DENIED_TEXT,
        isOpen: true,
      };
    case GEOLOCATOR_LOCATION_FAILED:
      return {
        ...state,
        modalText: LOCATION_FAILED_TEXT,
        isOpen: true,
      };
    default:
      return state;
  }
}

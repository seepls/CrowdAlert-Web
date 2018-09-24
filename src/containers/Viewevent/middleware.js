import { EVENT_FETCH_EVENT_DATA_FINISHED } from './actionTypes';
import { updateMapCenter, updateMapZoom } from '../../components/Map/actions';
import { fetchReverseGeocode } from './actions';

const fetchEventDataMiddleware = ({ dispatch }) => next => (action) => {
  if (action.type === EVENT_FETCH_EVENT_DATA_FINISHED) {
    const { payload } = action;
    let formattedImages = [];
    const { images } = payload;
    if (images) {
      formattedImages = Object.keys(images).map(key => images[key]);
    }
    const newAction = {
      ...action,
      payload: {
        ...action.payload,
        images: formattedImages,
      },
    };
    if (formattedImages.length) {
      // Dispatch Image URL Fetch

    }
    const lat = payload.location.coords.latitude;
    const lng = payload.location.coords.longitude;
    // Update Map Center
    dispatch(updateMapCenter({
      lat,
      lng,
      zoom: 16,
      fetch: false,
    }));
    dispatch(updateMapZoom({
      lat,
      lng,
      zoom: 16,
      fetch: false,
    }));
    // Dipatch reverse geocode
    dispatch(fetchReverseGeocode(lat, lng));

    next(newAction);
  } else {
    next(action);
  }
};

export default fetchEventDataMiddleware;

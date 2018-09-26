import { combineReducers } from 'redux';
import {
  CREATE_EVENTS_FORM_TAB_CHANGE,
  CREATE_EVENTS_FORM_TAB_CHANGE_VALIDATION,
  CREATE_EVENTS_FORM_UPDATE_LOCATION_TEXT,
  CREATE_EVENTS_FORM_SAVE_LOCATION,
  CREATE_EVENTS_FORMS_UPDATE_EVENT_DETAILS,
  CREATE_EVENTS_FORM_VALIDATION_ERRORS,
  CREATE_EVENTS_FORM_VALIDATION_SUCCESS,
  CREATE_EVENTS_FORM_SUBMIT,
  CREATE_EVENTS_FORM_SUBMIT_SUCCESS,
  CREATE_EVENTS_FORM_SUBMIT_ERROR,
  CREATE_EVENTS_FORM_TOGGLE_UPLOADING,
} from './actionTypes';
import { MAP_ONCLICK } from '../../components/Map/actionTypes';


const tabInitialState = {
  activeTab: 0,
  isValid: {
    location: false,
    details: false,
    images: false,
  },
};
function switchTabReducer(state = tabInitialState, action) {
  if (action.type === CREATE_EVENTS_FORM_TAB_CHANGE) {
    return {
      ...state,
      activeTab: action.payload.tab,
    };
  }
  if (action.type === CREATE_EVENTS_FORM_TAB_CHANGE_VALIDATION) {
    return {
      ...state,
      isValid: {
        ...state.isValid,
        [action.payload.tab]: action.payload.isValid,
      },
    };
  }
  return state;
}
const locationInitialState = {
  mapCenter: {
    lat: null,
    lng: null,
  },
  text: '',
  disabled: true,
};
function locaitonTabReducer(state = locationInitialState, action) {
  if (action.type === MAP_ONCLICK) {
    return {
      ...state,
      mapCenter: {
        lat: action.payload.lat,
        lng: action.payload.lng,
      },
      disabled: false,
    };
  }
  if (action.type === CREATE_EVENTS_FORM_UPDATE_LOCATION_TEXT) {
    return {
      ...state,
      text: action.payload.text,
    };
  }
  if (action.type === CREATE_EVENTS_FORM_SAVE_LOCATION) {
    return {
      ...state,
      disabled: true,
    };
  }
  return state;
}
const detailsInitialState = {
  eventType: null,
  title: '',
  description: '',
  public: true,
  help: false,
  anonymous: false,
};
function detailsReducer(state = detailsInitialState, action) {
  if (action.type === CREATE_EVENTS_FORMS_UPDATE_EVENT_DETAILS) {
    return {
      ...state,
      [action.payload.name]: action.payload.value,
    };
  }
  return state;
}
const reportFormInitialState = {
  loading: false,
  message: {
    header: '',
    body: '',
  },
  eventID: null,
  isFreezed: false,
  validationErrors: false,
  uploading: false,
  imageSelectDisabled: false,
};
function reportFormReducer(state = reportFormInitialState, action) {
  if (action.type === CREATE_EVENTS_FORM_VALIDATION_ERRORS) {
    return {
      ...state,
      validationErrors: true,
      message: {
        header: action.payload.message.header,
        body: action.payload.message.body,
      },
      loading: false,
      isFreezed: false,
    };
  }
  if (action.type === CREATE_EVENTS_FORM_VALIDATION_SUCCESS) {
    return {
      ...state,
      isFreezed: true,
      loading: false,
      validationErrors: false,
    };
  }
  if (action.type === CREATE_EVENTS_FORM_SUBMIT) {
    return {
      ...state,
      isFreezed: true,
      loading: true,
      validationErrors: false,
    };
  }
  if (action.type === CREATE_EVENTS_FORM_SUBMIT_SUCCESS) {
    return {
      ...state,
      isFreezed: true,
      loading: false,
      validationErrors: false,
      eventID: action.payload.eventId,
    };
  }
  if (action.type === CREATE_EVENTS_FORM_SUBMIT_ERROR) {
    return {
      ...state,
      validationErrors: true,
      message: {
        header: action.payload.message.header,
        body: action.payload.message.body,
      },
      loading: false,
      isFreezed: false,
    };
  }
  if (action.type === CREATE_EVENTS_FORM_TOGGLE_UPLOADING) {
    return {
      ...state,
      uploading: !state.uploading,
    };
  }
  return state;
}
const createEventsReducer = combineReducers({
  tabs: switchTabReducer,
  details: detailsReducer,
  location: locaitonTabReducer,
  form: reportFormReducer,
});

export default createEventsReducer;

import {
  CREATE_EVENTS_FORM_TAB_CHANGE,
  CREATE_EVENTS_FORM_TAB_CHANGE_VALIDATION,
  CREATE_EVENTS_FORM_UPDATE_LOCATION_TEXT,
  CREATE_EVENTS_FORM_SAVE_LOCATION,
  CREATE_EVENTS_FORMS_UPDATE_EVENT_DETAILS,
  CREATE_EVENTS_FORM_VALIDATE_FORM,
  CREATE_EVENTS_FORM_VALIDATION_ERRORS,
  CREATE_EVENTS_FORM_VALIDATION_SUCCESS,
  CREATE_EVENTS_FORM_SUBMIT,
  CREATE_EVENTS_FORM_SUBMIT_SUCCESS,
  CREATE_EVENTS_FORM_SUBMIT_ERROR,
  CREATE_EVENTS_FORM_TOGGLE_UPLOADING,
} from './actionTypes';

/**
 * Changes tab based on the tab ID
 * @param {*} tabIndex Target Tab index
 */
export function changeTabCreateEventsForm(tabIndex) {
  return {
    type: CREATE_EVENTS_FORM_TAB_CHANGE,
    payload: {
      tab: tabIndex,
    },
  };
}
/**
 * Marks tab as validated
 * @param {*} tab : Tab id
 * @param {*} isValid : Whether target tab is valid or not
 */
export function changeTabValidationCreateEventsForm(tab, isValid) {
  return {
    type: CREATE_EVENTS_FORM_TAB_CHANGE_VALIDATION,
    payload: {
      tab,
      isValid,
    },
  };
}
/**
 * Updates the reverse geocode of the user pointed location
 * @param {*} text : Reverse Geocode
 */
export function createEventsUpdateLocationText(text) {
  return {
    type: CREATE_EVENTS_FORM_UPDATE_LOCATION_TEXT,
    payload: {
      text,
    },
  };
}
/**
 * Mark the location as saved
 */
export function saveLocationCreateEvents() {
  return {
    type: CREATE_EVENTS_FORM_SAVE_LOCATION,
  };
}
/**
 * Updates the event details of the incident. Should use a react component based
 * update mechanism & update the redux store when saved
 * @param {*} event : DOM event
 */
export function updateEventDetailsCreateEvents(event) {
  const { target } = event;
  const value = target.type === 'checkbox' ? target.checked : target.value;
  const { name } = target;
  return {
    type: CREATE_EVENTS_FORMS_UPDATE_EVENT_DETAILS,
    payload: {
      name,
      value,
    },
  };
}
/**
 * Whether there are any errors in the form
 * @param {*} payload : Object
 */
export function formValidationErrorsCreateEvents(payload = {}) {
  return {
    type: CREATE_EVENTS_FORM_VALIDATION_ERRORS,
    payload,
  };
}
/**
 * Validate the input form as validated
 * @param {*} payload
 */
export function validateFormCreateEvents(payload = {}) {
  return {
    type: CREATE_EVENTS_FORM_VALIDATE_FORM,
    payload,
  };
}
/**
 * Mark the incident form as validated
 */
export function acceptFormCreateEvents(payload = {}) {
  return {
    type: CREATE_EVENTS_FORM_VALIDATION_SUCCESS,
    payload,
  };
}
/**
 * Submits the form
 * @param {*} ObjectOf({ location, details })
 * location: {mapCenter: {
 *    lat: float,
 *    lng: float,
 * }}
 */
export function submitFormCreateEvents({ location, details }) {
  const eventData = {
    category: details.eventType,
    description: details.description,
    local_assistance: details.help,
    title: details.title,
    public: {
      view: details.public,
      share: details.help,
    },
    anonymous: details.anonymous,
    location: {
      coords: {
        latitude: location.mapCenter.lat,
        longitude: location.mapCenter.lng,
      },
    },
  };
  return {
    type: CREATE_EVENTS_FORM_SUBMIT,
    payload: {
      eventData,
    },
  };
}
/**
 * Event submission success
 * @param {*} Object { response }
 */
export function submitFormSuccessCreateEvents({ response }) {
  return {
    type: CREATE_EVENTS_FORM_SUBMIT_SUCCESS,
    payload: response,
  };
}
/**
 * Event submission error
 * @param {*} error
 */
export function submitFormErrorCreateEvents(error = {}) {
  return {
    type: CREATE_EVENTS_FORM_SUBMIT_ERROR,
    payload: {
      message: {
        header: 'Unable to process your request',
        body: error.response.detail,
      },
    },
  };
}
// Deprecated
export function toggleImageUpload() {
  return {
    type: CREATE_EVENTS_FORM_TOGGLE_UPLOADING,
  };
}

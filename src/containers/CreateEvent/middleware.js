import formValidator from './validator';
import {
  changeTabCreateEventsForm,
  changeTabValidationCreateEventsForm,
  formValidationErrorsCreateEvents,
  acceptFormCreateEvents,
  submitFormCreateEvents,
} from './actions';
import {
  CREATE_EVENTS_FORM_SAVE_LOCATION,
  CREATE_EVENTS_FORM_UPDATE_LOCATION_TEXT,
  CREATE_EVENTS_FORM_VALIDATE_FORM,
  CREATE_EVENTS_FORM_SUBMIT_SUCCESS,
} from './actionTypes';

const createEventsMiddleware = store => next => (action) => {
  const { dispatch } = store;
  if (action.type === CREATE_EVENTS_FORM_UPDATE_LOCATION_TEXT) {
    const state = store.getState();
    // Kill the action if form is freezed
    if (state.createEvents.form.isFreezed) {
      return null;
    }
  }
  if (action.type === CREATE_EVENTS_FORM_SAVE_LOCATION) {
    // Jump to event data tab
    dispatch(changeTabCreateEventsForm(1));
    // Mark it as validated
    dispatch(changeTabValidationCreateEventsForm('location', true));
  }
  if (action.type === CREATE_EVENTS_FORM_VALIDATE_FORM) {
    const state = store.getState();
    const status = formValidator(state.createEvents);
    const eventData = state.createEvents;
    if (!status.validationErrors) {
      // dispatch post request
      dispatch(acceptFormCreateEvents());
      dispatch(submitFormCreateEvents(eventData));
    } else {
      // dispatch error handler
      dispatch(formValidationErrorsCreateEvents(status));
    }
  }
  if (action.type === CREATE_EVENTS_FORM_SUBMIT_SUCCESS) {
    dispatch(changeTabValidationCreateEventsForm('details', true));
    dispatch(changeTabCreateEventsForm(2));
  }
  next(action);
  return null;
};

export default createEventsMiddleware;

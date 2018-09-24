import {
  EVENT_PREVIEW_OPEN,
  EVENT_PREVIEW_CLOSE,
} from './actionTypes';

/**
 * Action for opening incidents preview card
 * @param {*} payload : response data from server
 */
export function openEventPreview(payload = {}) {
  return {
    type: EVENT_PREVIEW_OPEN,
    payload,
  };
}
/**
 *  Action for closing incidents preview card
 * @param {*} payload : none
 */
export function closeEventPreview(payload = {}) {
  return {
    type: EVENT_PREVIEW_CLOSE,
    payload,
  };
}

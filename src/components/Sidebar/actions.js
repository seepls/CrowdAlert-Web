import {
  SIDEBAR_TOGGLE_VISIBILITY,
  SIDEBAR_SET_VISIBILITY,
  SIDEBAR_REMOVE_VISIBILITY,
} from './actionTypes';

/**
 * Toggles the sidebar visibility
 * @param {*} payload Object
 */
export function toggleSidebarVisibility(payload = {}) {
  return {
    type: SIDEBAR_TOGGLE_VISIBILITY,
    payload,
  };
}
/**
 * 
 * @param {*} payload 
 */
export function setSidebarVisibility(payload = {}) {
  return {
    type: SIDEBAR_SET_VISIBILITY,
    payload,
  };
}
export function removeSidebarVisibility(payload = {}) {
  return {
    type: SIDEBAR_REMOVE_VISIBILITY,
    payload,
  };
}

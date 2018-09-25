import {
  SIDEBAR_TOGGLE_VISIBILITY,
  SIDEBAR_SET_VISIBILITY,
  SIDEBAR_REMOVE_VISIBILITY,
  BOTTOMBAR_TOGGLE_VISIBILITY,
  BOTTTOMBAR_SET_VISIBILITY,
  BOTTTOMBAR_REMOVE_VISIBILITY,
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
export function toggleVisibilityBottomBar() {
  return {
    type: BOTTOMBAR_TOGGLE_VISIBILITY,
  };
}
export function setBottomBarVisibility() {
  return {
    type: BOTTTOMBAR_SET_VISIBILITY,
  };
}
export function removeBottomBarVisibility() {
  return {
    type: BOTTTOMBAR_REMOVE_VISIBILITY,
  };
}

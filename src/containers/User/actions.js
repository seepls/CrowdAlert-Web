import {
  USER_UPDATE_USER_DATA,
  USER_UPDATE_USER_DATA_ERROR,
  USER_UPDATE_USER_DATA_SUCCESS,
} from './actionTypes';

export function updateUserData(payload) {
  return {
    type: USER_UPDATE_USER_DATA,
    payload,
  };
}
export function updateUserDataError(payload) {
  return {
    type: USER_UPDATE_USER_DATA_ERROR,
    payload,
  };
}
export function updateUserDataSuccess(payload) {
  return {
    type: USER_UPDATE_USER_DATA_SUCCESS,
    payload,
  };
}

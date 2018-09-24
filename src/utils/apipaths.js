/**
 * Contains API paths, which can be imported as required
 */
const domainName = 'https://crowdalert.herokuapp.com';
// const domainNameL = 'https://127.0.0.1:8000';
/**
 * [GET_LOCATION_BY_IP: request to get approximate location information]
 * @type {String}
 */
const GET_LOCATION_BY_IP = `${domainName}/api/location/get_location`;
/**
 * [GET_EVENT_BY_ID: Do GET request with event id as a url parameter]
 * @type {String}
 */
const GET_EVENT_BY_ID = `${domainName}/api/events/incident`;
/**
 * [GET_IMAGE_URLS Do GET request with image uuid to get the iamge urls]
 * @type {String}
 */
const GET_IMAGE_URLS = `${domainName}/api/images/image`;

const UPLOAD_IMAGES = `${domainName}/api/images/image`;
/**
 * [REVERSE_GEOCODE returns the reverse geocode for a given pair of coordinates
 * If accuracy=high, it uses google apis to reverse geocode]
 * @type {String}
 */
const REVERSE_GEOCODE = `${domainName}/api/location/reverse_geocode`;
/**
 * [GET_EVENTS_BY_LOCATION returns a list of events for a given pair of
 * coordinates with a valid proximity]
 * @type {String}
 */
const GET_EVENTS_BY_LOCATION = `${domainName}/api/events/geteventsbylocation`;

export {
  GET_LOCATION_BY_IP,
  GET_EVENT_BY_ID,
  GET_IMAGE_URLS,
  REVERSE_GEOCODE,
  GET_EVENTS_BY_LOCATION,
  UPLOAD_IMAGES,
};

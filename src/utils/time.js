/**
 * [calcAge Calculates the approximate time passed & returns it as a textual
 * representation ]
 * @param  {Float} timestamp [description]
 * @return {String}           [description]
 */
function calcAge(timestamp) {
  const duration = Math.floor((new Date() - timestamp) / 1000);
  let text = '';
  if (duration < 60) {
    text = 'Just now';
  } else if (duration < 120) {
    text = 'About a minute ago';
  } else if (duration < 3600) {
    text = `About ${Math.floor(duration / 60)} minutes ago`;
  } else if (duration < 3600 * 24) {
    text = `About ${Math.floor(duration / 3600)} hours ago`;
  } else if (duration < 3600 * 24 * 100) {
    text = `About ${Math.floor(duration / (3600 * 24))} days ago`;
  } else if (duration < 3600 * 24 * 365) {
    text = `About ${Math.floor(duration / (3600 * 24 * 30))} months ago`;
  }
  return text;
}

export default calcAge;

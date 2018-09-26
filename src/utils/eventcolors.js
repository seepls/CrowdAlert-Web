/**
 * [getEventColor returns event color according event type]
 * @param  {[type]} type [event type]
 * @return {[type]}      [event color]
 */
const getEventColor = (type) => {
  let eventColor = '';
  switch (type) {
    case 'fire':
      eventColor = 'red';
      break;
    case 'road':
      eventColor = 'brown';
      break;
    case 'health':
      eventColor = 'teal';
      break;
    case 'electric':
      eventColor = 'yellow';
      break;
    case 'nature':
      eventColor = 'green';
      break;
    default:
      eventColor = 'blue';
  }
  return eventColor;
};

export default getEventColor;

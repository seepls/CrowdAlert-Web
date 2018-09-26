const getEventIcon = (type) => {
  let eventIcon = '';
  switch (type) {
    case 'fire':
      eventIcon = 'fire';
      break;
    case 'road':
      eventIcon = 'road';
      break;
    case 'health':
      eventIcon = 'plus';
      break;
    case 'electric':
      eventIcon = 'plug';
      break;
    case 'nature':
      eventIcon = 'tree';
      break;
    default:
      eventIcon = 'warning sign';
  }
  return eventIcon;
};

export default getEventIcon;

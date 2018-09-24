function degreesToRadians(degrees) {
  return (degrees * Math.PI) / 180;
}

function distanceCoordinates(lat1, lon1, lat2, lon2) {
  const earthRadiusKm = 6371;

  const dLat = degreesToRadians(lat2 - lat1);
  const dLon = degreesToRadians(lon2 - lon1);

  const dlat1 = degreesToRadians(lat1);
  const dlat2 = degreesToRadians(lat2);

  const a = (Math.sin(dLat / 2) * Math.sin(dLat / 2)) +
          (Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(dlat1) * Math.cos(dlat2)); 
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return earthRadiusKm * c;
}
export default distanceCoordinates;

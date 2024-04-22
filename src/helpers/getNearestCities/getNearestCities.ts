import { City } from '../../assets/types/city';

export const getNearestCities = (cities: City[], numberOfCities: number, city: City): City[] => {
  // Calculate distances between the provided city and all other cities
  const distances = cities.map((otherCity: City) => {
    const distance = Math.sqrt(
      Math.pow(city.lat - otherCity.lat, 2) + Math.pow(city.lng - otherCity.lng, 2)
    );
    return { city: otherCity, distance };
  });

  // Sort cities by distance (ascending order)
  distances.sort((a, b) => a.distance - b.distance);

  // Get the nearest numberOfCities
  const nearestCities = distances.slice(1, numberOfCities+1).map(item => item.city);

  return nearestCities;
}
import { City } from '../../assets/types/city';
import { getNearestCities } from './getNearestCities';

describe('getNearestCities', () => {
  // Mock city data for testing
  const cities: City[] = [
    { name: 'City A', country: 'Country A', lat: 10, lng: 20 },
    { name: 'City B', country: 'Country A', lat: 15, lng: 25 },
    { name: 'City C', country: 'Country B', lat: 12, lng: 22 },
    { name: 'City D', country: 'Country B', lat: 8, lng: 18 },
    { name: 'Selected City', country: 'Country B', lat: 1, lng: 1 }
  ];

  test('returns nearest cities correctly', () => {
    const selectedCity: City = { name: 'Selected City', country: 'Country B', lat: 1, lng: 1 };
    const numberOfCities = 2;

    const nearestCities = getNearestCities(cities, numberOfCities, selectedCity);

    // Check if the correct number of cities is returned
    expect(nearestCities).toHaveLength(numberOfCities);

    // Check if the nearest cities are returned in ascending order of distance
    expect(nearestCities[0].name).toBe('City D');
    expect(nearestCities[1].name).toBe('City A');
  });

  test('handles empty cities array', () => {
    const selectedCity = { name: 'Selected City', country: 'Country B', lat: 11, lng: 21 };
    const numberOfCities = 2;

    const nearestCities = getNearestCities([], numberOfCities, selectedCity);

    // Check if the function returns an empty array if cities array is empty
    expect(nearestCities).toHaveLength(0);
  });
});
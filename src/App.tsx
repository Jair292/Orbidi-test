import { useState } from 'react';
import './App.css';
import citiesJson from './assets/jsons/cities';
import { getNearestCities } from './helpers/getNearestCities/getNearestCities';
import { City, SelectableCity } from './assets/types/city';
import { AsyncPaginate } from 'react-select-async-paginate';
import { GroupBase, OptionsOrGroups } from 'react-select';

function App() {
  const [selectedCity, setSelectedCity] = useState<SelectableCity | null>(null);
  const [nearCities, setNearCitites] = useState<City[] | null>(null);
  const cities: City[] = [];
  const options: SelectableCity[] = [];
  
  citiesJson.forEach(cityJson => {
    const parsedLat = parseFloat(cityJson.lat);
    const parsedLng = parseFloat(cityJson.lng);

    const cityObj: City = {
        country: cityJson.country,
        name: cityJson.name,
        lat: parsedLat,
        lng: parsedLng,
    };

    const optionObj: SelectableCity = {
        value: {
            country: cityJson.country,
            name: cityJson.name,
            lat: parsedLat,
            lng: parsedLng,
        },
        label: cityJson.name
    };

    cities.push(cityObj);
    options.push(optionObj);
});

  const handleDropdownSelection = (selectedCity: any) => {
    setSelectedCity(selectedCity);
    const nearestCities = getNearestCities(cities, 3, selectedCity.value);
    setNearCitites(nearestCities);
  };

  const loadCities2 = (search: string,
    prevOptions: OptionsOrGroups<SelectableCity, GroupBase<SelectableCity>>) => {
      let filteredOptions: SelectableCity[];
      if (!search) {
        filteredOptions = options;
      } else {
        const searchLower = search.toLowerCase();
    
        filteredOptions = options.filter(({ label }) =>
          label.toLowerCase().includes(searchLower)
        );
      }
    
      const hasMore = filteredOptions.length > prevOptions.length + 50;
      const slicedOptions = filteredOptions.slice(
        prevOptions.length,
        prevOptions.length + 50
      );
    
      return {
        options: slicedOptions,
        hasMore
      };
  };
  
  return (
    <>
      <h1>Find a City</h1>
      <AsyncPaginate loadOptions={ loadCities2 }
      value={ selectedCity }
      onChange={ handleDropdownSelection }
      placeholder="Select a City"
      defaultOptions/>
      { nearCities?.length && (
      <>
        <h2>Near Cities</h2>
        <ul className='list-cities'>
          { nearCities?.map((city: City, index: number) => 
            <li key={index} className='list-cities-item'>
              { city.name }
            </li>
          )}
        </ul>
      </>)}
    </>
  ) 
}

export default App

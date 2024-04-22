export type City = {
  country: string;
  name: string;
  lat: number;
  lng: number;
}

export type SelectableCity = {
  value: City,
  label: string
};

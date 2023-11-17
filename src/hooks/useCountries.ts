import countries from "world-countries";

const formattedCountries = countries.map((country) => ({
  value: country.cca2, // country code
  label: country.name.common, // country name
  flag: country.flag, // country flag
  latlng: country.latlng, // country latitute and longitude
  region: country.region, // country region
}));

const useCountries = () => {
  const getAll = () => formattedCountries;

  const getByValue = (value: string) => {
    return formattedCountries.find((country) => country.value === value);
  };

  return {
    getAll,
    getByValue,
  };
};

export default useCountries;

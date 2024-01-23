import styles from "./CountryList.module.css";

import Message from "./Message";
import CountryItem from "./CountryItem";

import { useCities } from "../contexts/CitiesContext";
var id = 12;
function CountriesList() {
  const { cities } = useCities();

  if (!cities) {
    return <Message message="Add your first city" />;
  }
  const countries = cities.reduce((arr, city) => {
    if (!arr.map((el) => el.country).includes(city.country))
      return [
        ...arr,
        { country: city.country, emoji: city.emoji, id: city.id },
      ];
    else return arr;
  }, []);
  console.log("random");
  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem
          country={country}
          key={id++}
        ></CountryItem>
      ))}
    </ul>
  );
}

export default CountriesList;

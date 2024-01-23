/* eslint-disable react/prop-types */
import CityItem from "./CityItem";
import styles from "./CityList.module.css";
import Spinner from "./Spinner";
import Message from "./Message";
import PropTypes from "prop-types";

import { useCities } from "../contexts/CitiesContext";

function CityList() {
  const { cities, isLoading } = useCities();
  if (isLoading) {
    return <Spinner></Spinner>;
  }
  if (!cities) {
    return <Message message="Add your first city" />;
  }
  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem
          key={city.id}
          city={city}
        ></CityItem>
      ))}
    </ul>
  );
}

export default CityList;

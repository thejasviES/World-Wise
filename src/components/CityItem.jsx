/* eslint-disable react/prop-types */
import styles from "./CityItem.module.css";
import { Link } from "react-router-dom";
import { useCities } from "../contexts/CitiesContext";
// import { useState } from "react";
const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

const flagemojiToPNG = (flag) => {
  console.log(flag);
  return (
    <img
      src={`https://flagcdn.com/24x18/${flag}.png`}
      alt="flag"
    />
  );
};

function CityItem({ city }) {
  console.log(city);
  const { currentCity, deleteCity } = useCities();
  const { cityName, date, emoji, id, position } = city;

  function handleClick(e) {
    e.preventDefault();
    deleteCity(id);
  }
  // console.log(emoji);
  return (
    <li>
      <Link
        className={`${styles.cityItem} ${
          currentCity.id === id ? styles["cityItem--active"] : " "
        }`}
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
      >
        <span className={styles.emoji}>{flagemojiToPNG(emoji)}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>{formatDate(date)}</time>
        <button
          className={styles.deleteBtn}
          onClick={handleClick}
        >
          &times;
        </button>
      </Link>
    </li>
  );
}

export default CityItem;

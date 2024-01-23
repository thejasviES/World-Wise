// "

import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import styles from "./Form.module.css";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import BackButton from "./BackButton";
import { useUrlPosition } from "../hooks/useUrlPosition";

import Message from "./Message";
import ReactDatePicker from "react-datepicker";
import { useCities } from "../contexts/CitiesContext";

function flagemojiToPNG(flag) {
  console.log(typeof flag);
  const emoji = flag.toLowerCase();
  console.log(emoji);
  return (
    <img
      src={`https://flagcdn.com/24x18/${emoji}.png`}
      alt="flag"
    />
  );
}

const Base_url = "https://api.bigdatacloud.net/data/reverse-geocode-client?";

function Form() {
  const navigate = useNavigate();
  const [lat, lng] = useUrlPosition();
  const { createcity, isLoading } = useCities();

  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");

  const [emoji, setEmoji] = useState("");
  const [emojis, setEmojis] = useState("");
  const [error, setError] = useState("");
  const [isloading, setisloading] = useState(false);
  useEffect(
    function () {
      if (!lat) return;
      async function fetchCityData() {
        try {
          setisloading(true);
          setError("");
          const res = await fetch(
            `${Base_url}latitude=${lat}&longitude=${lng}`
          );
          const data = await res.json();
          console.log(data);
          if (!data.countryCode)
            throw new Error("that doesn't seems to be a city ,click on city");
          setCityName(data.city || data.locality || " ");
          setCountry(data.countryName);
          setEmoji(flagemojiToPNG(data.countryCode));
          setEmojis(data.countryCode);
        } catch (err) {
          setError(err.message);
          console.log(err);
        } finally {
          setisloading(false);
        }
      }
      fetchCityData();
    },
    [lat, lng]
  );

  async function handleSubmit(e) {
    e.preventDefault();

    if (!cityName || !date) return;
    const newCity = {
      cityName,
      country,
      emoji: emojis.toLowerCase(),
      date,
      notes,
      position: {
        lat,
        lng,
      },
    };
    await createcity(newCity);
    navigate("/app/cities");
  }

  if (error) return <Message message={error}></Message>;
  console.log(emoji);
  if (!lat) return <Message message={"click somwhere"}></Message>;
  return (
    <form
      className={`${styles.form}  ${isLoading ? styles.loading : ""}`}
      onSubmit={handleSubmit}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        {/* <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        /> */}
        <DatePicker
          id="date"
          onChange={(date) => setDate(date)}
          selected={date}
          dateFormat="dd/MM/yyyy"
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary"> Add</Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;

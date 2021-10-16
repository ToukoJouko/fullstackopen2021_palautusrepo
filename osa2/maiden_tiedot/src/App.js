import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import Country from "./components/Country";
import DetailedInfo from "./components/DetailedInfo";
import axios from "axios";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [displayed, setDisplayed] = useState([]);
  const [search, setSearch] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [showDetailed, setShowDetailed] = useState(false);
  const [showDetailedButton, setShowDetailedButton] = useState(false);
  const [filteredList, setFilteredList] = useState([]);
  const [displayedIndex, setDisplayedIndex] = useState("");
  const [weather, setWeather] = useState([]);
  const [capital, setCapital] = useState("");

  const API_KEY = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    axios.get("https://restcountries.com/v2/all").then((response) => {
      setCountries(response.data);
    });
  });
  //console.log(countries);

  const handleSearch = (event) => {
    setSearch(event.target.value);

    if (event.target.value === "") {
      setDisplayed([]);
      setShowMessage(false);
      setShowDetailed(false);
      setShowDetailedButton(false);
    } else {
      const filtered = countries.filter((country) => {
        return country.name
          .toLowerCase()
          .includes(event.target.value.toLowerCase());
      });
      if (filtered.length > 10) {
        setDisplayed([]);
        setShowDetailed(false);
        setShowDetailedButton(false);
        setShowMessage(true);
        setFilteredList(filtered);
      } else if (filtered.length === 1) {
        setDisplayed([]);
        setShowDetailed(true);
        setShowDetailedButton(false);
        setShowMessage(false);
        setFilteredList(filtered);
      } else if (filtered.length > 0 && filtered.length < 11) {
        setDisplayed(filtered);
        setShowDetailed(false);
        setShowDetailedButton(false);
        setShowMessage(false);
        setFilteredList(filtered);
      }
    }
  };
  /*
  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${API_KEY}`
      )
      .then((response) => {
        setWeather(response.data);
        console.log(response.data);
      });
  });
*/
  const DetailedInfoButton = (props) => {
    return (
      <div>
        <h1>{filteredList[props.country_index].name}</h1>
        <p>capital {filteredList[props.country_index].capital} </p>
        <p>population {filteredList[props.country_index].population}</p>
        <h2>languages</h2>
        <ul>
          {filteredList[props.country_index].languages.map(
            (language, index) => (
              <li key={index}>{language.name}</li>
            )
          )}
        </ul>
        <img
          src={filteredList[props.country_index].flag}
          alt="xd"
          width="40%"
          height="40%"
        />
        <h2>weather in {filteredList[props.country_index].capital}</h2>
      </div>
    );
  };
  /*
  const WeatherInfo = (capital) => {
    return (
      <div>
        <p>temperature: {weather.main.temp}</p>
        <p>wind: {weather.wind.speed} m/s</p>
      </div>
    );
  };
*/
  function buttonFunction(get_index) {
    setShowDetailed(false);
    setDisplayed([]);
    setShowDetailedButton(true);
    setDisplayedIndex(get_index);
  }

  return (
    <div>
      <Filter input_value={search} searching={handleSearch} />
      <p>{showMessage ? "Too many matches, specify another filter" : ""}</p>
      <div>
        {showDetailedButton ? (
          <DetailedInfoButton country_index={displayedIndex} />
        ) : (
          ""
        )}
        {showDetailed ? (
          <div>
            <DetailedInfo
              name={filteredList[0].name}
              capital={filteredList[0].capital}
              population={filteredList[0].population}
              languages={filteredList[0].languages}
              flag={filteredList[0].flag}
            />
          </div>
        ) : (
          ""
        )}
      </div>
      <div>
        {displayed.map((country, index) => (
          <div>
            <Country key={index} name={country.name} />
            <button
              onClick={() => {
                buttonFunction(index);
              }}
            >
              show
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;

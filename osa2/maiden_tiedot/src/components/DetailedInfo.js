import React, { useEffect } from "react";
import axios from "axios";

const API_KEY = process.env.REACT_APP_API_KEY;

const DetailedInfo = (country) => {
  return (
    <div>
      <h1>{country.name}</h1>
      <p>capital {country.capital} </p>
      <p>population {country.population}</p>
      <h2>languages</h2>
      <ul>
        {country.languages.map((language, index) => (
          <li key={index}>{language.name}</li>
        ))}
      </ul>
      <img src={country.flag} alt="xd" width="40%" height="40%" />
      <h2>Weather in {country.capital}</h2>
      <div>
        <p>temperature: {country.temperature}</p>
        <img src={country.icon} alt="xd" width="40%" height="40%" />
        <p>wind: {country.wind_speed} m/s</p>
      </div>
    </div>
  );
};

export default DetailedInfo;

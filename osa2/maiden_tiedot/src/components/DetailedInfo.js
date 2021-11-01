import React from "react";

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
    </div>
  );
};

export default DetailedInfo;

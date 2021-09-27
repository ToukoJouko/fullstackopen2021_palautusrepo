import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import Country from "./components/Country";
import MatchMessage from "./components/MatchMessage";
import axios from "axios";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [displayed, setDisplayed] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios.get("https://restcountries.com/v3/all").then((response) => {
      setCountries(response.data);
    });
  });
  //console.log(countries);

  const handleSearch = (event) => {
    const lenthh_over_10 = filtered;
    setSearch(event.target.value);

    if (event.target.value === "") {
      setDisplayed([]);
    } else {
      const filtered = countries.filter((country) => {
        return country.name.common
          .toLowerCase()
          .includes(event.target.value.toLowerCase());
      });

      if (filtered.length > 10) {
        return <MatchMessage />;
      } else if (filtered.length > 1 && filtered.length < 11) {
        setDisplayed(filtered);
      }
    }
  };

  return (
    <div>
      <Filter input_value={search} searching={handleSearch} />
      <MatchMessage />
      <div>
        {displayed.map((country) => (
          <Country name={country.name.common} />
        ))}
      </div>
    </div>
  );
};

export default App;

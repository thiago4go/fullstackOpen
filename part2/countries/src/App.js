import { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [searchFilter, setSearchFilter] = useState("");
  const [countries, setCountries] = useState([]);
  const api_key = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => {
        setCountries(response.data);
      });
  }, []);

  const handleFilterChange = (event) => {
    setSearchFilter(event.target.value);
  };

  const countriesToShow =
    searchFilter === ""
      ? countries
      : countries.filter((country) =>
          country.name.official
            .toLowerCase()
            .includes(searchFilter.toLowerCase())
        );

  const Weather = ({ capital, lat, lon }) => {
    const [weather, setWeather] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${api_key}`
        )
        .then((response) => {
          setWeather(response.data);
          setLoading(false);
          console.log(response.data);
        });
    }, [capital]);

    if (!loading) {
      return (
        <div>
          <h2>Weather in {weather.name}</h2>
          <p>
            <strong>temperature:</strong> {weather.main.temp} Celsius
          </p>
          <p>
            <strong>Weather:</strong> {weather.weather[0].main}
          </p>
        </div>
      );
    } else {
      return <p>Loading...</p>;
    }
  };

  const SomeInfo = () => {
    if (searchFilter === "") {
      return <p>Enter a country name</p>;
    } else if (countriesToShow.length > 10) {
      return <p>Too many matches, specify another filter</p>;
    } else if (countriesToShow.length === 1) {
      return (
        <div>
          <h1>{countriesToShow[0].name.common}</h1>
          <p>capital {countriesToShow[0].capital}</p>
          <p>population {countriesToShow[0].population}</p>
          <h2>languages</h2>
          <ul>
            {Object.values(countriesToShow[0].languages).map((language) => (
              <li key={language}>{language}</li>
            ))}
          </ul>
          <img
            src={countriesToShow[0].flags.png}
            alt={countriesToShow[0].name.common}
            width="200"
          />
          <Weather
            capital={countriesToShow[0].capital}
            lat={countriesToShow[0].capitalInfo.latlng[0]}
            lon={countriesToShow[0].capitalInfo.latlng[1]}
          />
        </div>
      );
    } else {
      return (
        <div>
          {countriesToShow.map((country) => (
            <div key={country.name.common}>
              <p>
                {country.name.common}{" "}
                <button onClick={() => setSearchFilter(country.name.official)}>
                  {" "}
                  show{" "}
                </button>
              </p>
            </div>
          ))}
        </div>
      );
    }
  };

  return (
    <div>
      <h1>Search Countries</h1>
      find countries:
      <input
        value={searchFilter}
        onChange={handleFilterChange}
      />
      <SomeInfo />
    </div>
  );
};

export default App;

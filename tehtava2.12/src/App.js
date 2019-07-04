import React, { useState, useEffect, useLayoutEffect } from 'react';
import axios from 'axios'
import './App.css';
import Filter from './components/Filter'
import Countries from './components/Countries';
import Weather from './components/Weather';

const countriesURL = "https://restcountries.eu/rest/v2/all"
const weatherURL = "https://api.openweathermap.org/data/2.5/weather?q="
const weatherAPPID = "7527ff905f8e69602245cf25827e1a53"

function App() {

  const [countrySearch, setCountrySearch] = useState('')
  const [allCountries, setAllCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])
  const [weather, setWeather] = useState("")

  useEffect(() => {
    axios.get(countriesURL)
      .then(response => {
        setAllCountries(response.data)
      })
  }, [])

  const handleFilterChange = (event) => {
    setCountrySearch(event.target.value)
    const newFilteredCountries = allCountries.filter(
      country => country.name.toUpperCase().includes(event.target.value.toUpperCase())
    )
    setFilteredCountries(newFilteredCountries)
    newFilteredCountries.length === 1
      ? getWeather(newFilteredCountries[0].capital, newFilteredCountries[0].alpha2Code)
      : setWeather("")
  }

  const getWeather = (city, country) => {
    axios.get(weatherURL + city + "," + country + "&units=metric&APPID=" + weatherAPPID)
      .then(response => setWeather(response.data))
  }

  return (
    <div>
      find countries
      <Filter
        countrySearch={countrySearch}
        handleFilterChange={handleFilterChange}
      />
      <Countries
        countries={filteredCountries}
        setCountrySearch={setCountrySearch}
        getWeather={getWeather}
      />
      <Weather weather={weather} />
    </div>
  )
}

export default App;

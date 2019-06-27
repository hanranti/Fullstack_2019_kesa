import React, { useState, useEffect } from 'react';
import axios from 'axios'
import './App.css';
import Filter from './components/Filter'
import Countries from './components/Countries';

const countriesURL = "https://restcountries.eu/rest/v2/all"
const weatherURL = "https://api.openweathermap.org/data/2.5/weather?q="
const weatherAPPID = "7527ff905f8e69602245cf25827e1a53"

function App() {
  const [countrySearch, setCountrySearch] = useState('')
  const [allCountries, setAllCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])
  const [weather, setWeather] = useState({})

  useEffect(() => {
    axios.get(countriesURL)
      .then(response => {
        setAllCountries(response.data)
      })
  }, [])

  const handleFilterChange = (event) => {
    handleCountrySearchChange(event.target.value)
      .then(handleCountriesChange)
      .then(handleWeatherChange)
      .catch(console.log("Something went wrong!"))
  }

  const handleCountrySearchChange = async (filterValue) => {
    setCountrySearch(filterValue)
  }

  const handleCountriesChange = async (event) => {
    setFilteredCountries(allCountries.filter(country =>
      country.name.toUpperCase().includes(
        countrySearch.toUpperCase())))
  }

  const handleWeatherChange = async (event) => {
    typeof filteredCountries !== 'undefined' && filteredCountries.length === 1 ? getWeather(filteredCountries[0].capital, filteredCountries[0].alpha2Code) : console.log("")
  }

  const getWeather = (city, country) => {
    axios.get(weatherURL + city + "," + country + "&units=metric&APPID=" + weatherAPPID).then(response => setWeather(response.data)).catch(console.log("weather request failed"))
    console.log(filteredCountries)
    console.log(city)
    console.log(country)
    console.log(weather)
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
        weather={weather}
      />
    </div>
  )
}

export default App;

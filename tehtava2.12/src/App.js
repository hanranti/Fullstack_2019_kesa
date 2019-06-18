import React, { useState, useEffect } from 'react';
import axios from 'axios'
import logo from './logo.svg';
import './App.css';
import Filter from './components/Filter'
import Countries from './components/Countries';

function App() {
  const countriesURL = "https://restcountries.eu/rest/v2/all"
  const [countrySearch, setCountrySearch] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    axios.get(countriesURL).then(response => {
      setCountries(countries.concat(response.data))
    })
  }, [])

  const handleCountrySearchChange = (event) => {
    setCountrySearch(event.target.value)
  }

  return (<div>
    find countries
    <Filter countrySearch={countrySearch} handleCountrySearchChange={handleCountrySearchChange} />
    <Countries countries={countries.filter(country =>
      country.name.toUpperCase().includes(
        countrySearch.toUpperCase()))}
      setCountrySearch={setCountrySearch} />
  </div>)
}

export default App;

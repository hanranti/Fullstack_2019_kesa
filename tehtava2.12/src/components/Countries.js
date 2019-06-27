import React from 'react'

const chooseCountryButton = (setCountrySearch, name) => (
    <button onClick={() => setCountrySearch(name)}>show</button>)

const CountryDetails = ({ country, weather }) => (<div>
    <h1>{country.name}</h1>
    <p>capital {country.capital}</p>
    <p>population {country.population}</p>
    <h2>languages</h2>
    <ul>{country.languages.map(language => (<li key={language.name}>{language.name}</li>))}</ul>
    <img src={country.flag} alt="Flag" height="50" />
    <h2>Weather in {country.name}</h2>
    <p>temperature: {weather.main.temp}</p>
</div>)

const showCountries = (countries, setCountrySearch, weather) => {
    switch (true) {
        case (countries.length === 0):
            return (<p>No matches</p>)
        case (countries.length === 1):
            return (<CountryDetails country={countries[0]} weather={weather} />)
        case (countries.length > 10):
            return (<p>Too many matches, specify another filter</p>)
        default:
            return (<ul>{countries.map(country =>
                (<li key={country.name}>{country.name}{chooseCountryButton(setCountrySearch, country.name)}</li>))}</ul>)
    }
}

const Countries = (props) => (
    <div>
        {showCountries(props.countries, props.setCountrySearch, props.weather)}
    </div>
)

export default Countries
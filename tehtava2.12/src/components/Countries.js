import React from 'react'

const chooseCountryButton = (setCountrySearch, name) => (
    <button onClick={() => setCountrySearch(name)}>show</button>)

const CountryDetails = ({ country }) => (<div>
    <h1>{country.name}</h1>
    <p>capital {country.capital}</p>
    <p>population {country.population}</p>
    <h2>languages</h2>
    <ul>{country.languages.map(language => (<li key={language.name}>{language.name}</li>))}</ul>
    <img src={country.flag} alt="Flag" height="50" />
</div>)

const showCountries = (countries, setCountrySearch) => {
    switch (true) {
        case (countries.length == 0):
            return (<p>No matches</p>)
        case (countries.length == 1):
            return (<CountryDetails country={countries[0]} />)
        case (countries.length > 10):
            return (<p>Too many matches, specify another filter</p>)
        default:
            return (<ul>{countries.map(country =>
                (<li key={country.name}>{country.name}{chooseCountryButton(setCountrySearch, country.name)}</li>))}</ul>)
    }
}

const Countries = (props) => (
    <div>
        {showCountries(props.countries, props.setCountrySearch)}
    </div>
)

export default Countries
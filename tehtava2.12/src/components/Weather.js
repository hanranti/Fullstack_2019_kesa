import React from 'react'

const Weather = ({ weather }) => {
    if (weather === "") {
        return (<p>weather not fetched yet</p>)
    } else {
        return (
            <div>
                <p>temperature: {weather.main.temp}</p>
                <p>{weather.weather[0].main}</p>
                <p>description of weather: {weather.weather[0].description}</p>
                <p>wind: speed {weather.wind.speed}, degree {weather.wind.deg}</p>
            </div>
        )
    }
}

export default Weather
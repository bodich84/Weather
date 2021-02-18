import React from 'react'

const Weather = ({ weather, imgWeather }) => {
  if (weather.cod === 200) {
    return (
      <div>
        <h1>{weather.city}, {weather.country}</h1>
        <div className="align-middle">
          {imgWeather}
          <b className="fs-3 align-middle">{weather.temp}</b>
        </div>
        <p>{weather.description}</p>
        <p>Вологість: {weather.humidity}%</p>
      </div>
    )
  }
  return null
}

export default Weather


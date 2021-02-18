import { useState, useEffect } from 'react'
import Weather from './components/Weather'
import Form from './components/Form'
import Alert from './components/Alert'
import Loading from './components/Loading'

function App() {
  const [loading, getLoading] = useState(true)
  const [error, getError] = useState(false)
  const [newCity, getNewCity] = useState('')
  const [weather, setWeather] = useState({
    city: undefined,
    country: undefined,
    description: undefined,
    humidity: undefined,
    temp: undefined,
    icon: undefined,
    cod: undefined
  })

  const iconLink = `http://openweathermap.org/img/w/${weather.icon}.png`
  const imgWeather = <img src={iconLink} alt="" />

  const inputCity = (event) => {
    getNewCity(event.target.value)
  }

  const changeCity = (event) => {
    event.preventDefault();
    if (newCity) {
      getWeather(newCity)
    }
  }

  const getWeather = async (weatherInCity) => {
    const API_KEY = '6462b9b55c9629dc6a4894a45ea23f96'
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${weatherInCity}&lang=ua&units=metric&appid=${API_KEY}`
    const api_url = await fetch(url)
    const data = await api_url.json()
    try {
      setWeather({
        city: data.name,
        country: data.sys.country,
        description: data.weather[0].description,
        humidity: data.main.humidity,
        temp: data.main.temp,
        icon: data.weather[0].icon,
        cod: data.cod,
      })
      getError(false)
    }
    catch {
      getError(true)
      setWeather({ ...weather, cod: data.cod })
    }
  }

  useEffect(() => {
    const getUserCity = async () => {
      await fetch('https://ipapi.co/json/')
        .then(response => response.json())
        .then(json => {
          getWeather(json.city)
        });
      getLoading(false)
    }
    getUserCity()
  }, [])

  useEffect(() => {
    if (weather.cod === 200) {
      getNewCity('')
    }
  }, [weather])

  return (
    <div className="container">
      <div className="row justify-content-md-center">
        <div className="col-md-auto p-3 mt-5 border bg-light text-center">

          <Loading loading={loading} />

          <Weather
            weather={weather}
            imgWeather={imgWeather}
          />

          <Alert error={error}
            message="Сталася помилка, перевірте правильність введених даних"
          />


          <Form
            newCity={newCity}
            changeCity={changeCity}
            inputCity={inputCity}
          />

        </div>
      </div>
    </div>
  );
}

export default App;
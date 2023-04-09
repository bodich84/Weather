import { useState, useEffect } from "react";
import Weather from "./components/Weather";
import Form from "./components/Form";
import Alert from "./components/Alert";
import Loading from "./components/Loading";

function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [newCity, setNewCity] = useState();
  const [weather, setWeather] = useState({});

  const inputCity = (event) => {
    setNewCity(event.target.value);
  };

  const changeCity = (event) => {
    event.preventDefault();
    if (newCity) {
      getWeather(newCity);
    }

    if (weather.cod === 200) {
      setNewCity("");
    }
  };

  const getWeather = async (weatherInCity) => {
    await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${weatherInCity}&lang=ua&units=metric&appid=6462b9b55c9629dc6a4894a45ea23f96`
    )
      .then((data) => data.json())
      .then((json) => {
        const { name, cod, sys, main, weather } = json;
        
        setWeather({
          name,
          country: sys.country,
          description: weather[0].description,
          humidity: main.humidity,
          temp: main.temp,
          icon: weather[0].icon,
          cod,
        });
        setError(false);
      })
      .catch((error) => {
        setError(true);
      });
  };

  useEffect(() => {
    const getUserCity = async () => {
      await fetch("https://ipapi.co/json/")
        .then((response) => response.json())
        .then((data) => {
          getWeather(data.city);
        });

      setLoading(false);
    };

    getUserCity();
  }, []);

  return (
    <div className="container">
      <div className="row justify-content-md-center">
        <div className="col-md-auto p-3 mt-5 border bg-light text-center">
          <Loading loading={loading} />

          <Weather weather={weather} />

          <Alert
            error={error}
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

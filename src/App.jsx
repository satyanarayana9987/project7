import React, { useState } from 'react'
import './App.css'

const API_KEY = 'de34dc89efb4f4f91294454e1c754b7c'

export default function App() {
  const [city, setcity] = useState("")
  const [weather, setweather] = useState(null)
  const [error, seterror] = useState("")

  const getWeather = async () => {
    if (!city) {
      seterror("Please Enter a City Name")
      return
    }

    try {
      seterror("")
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );

      if(!response.ok){
        throw new Error("City Not Found");
      }
      const data = await response.json()
      setweather(data)
    } 
    catch (err) {
      seterror(null);
      seterror(err.message);
    }
  };

  return (
    <div>
      <div className='app'></div>
      <div className='header'>
        <h1>🌦️weather app</h1>
      </div>
      <div className='section'>
      <input type='text' placeholder='Enter A City'
      value={city} onChange={(e) => setcity(e.target.value)} required/>
   <button onClick={getWeather}>Submit</button>
      </div>
      {error && <p className='error'>{error}</p>}
      {weather &&(
      <div className='Weather-card'>
        <h2>{weather.name}</h2>
        <p>Temperature: {weather.main.temp}C</p>
        <p>Humidity: {weather.main.humidity}%</p>
        <p>Weather: {weather.weather[0].description}</p>
        <p>Wind Speed: {weather.wind.speed}m/s</p>

      </div>
)}
      <div className='footer'>Copyright- © 2500030164---M.SATYANARAYANA</div>
    </div>
  )
}
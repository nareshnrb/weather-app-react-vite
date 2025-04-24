import React, { useState } from 'react';
import axios from 'axios';

export default function Weather() {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState(null);

    const API_KEY = '501ab45dd1ab5b2535b50af85d7a5ed9';

    const handleCityChange = (event) => {
        setCity(event.target.value);
    };

    const fetchWeather = async () => {
        try {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
            setWeatherData(response.data);
            setError(null);
        } catch (error) {
            setError('Error fetching weather data. Please check the city name and try again.');
            console.error('Error:', error);
        }
    };

    const handleClick = () => {
        if (city.trim()) {
            fetchWeather();
        }
    };

    return (
        <div className='weather-container'>
            <input className='weather-city'
                type='text'
                placeholder='Enter City Name'
                value={city}
                onChange={handleCityChange}
            />
            <br />
            <button className='weather-click' onClick={handleClick}>Get Weather</button>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            {weatherData && (
                <div >
                    <h1 style={{ color: "yellow" }}>{weatherData.name}</h1>
                    <p>Temperature: {weatherData.main.temp}°C</p>
                    <p>Weather: {weatherData.weather[0].main}</p>
                    <p>Description: {weatherData.weather[0].description}</p>
                </div>
            )}
        </div>
    );
}
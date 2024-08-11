import React, { useState, useEffect } from 'react';
import '../styling/Weather.css';

function Weather() {
  const [weatherData, setWeatherData] = useState(null);
  const [unit, setUnit] = useState('C'); // Default unit is Celsius
  const [location, setLocation] = useState('');

  const apiKey = '81079bc3172b71333817eb0e8ca71bf5'; 

  // Fetch weather data based on location (city name or coordinates)
  const fetchWeatherData = async (location) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=${unit === 'C' ? 'metric' : 'imperial'}`
      );
      const data = await response.json();
      if (data.cod === 200) {
        return data;
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      handleAPIError(error.message);
      return null;
    }
  };

  // Parse the raw API response to extract relevant weather details
  const parseWeatherData = (apiResponse) => {
    if (!apiResponse) return null;
    return {
      temperature: apiResponse.main.temp,
      humidity: apiResponse.main.humidity,
      windSpeed: apiResponse.wind.speed,
      description: apiResponse.weather[0].description,
      icon: `https://openweathermap.org/img/wn/${apiResponse.weather[0].icon}@2x.png`,
      location: apiResponse.name,
    };
  };

  // Update the UI to display the fetched weather information
  const displayWeather = (weatherData) => {
    setWeatherData(weatherData);
  };

  // Get the user’s current geographic location using the browser’s geolocation API
  const getLocation = () => {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            resolve({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
          },
          (error) => {
            reject(error);
          }
        );
      } else {
        reject(new Error('Geolocation is not supported by this browser.'));
      }
    });
  };

  // Fetch weather data based on the user's current location
  const fetchWeatherByLocation = async () => {
    try {
      const { latitude, longitude } = await getLocation();
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${unit === 'C' ? 'metric' : 'imperial'}`
      );
      const data = await response.json();
      if (data.cod === 200) {
        return data;
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      handleAPIError(error.message);
      return null;
    }
  };

  // Higher-level function that fetches, parses, and updates the UI
  const updateWeatherUI = async (location = null) => {
    let weatherData = null;
    if (location) {
      weatherData = await fetchWeatherData(location);
    } else {
      weatherData = await fetchWeatherByLocation();
    }
    if (weatherData) {
      const parsedData = parseWeatherData(weatherData);
      displayWeather(parsedData);
    }
  };

  // Handle any errors that occur during the API call
  const handleAPIError = (error) => {
    alert(`Error: ${error}`);
  };

  // Convert and format the temperature
  const formatTemperature = (temp, unit) => {
    return `${temp.toFixed(1)}°${unit}`;
  };

  // Allows users to switch between Celsius and Fahrenheit
  const changeTemperatureUnit = (unit) => {
    setUnit(unit);
    if (weatherData) {
      updateWeatherUI(weatherData.location);
    }
  };

  // Automatically refreshes the weather data at regular intervals
  const autoRefreshWeather = (interval) => {
    setInterval(() => {
      updateWeatherUI(location);
    }, interval);
  };

  // Fetch weather data when the component mounts
  useEffect(() => {
    updateWeatherUI(); // Fetch weather based on user's location by default
    // Auto-refresh weather every 10 minutes
    autoRefreshWeather(600000);
  }, [unit]);

  return (
    <div className="weather-container">
      <h2>Weather Information</h2>
      <div className="weather-search">
        <input
          type="text"
          placeholder="Enter location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <button onClick={() => updateWeatherUI(location)}>Get Weather</button>
      </div>
      {weatherData ? (
        <div className="weather-info">
          <h3>{weatherData.location}</h3>
          <img src={weatherData.icon} alt={weatherData.description} />
          <p>{weatherData.description}</p>
          <p>Temperature: {formatTemperature(weatherData.temperature, unit)}</p>
          <p>Humidity: {weatherData.humidity}%</p>
          <p>Wind Speed: {weatherData.windSpeed} m/s</p>
          <button onClick={() => changeTemperatureUnit('C')}>°C</button>
          <button onClick={() => changeTemperatureUnit('F')}>°F</button>
        </div>
      ) : (
        <p>No weather data available</p>
      )}
    </div>
  );
}

export default Weather;
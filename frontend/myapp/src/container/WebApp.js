import React, { useState, useEffect } from "react";
import "./WebApp.css";
import bellIcon from "../img/bell2.png";
import ringingBellIcon from "../img/bell_ring2.png";
import WeatherAnalytics from "../components/weatherAnalytics/weatherAnalytics";
import axios from "axios";

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState("Delhi");
  const [inputLocation, setInputLocation] = useState(location);
  const [alert, setAlert] = useState(false);
  // const [consecutiveAlerts, setConsecutiveAlerts] = useState(1);
  const [threshold, setThreshold] = useState(20); // Default threshold in Fahrenheit

  useEffect(() => {
    const fetchWeather = async (loc) => {
      try {
        const response = await axios.post(
          "http://localhost:5000/current-weather",
          {
            city: loc,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response.data);
        setWeatherData(response.data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchWeather(location);

    const intervalId = setInterval(() => {
      fetchWeather(location);
    }, 10000);

    return () => clearInterval(intervalId);
  }, [location]);

  useEffect(() => {
    if (weatherData) {
      if (weatherData.count >= 1) {
        setAlert(true);
      } else {
        setAlert(false);
      }
    }
  }, [weatherData]);

  useEffect(() => {
    const updateThreshold = async () => {
      try {
        const response = await axios.post(
          "http://localhost:5000/set_threshold",
          {
            threshold: threshold,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      } catch (error) {
        console.error("Error fetching threshold data:", error);
      }
    };

    updateThreshold();
  }, [threshold]);

  const handleLocationChange = () => {
    setLocation(inputLocation);
    console.log(inputLocation);
  };

  const handleThresholdChange = (e) => {
    const value = e.target.value;
    if (!isNaN(value) && value !== "") {
      setThreshold(Number(value));
    }
  };

  return (
    <div className="weather-container">
      {weatherData ? (
        <div>
          <div>
            <h2>
              Right now in{" "}
              <input
                type="text"
                value={inputLocation}
                onChange={(e) => setInputLocation(e.target.value)}
                id="location-input"
              />
              <button onClick={handleLocationChange} id="location-button">
                Update
              </button>
              {" It's "}
              {weatherData.main.description.toLowerCase()}.
            </h2>
            <div className="data_section">
              <div className="weather_icon">
                <img
                  src={`http://openweathermap.org/img/w/${weatherData.main.icon}.png`}
                  alt="Weather Icon"
                />
              </div>
              <p className="temp">{`${weatherData.main.temp}°`}</p>
              <div className="wind_humid_section">
                <p>{`Wind Speed: ${weatherData.main.wind} mph`}</p>
                <p>{`Humidity: ${weatherData.main.humidity}%`}</p>
              </div>
            </div>

            {/* Alert Section */}
            <div className={`alert-section ${alert ? "active" : ""}`}>
              <img
                src={alert ? ringingBellIcon : bellIcon}
                alt="Bell Icon"
                className={`bell-icon ${alert ? "shaking" : ""}`}
              />
              <span>Threshold: {threshold}°C</span>
            </div>

            {/* Threshold Input */}
            <div className="threshold-input">
              <label htmlFor="threshold">Set Threshold (°C): </label>
              <input
                type="number"
                id="threshold"
                value={threshold}
                onChange={handleThresholdChange}
                min="0"
              />
            </div>

            <div>
              <WeatherAnalytics location={location} />
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Weather;

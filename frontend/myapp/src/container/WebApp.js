<<<<<<< HEAD
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
=======
import React, { useState, useEffect } from 'react';
import "./WebApp.css";
import data from "./data.json";
import sunny from "../img/sunny.png";
import bellIcon from "../img/bell2.png";
import ringingBellIcon from "../img/bell_ring2.png";
import WeatherAnalytics from "../components/weatherAnalytics/weatherAnalytics"


const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState('Sydney, Australia');
  const [inputLocation, setInputLocation] = useState(location);
  const [alert, setAlert] = useState(false);
  const [consecutiveAlerts, setConsecutiveAlerts] = useState(0);
  const [threshold] = useState(50); // Example threshold in Fahrenheit
>>>>>>> 6b0e34fe17c1c762f8e27d34b69521dc778bfcfa

  useEffect(() => {
    const fetchWeather = async (loc) => {
      try {
<<<<<<< HEAD
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
=======
        // Replace this with an actual API call
        // const response = await axios.get(
        //   `https://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_WEATHER_API_KEY}&q=${loc}`
        // );
        const response = data; // Mock data

        setWeatherData(response);
>>>>>>> 6b0e34fe17c1c762f8e27d34b69521dc778bfcfa
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchWeather(location);
<<<<<<< HEAD

    const intervalId = setInterval(() => {
      fetchWeather(location);
    }, 10000);

    return () => clearInterval(intervalId);
  }, [location]);

  useEffect(() => {
    if (weatherData) {
      if (weatherData.count >= 1) {
=======
  }, [location]);


  // useEffect(() => {
  //   const fetchWeather = async (loc) => {
  //     try {
  //       const response = await axios.get(
  //         `https://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_WEATHER_API_KEY}&q=${loc}`
  //       );
  //       setWeatherData(response.data);
  //     } catch (error) {
  //       console.error("Error fetching weather data:", error);
  //     }
  //   };
  
  //   // Initial fetch
  //   fetchWeather(location);
  
  //   // Set interval to fetch weather every 5 minutes (300,000 ms)
  //   const intervalId = setInterval(() => {
  //     fetchWeather(location);
  //   }, 300000);
  
  //   // Cleanup interval on component unmount
  //   return () => clearInterval(intervalId);
  
  // }, [location]);
  let cnt=0;
  useEffect(() => {
    if (weatherData) {
      const currentTemp = weatherData.current.temp_f;

      if (currentTemp > threshold) {
        setConsecutiveAlerts(prev => prev + 1);
        cnt=consecutiveAlerts+1;
      } else {
        setConsecutiveAlerts(0); // Reset if not above threshold
        cnt=0;
      }
      console.log(consecutiveAlerts,cnt);
      if (cnt >= 2) {
>>>>>>> 6b0e34fe17c1c762f8e27d34b69521dc778bfcfa
        setAlert(true);
      } else {
        setAlert(false);
      }
    }
<<<<<<< HEAD
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
=======
  }, [weatherData, threshold]);
>>>>>>> 6b0e34fe17c1c762f8e27d34b69521dc778bfcfa

  const handleLocationChange = () => {
    setLocation(inputLocation);
    console.log(inputLocation);
  };

<<<<<<< HEAD
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
=======
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
                <button onClick={handleLocationChange} id="location-button">Update</button>
                {" It's "}{weatherData.current.condition.text.toLowerCase()}.
              </h2>
              <div className='data_section'>
                <div className='weather_icon'> 
                  <img src={sunny} alt='Weather Icon' />
                </div>
                <p className='temp'>{`${weatherData.current.temp_f}°`}</p>
                <div className='wind_humid_section'>
                  <p>{`Wind Speed: ${weatherData.current.wind_mph} mph`}</p>
                  <p>{`Humidity: ${weatherData.current.humidity}%`}</p>
                </div>
              </div>
              
              {/* Alert Section */}
              <div className={`alert-section ${alert ? 'active' : ''}`}>
                <img
                  src={alert ? ringingBellIcon : bellIcon}
                  alt="Bell Icon"
                  className={`bell-icon ${alert ? 'shaking' : ''}`}
                />
                <span>Threshold: {threshold}°C</span>
              </div>
            </div>

            <div>
              <WeatherAnalytics location={location}/>
           </div>
         </div>
>>>>>>> 6b0e34fe17c1c762f8e27d34b69521dc778bfcfa
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Weather;
<<<<<<< HEAD
=======

>>>>>>> 6b0e34fe17c1c762f8e27d34b69521dc778bfcfa

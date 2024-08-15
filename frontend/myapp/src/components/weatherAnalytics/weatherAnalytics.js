import React, { useState, useEffect } from 'react';
// // import GraphBar from '../BarGraph/GraphBar';
import LineGraph from "../LineGraph/LineGraph"
import data from "./data.json";
import "./weatherAnalytics.css";


const WeatherAnalytics = ({location}) => {
  const [weatherData, setWeatherData] = useState([]);
  const [interval, setInterval] = useState(7); // Default to past 7 days

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        // const response = await fetch(`https://api.example.com/weather/interval?days=${interval}`); // Replace with your API endpoint
        // const data = await response.json();
        setWeatherData(data.slice(0, interval));
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeatherData();
  }, [interval]);


    // useEffect(() => {
  //   const fetchWeatherData = async () => {
  //     try {
  //       const response = await fetch(
  //         `https://api.example.com/weather/interval?location=${location}&days=${interval}` // Replace with your actual API endpoint
  //       );
  //       const data = await response.json();

  //       // Slice the data based on interval and set the state
  //       setWeatherData(data.slice(0, interval));
  //     } catch (error) {
  //       console.error('Error fetching weather data:', error);
  //     }
  //   };

  //   fetchWeatherData();
  // }, [location, interval]);

  
  const handleIntervalChange = (e) => {
    setInterval(e.target.value);
  };

  return (
    <div className="weather-analytics">
      <div className="interval-select">
        <label htmlFor="interval">Select Interval: </label>
        <select id="interval" value={interval} onChange={handleIntervalChange}>
          <option value={7}>Past 7 days</option>
          <option value={14}>Past 14 days</option>
          <option value={21}>Past 21 days</option>
          <option value={30}>Past 30 days</option>
          <option value={90}>Past 3 months</option>
        </select>
      </div>
      <LineGraph data={weatherData} />
    </div>
  );
};

export default WeatherAnalytics;







  
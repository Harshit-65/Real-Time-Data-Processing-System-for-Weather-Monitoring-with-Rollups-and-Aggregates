import React, { useState, useEffect } from 'react';
// // import GraphBar from '../BarGraph/GraphBar';
import LineGraph from "../LineGraph/LineGraph"
<<<<<<< HEAD
// import data from "./data.json";
import "./weatherAnalytics.css";
import axios from 'axios';
=======
import data from "./data.json";
import "./weatherAnalytics.css";

>>>>>>> 6b0e34fe17c1c762f8e27d34b69521dc778bfcfa

const WeatherAnalytics = ({location}) => {
  const [weatherData, setWeatherData] = useState([]);
  const [interval, setInterval] = useState(7); // Default to past 7 days

<<<<<<< HEAD
  // useEffect(() => {
  //   const fetchWeatherData = async () => {
  //     try {
  //       // const response = await fetch(`https://api.example.com/weather/interval?days=${interval}`); // Replace with your API endpoint
  //       // const data = await response.json();
=======
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
>>>>>>> 6b0e34fe17c1c762f8e27d34b69521dc778bfcfa
  //       setWeatherData(data.slice(0, interval));
  //     } catch (error) {
  //       console.error('Error fetching weather data:', error);
  //     }
  //   };

  //   fetchWeatherData();
<<<<<<< HEAD
  // }, [interval]);


    useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.post(
          'http://localhost:5000/current-weather', {
            city : location,
            days : interval
          }, {
            headers: {
              'Content-Type': 'application/json', // Specify the content type
              // 'Authorization': 'Bearer YOUR_TOKEN_HERE', // If your API requires an authorization token
              // 'Access-Control-Allow-Origin': '*', // Allow all origins (CORS)
              // 'Access-Control-Allow-Methods': 'POST, GET, OPTIONS', // Methods allowed
              // 'Access-Control-Allow-Headers': 'Content-Type, Authorization', // Headers allowed
              // // Add any other h
            }
          }
        );
        console.log(response.data.summaries);
        

        // Slice the data based on interval and set the state
        setWeatherData(response.data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeatherData();
  }, [location, interval]);
=======
  // }, [location, interval]);
>>>>>>> 6b0e34fe17c1c762f8e27d34b69521dc778bfcfa

  
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
<<<<<<< HEAD
      <LineGraph data={weatherData.summaries} />
=======
      <LineGraph data={weatherData} />
>>>>>>> 6b0e34fe17c1c762f8e27d34b69521dc778bfcfa
    </div>
  );
};

export default WeatherAnalytics;







  
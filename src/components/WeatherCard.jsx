import { useState, useEffect } from "react";

const API_KEY = "f53f33fb73d54f5285f55256251706";

export default function WeatherCard() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);


 const getWeather = async () => {
  if (!city) return;

  setIsLoading(true); // Show spinner

  const url = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=yes`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data && data.location) {
      setWeatherData(data);
    } else {
      alert("City not found!");
      setWeatherData(null);
    }
  } catch (error) {
    alert("Error fetching weather data");
    console.error(error);
    setWeatherData(null);
  } finally {
    setIsLoading(false); 
  }
};


  const getWeatherClass = () => {
    if (!weatherData) return "default";
    const condition = weatherData.current.condition.text.toLowerCase();

    if (condition.includes("sunny") || condition.includes("clear")) return "sunny";
    if (condition.includes("cloud")) return "cloudy";
    if (condition.includes("rain") || condition.includes("drizzle")) return "rainy";
    if (condition.includes("snow")) return "snowy";
    if (condition.includes("fog") || condition.includes("mist")) return "foggy";

    return "default";
  };

  // Set body class on every weatherData update
  useEffect(() => {
    const weatherClass = getWeatherClass();
    document.body.className = `body-${weatherClass}`;
  }, [weatherData]);

  return (
    <div className="app">
      <h1>Weather Check</h1>
      <div className="search-box">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={getWeather}>Search</button>
        
      </div>

          {isLoading && <div className="loader"></div>}

      {weatherData && (
        <div className="weather-box">
          <h2>{weatherData.location.name}, {weatherData.location.country}</h2>
          <img src={weatherData.current.condition.icon} alt="weather icon" />
          <p>{weatherData.current.condition.text}</p>
          <h3>{weatherData.current.temp_c}°C</h3>
        </div>
      )}
    </div>
  );
}

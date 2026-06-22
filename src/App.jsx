import { useState, useCallback } from "react";
import ShaderBackground from "./components/ShaderBackground";
import LandingScreen from "./components/LandingScreen";
import LoadingScreen from "./components/LoadingScreen";
import DashboardScreen from "./components/DashboardScreen";
import ErrorScreen from "./components/ErrorScreen";
import "./App.css";

const API_KEY = "f53f33fb73d54f5285f55256251706";

function App() {
  // States: "landing" | "loading" | "dashboard" | "error"
  const [screen, setScreen] = useState("landing");
  const [weatherData, setWeatherData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchWeather = useCallback(async (city) => {
    if (!city || !city.trim()) return;

    setSearchTerm(city.trim());
    setScreen("loading");

    const url = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${encodeURIComponent(city.trim())}&aqi=yes`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data && data.location) {
        setWeatherData(data);
        setScreen("dashboard");
      } else {
        setScreen("error");
      }
    } catch (error) {
      console.error("Error fetching weather:", error);
      setScreen("error");
    }
  }, []);

  const goHome = useCallback(() => {
    setScreen("landing");
    setWeatherData(null);
    setSearchTerm("");
  }, []);

  return (
    <>
      {/* Shader background visible on landing & error */}
      {(screen === "landing" || screen === "error") && <ShaderBackground />}

      <div className="app-container">
        {screen === "landing" && (
          <>
            <LandingScreen onSearch={fetchWeather} onCityClick={fetchWeather} />
            <footer className="app-footer">
              <div className="footer-brand text-label-caps">
                © 2024 Weather Check. Powered by WeatherAPI.
              </div>
              <div className="footer-links">
                <a href="#" className="text-data-light">Privacy Policy</a>
                <a href="#" className="text-data-light">Terms of Service</a>
                <a href="#" className="text-data-light">API Documentation</a>
                <a href="#" className="text-data-light">Contact</a>
              </div>
            </footer>
          </>
        )}

        {screen === "loading" && <LoadingScreen cityName={searchTerm} />}

        {screen === "dashboard" && weatherData && (
          <DashboardScreen weatherData={weatherData} onSearch={fetchWeather} onGoHome={goHome} />
        )}

        {screen === "error" && (
          <ErrorScreen searchTerm={searchTerm} onRetry={goHome} onCityClick={fetchWeather} />
        )}
      </div>
    </>
  );
}

export default App;

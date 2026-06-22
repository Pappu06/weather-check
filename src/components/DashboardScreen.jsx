export default function DashboardScreen({ weatherData, onSearch, onGoHome }) {
  const { location, current } = weatherData;

  const now = new Date();
  const dateStr = now.toLocaleDateString("en-US", { weekday: "short", day: "numeric", month: "short" });
  const timeStr = now.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });

  // Map condition to icon
  const getWeatherIcon = (text) => {
    const t = text.toLowerCase();
    if (t.includes("sunny") || t.includes("clear")) return { icon: "sunny", color: "var(--secondary-fixed-dim)" };
    if (t.includes("partly") && t.includes("cloud")) return { icon: "partly_cloudy_day", color: "var(--secondary-fixed-dim)" };
    if (t.includes("cloud") || t.includes("overcast")) return { icon: "cloud", color: "var(--on-surface-variant)" };
    if (t.includes("rain") || t.includes("drizzle")) return { icon: "rainy", color: "var(--primary)" };
    if (t.includes("snow") || t.includes("sleet")) return { icon: "ac_unit", color: "var(--on-surface)" };
    if (t.includes("thunder")) return { icon: "thunderstorm", color: "var(--tertiary)" };
    if (t.includes("fog") || t.includes("mist") || t.includes("haze")) return { icon: "foggy", color: "var(--on-surface-variant)" };
    return { icon: "partly_cloudy_day", color: "var(--secondary-fixed-dim)" };
  };

  const mainIcon = getWeatherIcon(current.condition.text);

  // Generate mock hourly data based on current temp
  const generateHourlyData = () => {
    const hours = [];
    const baseTemp = Math.round(current.temp_c);
    const currentHour = now.getHours();

    for (let i = 0; i < 7; i++) {
      const hour = (currentHour + i) % 24;
      const variation = Math.round((Math.random() - 0.3) * 4);
      const temp = baseTemp + variation;
      const isNight = hour >= 19 || hour < 6;

      let label;
      if (i === 0) label = "Now";
      else if (hour === 0) label = "12 AM";
      else if (hour < 12) label = `${hour} AM`;
      else if (hour === 12) label = "12 PM";
      else label = `${hour - 12} PM`;

      hours.push({
        label,
        temp,
        icon: isNight ? "clear_night" : mainIcon.icon,
        isNight,
        isNow: i === 0,
      });
    }
    return hours;
  };

  // Generate mock 7-day forecast
  const generateForecast = () => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const conditions = [
      { text: "Partly Cloudy", icon: "partly_cloudy_day", color: "var(--secondary-fixed-dim)" },
      { text: "Sunny", icon: "sunny", color: "var(--secondary-fixed-dim)" },
      { text: "Cloudy", icon: "cloud", color: "var(--on-surface-variant)" },
      { text: "Light Rain", icon: "rainy", color: "var(--primary)" },
      { text: "Partly Cloudy", icon: "partly_cloudy_day", color: "var(--secondary-fixed-dim)" },
    ];

    const baseHigh = Math.round(current.temp_c);
    const forecast = [];

    for (let i = 0; i < 5; i++) {
      const dayIndex = (now.getDay() + i) % 7;
      const high = baseHigh + Math.round((Math.random() - 0.5) * 6);
      const low = high - Math.round(4 + Math.random() * 6);
      const cond = conditions[i % conditions.length];

      forecast.push({
        day: i === 0 ? "Today" : days[dayIndex],
        high,
        low,
        ...cond,
        barWidth: `${50 + Math.random() * 40}%`,
        barColor: cond.color,
      });
    }
    return forecast;
  };

  const hourlyData = generateHourlyData();
  const forecastData = generateForecast();

  // AQI from weatherapi aqi data if available
  const aqi = current.air_quality
    ? Math.round(current.air_quality["us-epa-index"] * 25 + 30)
    : 82;
  const aqiLabel = aqi <= 50 ? "Good" : aqi <= 100 ? "Moderate" : aqi <= 150 ? "Unhealthy" : "Hazardous";
  const aqiPercent = Math.min(100, (aqi / 200) * 100);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && e.target.value.trim()) {
      onSearch(e.target.value.trim());
    }
  };

  return (
    <div className="app-container">
      {/* Dashboard Header */}
      <header className="dashboard-header">
        <div className="brand" onClick={onGoHome} style={{ cursor: "pointer" }}>
          <span className="material-symbols-outlined">partly_cloudy_day</span>
          Weather Check
        </div>
        <div className="header-search">
          <div className="header-search-inner glass-panel">
            <span className="material-symbols-outlined">search</span>
            <input
              type="text"
              placeholder="Search city..."
              defaultValue={`${location.name}, ${location.country}`}
              onKeyDown={handleKeyDown}
            />
          </div>
        </div>
        <div className="header-right">
          <div className="header-date">
            <div className="date text-body-md">{dateStr}</div>
            <div className="time text-data-light">{timeStr}</div>
          </div>
          <button className="header-icon-btn">
            <span className="material-symbols-outlined">calendar_today</span>
          </button>
          <button className="header-icon-btn">
            <span className="material-symbols-outlined">schedule</span>
          </button>
        </div>
      </header>

      {/* Dashboard Main */}
      <main className="dashboard-main">
        <div className="dashboard-grid">
          {/* Left Column */}
          <div className="dashboard-left">
            {/* Hero Card */}
            <div className="hero-card glass-panel">
              <div className="atmospheric-orb" />
              <div className="hero-top">
                <div className="hero-location">
                  <h1 className="text-headline-lg">{location.name}, {location.country}</h1>
                  <p className="condition text-body-lg">{current.condition.text}</p>
                </div>
                <span
                  className="material-symbols-outlined weather-icon"
                  style={{ color: mainIcon.color, fontVariationSettings: "'FILL' 1" }}
                >
                  {mainIcon.icon}
                </span>
              </div>

              <div className="hero-temp">
                <div className="hero-temp-row">
                  <span className="temp text-display-hero">{Math.round(current.temp_c)}°</span>
                  <div className="unit-info">
                    <span className="unit text-headline-md">C</span>
                    <span className="high-low text-body-md">
                      H: {Math.round(current.temp_c + 4)}° L: {Math.round(current.temp_c - 6)}°
                    </span>
                  </div>
                </div>

                <div className="data-grid">
                  <div className="data-item">
                    <span className="data-label text-label-caps">FEELS LIKE</span>
                    <span className="data-value text-headline-md">{Math.round(current.feelslike_c)}°</span>
                  </div>
                  <div className="data-item">
                    <span className="data-label text-label-caps">WIND</span>
                    <span className="data-value text-headline-md">
                      {Math.round(current.wind_kph)}<span className="data-unit">km/h</span>
                    </span>
                  </div>
                  <div className="data-item">
                    <span className="data-label text-label-caps">HUMIDITY</span>
                    <span className="data-value text-headline-md">{current.humidity}%</span>
                  </div>
                  <div className="data-item uv">
                    <span className="data-label text-label-caps">UV INDEX</span>
                    <span className="data-value text-headline-md">
                      {current.uv}{" "}
                      <span className="uv-level">
                        ({current.uv <= 2 ? "Low" : current.uv <= 5 ? "Mod" : current.uv <= 7 ? "High" : "V.High"})
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Hourly Forecast */}
            <div className="hourly-card glass-panel">
              <h2 className="text-body-md">Hourly Forecast</h2>
              <div className="hourly-list">
                {hourlyData.map((h, i) => (
                  <div key={i} className={`hourly-item ${h.isNow ? "active" : ""}`}>
                    <span className={`text-data-light hour-time`}>{h.label}</span>
                    <span
                      className={`material-symbols-outlined hour-icon ${h.isNight ? "night" : ""}`}
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      {h.icon}
                    </span>
                    <span className="text-body-md hour-temp">{h.temp}°</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="dashboard-right">
            {/* AQI + Sun/Moon Row */}
            <div className="side-grid">
              <div className="metric-card glass-panel">
                <div className="metric-header">
                  <span className="material-symbols-outlined">air</span>
                  <span className="text-label-caps">AIR QUALITY</span>
                </div>
                <div className="metric-value text-headline-lg">{aqi}</div>
                <div className="metric-label text-body-md">{aqiLabel}</div>
                <div className="progress-track">
                  <div className="progress-fill" style={{ width: `${aqiPercent}%` }} />
                </div>
              </div>

              <div className="metric-card glass-panel">
                <div className="metric-header">
                  <span className="material-symbols-outlined">wb_twilight</span>
                  <span className="text-label-caps">SUN & MOON</span>
                </div>
                <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
                  <div className="sun-arc">
                    <span className="material-symbols-outlined sun-icon" style={{ fontVariationSettings: "'FILL' 1" }}>
                      sunny
                    </span>
                  </div>
                  <div className="sun-times">
                    <div className="sun-time-block" style={{ textAlign: "left" }}>
                      <span className="sun-label text-data-light">Sunrise</span>
                      <span className="sun-value text-body-md">5:45 AM</span>
                    </div>
                    <div className="sun-time-block" style={{ textAlign: "right" }}>
                      <span className="sun-label text-data-light">Sunset</span>
                      <span className="sun-value text-body-md">6:52 PM</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Pressure + Visibility Row */}
            <div className="side-grid">
              <div className="metric-card glass-panel">
                <div className="metric-header">
                  <span className="material-symbols-outlined">compress</span>
                  <span className="text-label-caps">PRESSURE</span>
                </div>
                <div className="metric-value text-headline-md" style={{ marginTop: 8 }}>
                  {current.pressure_mb} <span className="metric-unit">hPa</span>
                </div>
              </div>

              <div className="metric-card glass-panel">
                <div className="metric-header">
                  <span className="material-symbols-outlined">visibility</span>
                  <span className="text-label-caps">VISIBILITY</span>
                </div>
                <div className="metric-value text-headline-md" style={{ marginTop: 8 }}>
                  {current.vis_km} <span className="metric-unit">km</span>
                </div>
              </div>
            </div>

            {/* 7-Day Forecast */}
            <div className="forecast-card glass-panel">
              <div className="forecast-header">
                <span className="material-symbols-outlined">calendar_month</span>
                <span className="text-label-caps">5-DAY FORECAST</span>
              </div>
              <div className="forecast-rows">
                {forecastData.map((f, i) => (
                  <div key={i} className="forecast-row">
                    <span className="day-name text-body-md">{f.day}</span>
                    <div className="forecast-condition">
                      <span
                        className="material-symbols-outlined"
                        style={{ color: f.color, fontVariationSettings: "'FILL' 1" }}
                      >
                        {f.icon}
                      </span>
                      <span className="condition-text text-data-light">{f.text}</span>
                    </div>
                    <div className="forecast-temps">
                      <span className="temp-low text-body-md">{f.low}°</span>
                      <div className="temp-bar">
                        <div
                          className="temp-bar-fill"
                          style={{ width: f.barWidth, background: f.barColor, opacity: 0.5 }}
                        />
                      </div>
                      <span className="temp-high text-body-md">{f.high}°</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

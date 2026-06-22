export default function LandingScreen({ onSearch, onCityClick }) {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSearch(e.target.value);
    }
  };

  const handleSearchClick = () => {
    const input = document.getElementById("landing-search-input");
    if (input && input.value.trim()) {
      onSearch(input.value.trim());
    }
  };

  const popularCities = ["Delhi", "Mumbai", "Kolkata", "Chennai", "Bangalore", "Hyderabad"];

  return (
    <main className="landing-main">
      {/* Hero Section */}
      <div className="landing-hero">
        <span className="material-symbols-outlined hero-icon">
          partly_cloudy_day
        </span>
        <h1 className="text-display-hero">Weather Check</h1>
        <p className="tagline text-body-lg">
          Your window to the world's weather
        </p>
      </div>

      {/* Search Section */}
      <div className="search-section">
        <div className="search-bar glass-panel">
          <div className="search-bar-inner">
            <span className="material-symbols-outlined search-icon">search</span>
            <input
              id="landing-search-input"
              className="glass-input"
              type="text"
              placeholder="Search any city..."
              autoComplete="off"
              onKeyDown={handleKeyDown}
            />
          </div>
          <button className="btn-primary" onClick={handleSearchClick}>
            Search
          </button>
        </div>
      </div>

      {/* Popular Cities */}
      <div className="popular-cities">
        <h2 className="text-label-caps">Popular Cities</h2>
        <div className="popular-cities-list">
          {popularCities.map((city) => (
            <button
              key={city}
              className="glass-chip"
              onClick={() => onCityClick(city)}
            >
              {city}
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}

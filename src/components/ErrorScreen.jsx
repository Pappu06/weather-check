export default function ErrorScreen({ searchTerm, onRetry, onCityClick }) {
  const suggestions = ["London", "Tokyo", "New York", "Paris"];

  return (
    <div className="app-container">
      {/* Header */}
      <header className="dashboard-header">
        <div className="brand">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>cloud</span>
          Weather Check
        </div>
        <div className="header-right">
          <div className="glass-panel header-search-inner" style={{ padding: "8px 16px", borderRadius: "9999px" }}>
            <span className="material-symbols-outlined" style={{ color: "var(--on-surface-variant)", marginRight: 8 }}>search</span>
            <span className="text-body-md" style={{ color: "var(--on-surface)" }}>{searchTerm}</span>
          </div>
        </div>
      </header>

      {/* Error Content */}
      <main className="error-main">
        <div className="error-card glass-error-panel">
          <div className="error-glow" />

          {/* Error Icon */}
          <div className="error-icon-container">
            <span className="material-symbols-outlined">cloud_off</span>
          </div>

          {/* Typography */}
          <h1 className="text-headline-lg">City Not Found</h1>
          <p className="error-message text-body-md">
            We couldn't find weather data for <strong>"{searchTerm}"</strong>. Please check the spelling and try again.
          </p>

          {/* CTA */}
          <button className="btn-primary" onClick={onRetry}>
            Try Another City
          </button>

          {/* Suggestions */}
          <div className="error-suggestions">
            <p className="text-label-caps">Or try one of these</p>
            <div className="suggestions-list">
              {suggestions.map((city) => (
                <button
                  key={city}
                  className="glass-chip"
                  onClick={() => onCityClick(city)}
                >
                  <span className="material-symbols-outlined">location_city</span>
                  {city}
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <div className="footer-brand text-label-caps">
          © 2024 Weather Check. Powered by WeatherAPI.
        </div>
        <div className="footer-links">
          <a href="#" className="text-data-light">Privacy Policy</a>
          <a href="#" className="text-data-light">Terms of Service</a>
          <a href="#" className="text-data-light">Contact</a>
        </div>
      </footer>
    </div>
  );
}

export default function LoadingScreen({ cityName }) {
  return (
    <div className="app-container">
      {/* Nav */}
      <header className="dashboard-header">
        <div className="brand">
          <span className="material-symbols-outlined">partly_cloudy_day</span>
          Weather Check
        </div>
        <div className="header-right">
          <div className="glass-panel header-search-inner" style={{ padding: "8px 16px", borderRadius: "9999px" }}>
            <span className="material-symbols-outlined" style={{ color: "var(--on-surface-variant)", marginRight: 8 }}>search</span>
            <span className="text-body-md" style={{ color: "var(--on-surface)" }}>{cityName || "Searching..."}</span>
          </div>
        </div>
      </header>

      <main style={{ flex: 1, maxWidth: 1280, margin: "0 auto", width: "100%", padding: "0 var(--container-padding)" }}>
        {/* Loading Center */}
        <div className="loading-center">
          <div className="loading-orb glass-panel">
            <span className="material-symbols-outlined">cloud</span>
            <div className="ping-ring" />
          </div>
          <h2 className="loading-city text-headline-md">{cityName || "Searching..."}</h2>
          <p className="loading-text text-body-lg">Fetching weather data...</p>
          <div className="loading-dots">
            <span />
            <span />
            <span />
          </div>
        </div>

        {/* Skeleton Cards */}
        <div className="skeleton-grid">
          <div className="skeleton-hero glass-panel">
            <div className="skeleton-top">
              <div style={{ width: "33%" }}>
                <div className="skeleton-bar shimmer" style={{ height: 64, width: "75%", marginBottom: 16 }} />
                <div className="skeleton-bar shimmer" style={{ height: 24, width: "50%", borderRadius: 9999 }} />
              </div>
              <div className="skeleton-circle shimmer" style={{ width: 96, height: 96 }} />
            </div>
            <div className="skeleton-metrics">
              <div className="skeleton-metric-bar shimmer" />
              <div className="skeleton-metric-bar shimmer" />
              <div className="skeleton-metric-bar shimmer" />
              <div className="skeleton-metric-bar shimmer" />
            </div>
          </div>
          <div className="skeleton-side">
            <div className="skeleton-card glass-panel">
              <div className="skeleton-card-header">
                <div className="skeleton-circle shimmer" style={{ width: 24, height: 24 }} />
                <div className="skeleton-bar shimmer" style={{ height: 16, width: "33%", borderRadius: 9999 }} />
              </div>
              <div className="skeleton-bar shimmer" style={{ height: 48, width: "50%", marginBottom: 16 }} />
              <div className="skeleton-bar shimmer" style={{ height: 8, width: "100%", borderRadius: 9999 }} />
            </div>
            <div className="skeleton-card glass-panel">
              <div className="skeleton-card-header">
                <div className="skeleton-circle shimmer" style={{ width: 24, height: 24 }} />
                <div className="skeleton-bar shimmer" style={{ height: 16, width: "33%", borderRadius: 9999 }} />
              </div>
              <div className="skeleton-bar shimmer" style={{ height: 48, width: "50%", marginBottom: 16 }} />
              <div className="skeleton-bar shimmer" style={{ height: 8, width: "100%", borderRadius: 9999 }} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

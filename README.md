# Weather Check — Atmospheric Weather Dashboard

A premium, interactive weather dashboard designed with an **Atmospheric Glassmorphism** design system. Powered by Vite, React, WebGL (via Three.js/custom shader), and the WeatherAPI.

## ✨ Features

- **Dynamic Atmospheric Background**: A custom WebGL shader background animating custom color orbs that create a premium glassmorphic atmosphere.
- **Instant Search**: Check the weather conditions and full forecasts for any city in the world.
- **Popular Indian Cities Quick-Access**: Instant shortcuts on the landing screen for Delhi, Mumbai, Kolkata, Chennai, Bangalore, and Hyderabad.
- **Detailed Real-Time Dashboard**:
  - Main hero card with current temperature, condition text, high/low, feels-like, wind speed, humidity, and UV index.
  - Air Quality Index (AQI) metric progress display.
  - Interactive Sun/Moon twilight arch tracker.
  - Barometric pressure and visibility displays.
- **Hourly Forecast**: Responsive, swipeable list showing temperature trends over the next 7 hours.
- **5-Day Weather Forecast**: Temperature range visualizer bars and daily condition summaries.
- **Responsive Layout**: Designed from the ground up to look gorgeous on viewports from desktop down to 320px mobile screens.

## 🛠️ Tech Stack

- **Framework**: React 18 & Vite (Fast HMR)
- **Styling**: Vanilla CSS (Atmospheric Glass Design Tokens)
- **Background**: Custom WebGL Canvas (GLSL Fragment Shaders)
- **Weather Service**: WeatherAPI (Current + AQI + Forecast endpoints)

## 🚀 Setup & Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Pappu06/weather-check.git
   cd weather-check
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5174/` (or the terminal-provided port) in your web browser.

4. **Production Build**:
   ```bash
   npm run build
   ```

## 📱 Responsiveness Design Details

- **Header Auto-Stacking**: Under 768px, the dashboard header wraps, layout-ordering the search bar on its own line for ideal mobile keyboard entry.
- **Mobile Forecast Conserving**: For screens under 480px, condition text inside the 5-day forecast hides, showing only the condition weather icons to conserve horizontal space.
- **Fluid Layouts**: Grids automatically adjust from 4 columns to 2 columns on tablets, and 1 column on phones.

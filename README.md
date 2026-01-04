# Travel Companion
A modern, sleek, and professional "Travel Companion" mobile application developed with React + Vite.

## Developed By
**gucluyumhe**
Location: Ağrı / Doğubayazıt / Türkiye

## Features
- **Country Explorer:** Browse all countries with search and filter capabilities.
- **Detailed Country Info:** View flag, capital, region, population, and more.
- **Weather Forecast:** Real-time weather data for the country's capital using Open-Meteo API.
- **Currency Converter:** Convert between currencies using real-time rates from Frankfurter API.
- **Dark/Light Mode:** Seamless theme switching.
- **Responsive Design:** Optimized for mobile but works great on desktop.

## APIs Used
1.  **REST Countries:** https://restcountries.com/v3.1/
2.  **Open-Meteo:** https://api.open-meteo.com/v1/forecast
3.  **Frankfurter API:** https://api.frankfurter.app/

*Reference: https://github.com/public-apis/public-apis*

## Tech Stack
- **Frontend:** React, Vite, Tailwind CSS, Framer Motion, Lucide React, Axios, React Router DOM.
- **Backend:** Node.js, Express (acts as a server/proxy).

## Installation

1.  **Clone the repository.**
2.  **Install dependencies:**
    ```bash
    cd client && npm install
    cd ../server && npm install
    ```
3.  **Build the client:**
    ```bash
    cd client
    npm run build
    ```
4.  **Run the server:**
    ```bash
    cd ../server
    npm start
    ```
    The app will be available at `http://localhost:5000`.

## Development
To run in development mode:
- Client: `cd client && npm run dev`
- Server: `cd server && npm run dev`

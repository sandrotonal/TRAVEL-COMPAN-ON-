import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/Layout';
import Splash from './screens/Splash';
import Home from './screens/Home';
import CountryDetail from './screens/CountryDetail';
import CurrencyConverter from './screens/CurrencyConverter';
import About from './screens/About';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Splash />} />
          <Route path="/home" element={<Layout><Home /></Layout>} />
          <Route path="/country/:code" element={<Layout><CountryDetail /></Layout>} />
          <Route path="/converter" element={<Layout><CurrencyConverter /></Layout>} />
          <Route path="/about" element={<Layout><About /></Layout>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;

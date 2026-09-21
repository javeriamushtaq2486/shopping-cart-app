import React, { useState } from 'react';
import ProductList from './ProductList';
import AboutUs from './AboutUs';
import './App.css';

function App() {
  const [showProductList, setShowProductList] = useState(false);

  const handleGetStarted = () => {
    setShowProductList(true);
  };

  return (
    <div className="app-container">
      {!showProductList ? (
        <div className="landing-page">
          <div className="landing-content">
            <h1 className="landing-title">Paradise Nursery</h1>
            <p className="landing-description">
              Where Greenery Meets Serenity. Discover our wide range of indoor plants to bring life and fresh air into your home.
            </p>
            <button className="landing-btn" onClick={handleGetStarted}>
              Get Started
            </button>
            <div style={{ marginTop: '30px' }}>
              <AboutUs />
            </div>
          </div>
        </div>
      ) : (
        <ProductList onHomeClick={() => setShowProductList(false)} />
      )}
    </div>
  );
}

export default App;

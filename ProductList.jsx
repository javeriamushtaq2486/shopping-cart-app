import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';

function ProductList({ onHomeClick }) {
  const [showCart, setShowCart] = useState(false);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  // Dynamically calculate total cart quantity for navbar count
  const totalCartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  // Houseplants grouped into 3 categories with at least 6 unique plants each
  const plantCategories = [
    {
      category: "Air Purifying Plants",
      plants: [
        { name: "Snake Plant", image: "https://images.unsplash.com/photo-1593482892290-f54927ae1bac?w=300", cost: "$15" },
        { name: "Spider Plant", image: "https://images.unsplash.com/photo-1572688484438-313a6e50c333?w=300", cost: "$12" },
        { name: "Peace Lily", image: "https://images.unsplash.com/photo-1593691509543-c55fb32e7355?w=300", cost: "$18" },
        { name: "Boston Fern", image: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=300", cost: "$14" },
        { name: "Rubber Plant", image: "https://images.unsplash.com/photo-1520412099551-62b6bafeb5bb?w=300", cost: "$22" },
        { name: "Aloe Vera", image: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=300", cost: "$10" }
      ]
    },
    {
      category: "Aromatic & Medicinal Plants",
      plants: [
        { name: "Lavender", image: "https://images.unsplash.com/photo-1528183429752-a97d0bf99b5a?w=300", cost: "$20" },
        { name: "Mint", image: "https://images.unsplash.com/photo-1628556270448-4d4e4148e1b1?w=300", cost: "$8" },
        { name: "Rosemary", image: "https://images.unsplash.com/photo-1515586000433-45406d8e6662?w=300", cost: "$11" },
        { name: "Basil", image: "https://images.unsplash.com/photo-1608686207856-001b95cf60ca?w=300", cost: "$9" },
        { name: "Thyme", image: "https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?w=300", cost: "$10" },
        { name: "Eucalyptus", image: "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?w=300", cost: "$25" }
      ]
    },
    {
      category: "Low Maintenance Plants",
      plants: [
        { name: "ZZ Plant", image: "https://images.unsplash.com/photo-1632207691143-643e2a9a9361?w=300", cost: "$25" },
        { name: "Pothos", image: "https://images.unsplash.com/photo-1596724817763-9219f67ea73a?w=300", cost: "$12" },
        { name: "Jade Plant", image: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=300", cost: "$15" },
        { name: "Cast Iron Plant", image: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=300", cost: "$28" },
        { name: "Succulent Mix", image: "https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=300", cost: "$14" },
        { name: "Haworthia", image: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=300", cost: "$10" }
      ]
    }
  ];

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
  };

  const isItemInCart = (plantName) => {
    return cartItems.some((item) => item.name === plantName);
  };

  return (
    <div>
      {/* Shared Navigation Bar */}
      <nav className="navbar" style={{ display: 'flex', justifyContent: 'space-between', padding: '15px 30px', backgroundColor: '#2e7d32', color: 'white' }}>
        <div className="nav-brand" onClick={onHomeClick} style={{ cursor: 'pointer' }}>
          <h2>Paradise Nursery</h2>
        </div>
        <div className="nav-links" style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <span onClick={onHomeClick} style={{ cursor: 'pointer' }}>Home</span>
          <span onClick={() => setShowCart(false)} style={{ cursor: 'pointer' }}>Plants</span>
          <span onClick={() => setShowCart(true)} style={{ cursor: 'pointer', fontWeight: 'bold' }}>
            Cart 🛒 ({totalCartCount})
          </span>
        </div>
      </nav>

      {/* Conditional Rendering between Cart and Product Listing */}
      {showCart ? (
        <CartItem onContinueShopping={() => setShowCart(false)} />
      ) : (
        <div className="product-container" style={{ padding: '20px' }}>
          {plantCategories.map((categoryGroup, index) => (
            <div key={index} className="category-section" style={{ marginBottom: '40px' }}>
              <h2 className="category-title" style={{ color: '#2e7d32', borderBottom: '2px solid #2e7d32', paddingBottom: '8px' }}>
                {categoryGroup.category}
              </h2>
              <div className="product-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '20px', marginTop: '20px' }}>
                {categoryGroup.plants.map((plant, pIndex) => (
                  <div key={pIndex} className="product-card" style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '15px', textAlign: 'center' }}>
                    <img src={plant.image} alt={plant.name} style={{ width: '100%', height: '160px', objectFit: 'cover', borderRadius: '6px' }} />
                    <h3>{plant.name}</h3>
                    <p style={{ fontWeight: 'bold', color: '#555' }}>{plant.cost}</p>
                    <button
                      className="add-to-cart-btn"
                      disabled={isItemInCart(plant.name)}
                      onClick={() => handleAddToCart(plant)}
                      style={{
                        padding: '8px 16px',
                        backgroundColor: isItemInCart(plant.name) ? '#ccc' : '#2e7d32',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: isItemInCart(plant.name) ? 'not-allowed' : 'pointer'
                      }}
                    >
                      {isItemInCart(plant.name) ? "Added to Cart" : "Add to Cart"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductList;

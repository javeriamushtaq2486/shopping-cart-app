import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';

function CartItem({ onContinueShopping }) {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  // Utility helper to convert cost string (e.g., "$15") into a float number (15.00)
  const parseCost = (costString) => {
    return parseFloat(costString.replace('$', ''));
  };

  // Calculate total cart amount across all items
  const calculateTotalAmount = () => {
    return cartItems
      .reduce((total, item) => total + parseCost(item.cost) * item.quantity, 0)
      .toFixed(2);
  };

  // Calculate subtotal for a specific plant item
  const calculateTotalCost = (item) => {
    return (parseCost(item.cost) * item.quantity).toFixed(2);
  };

  // Increment item quantity
  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  // Decrement item quantity or remove if quantity reaches zero
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem({ name: item.name }));
    }
  };

  // Delete item completely from cart
  const handleRemove = (item) => {
    dispatch(removeItem({ name: item.name }));
  };

  // Display "Coming Soon" prompt on checkout click
  const handleCheckout = () => {
    alert('Checkout functionality coming soon!');
  };

  return (
    <div className="cart-container" style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center', color: '#2e7d32' }}>Shopping Cart</h2>
      <h3 style={{ textAlign: 'center' }}>Total Cart Amount: ${calculateTotalAmount()}</h3>

      {cartItems.length === 0 ? (
        <p style={{ textAlign: 'center', marginTop: '30px' }}>Your cart is empty.</p>
      ) : (
        <div className="cart-items">
          {cartItems.map((item, index) => (
            <div
              key={index}
              className="cart-item-card"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '20px',
                margin: '15px 0',
                borderBottom: '1px solid #ccc',
                paddingBottom: '15px'
              }}
            >
              <img
                src={item.image}
                alt={item.name}
                style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '6px' }}
              />
              <div style={{ flexGrow: 1 }}>
                <h4 style={{ margin: '0 0 5px 0' }}>{item.name}</h4>
                <p style={{ margin: '3px 0' }}>Unit Price: {item.cost}</p>
                <p style={{ margin: '3px 0', fontWeight: 'bold' }}>Subtotal: ${calculateTotalCost(item)}</p>
                
                {/* Quantity Controls */}
                <div className="quantity-controls" style={{ display: 'flex', alignItems: 'center', margin: '8px 0' }}>
                  <button
                    onClick={() => handleDecrement(item)}
                    style={{ padding: '4px 10px', cursor: 'pointer', fontWeight: 'bold' }}
                  >
                    -
                  </button>
                  <span style={{ margin: '0 12px', fontWeight: 'bold' }}>{item.quantity}</span>
                  <button
                    onClick={() => handleIncrement(item)}
                    style={{ padding: '4px 10px', cursor: 'pointer', fontWeight: 'bold' }}
                  >
                    +
                  </button>
                </div>

                {/* Delete Button */}
                <button
                  onClick={() => handleRemove(item)}
                  style={{
                    backgroundColor: '#d32f2f',
                    color: 'white',
                    border: 'none',
                    padding: '6px 12px',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Action Buttons */}
      <div style={{ marginTop: '30px', display: 'flex', justifyContent: 'center', gap: '20px' }}>
        <button
          onClick={onContinueShopping}
          style={{
            padding: '10px 20px',
            backgroundColor: '#1976d2',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Continue Shopping
        </button>
        <button
          onClick={handleCheckout}
          style={{
            padding: '10px 20px',
            backgroundColor: '#2e7d32',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Checkout
        </button>
      </div>
    </div>
  );
}

export default CartItem;

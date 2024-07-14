import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (productTitle) => {
    setCart(cart.filter(product => product.article !== productTitle));
  };

  const updateCartItemUnits = (productTitle, units) => {
    setCart(cart.map(product =>
      product.article === productTitle ? { ...product, units } : product
    ));
  };

  const clearCart = () => {
    setCart([]);
  };


  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateCartItemUnits,clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
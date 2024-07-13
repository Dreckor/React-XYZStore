import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { CartContext } from '../context/CartContext';

const CartWrapper = styled.div`
  background-color: #F0F0F0;
  padding: 20px;
  border-radius: 5px;
  width: 300px;
`;

const CartItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const CartItemInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const CheckoutButton = styled.button`
  background-color: #5D6867;
  color: white;
  padding: 10px;
  border: none;
  cursor: pointer;
  margin-top: 10px;
  border-radius: 5px;

  &:hover {
    background-color: #4B5756;
  }
`;

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 5px;
  text-align: center;
`;

const Cart = () => {
  const { cart, removeFromCart, clearCart  } = useContext(CartContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCheckout = () => {
    console.log('Artículos en el carrito:', cart);
    setIsModalOpen(true);
    clearCart();
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const getTotalPrice = () => {
    let totalPrice = 0;
    cart.forEach(product => {
      totalPrice += product.value * product.units;
    });
    return totalPrice;
  };

  return (
    <CartWrapper>
      <h2>Carrito de Compras</h2>
      {cart.map((product, index) => (
        <CartItem key={index}>
          <CartItemInfo>
            <span style={{ fontWeight: 'bold' }}>{product.article}</span>
            <span>{product.description}</span>
            <span style={{ color: '#5D6867' }}>{product.price}</span>
            <span>Unidades: {product.units}</span>
          </CartItemInfo>
          <button onClick={() => removeFromCart(product.article)} className="bg-red-500 text-white py-1 px-3 rounded">Eliminar</button>
        </CartItem>
      ))}
      {cart.length === 0 && <p>El carrito está vacío.</p>}
      {cart.length > 0 && (
        <>
        <div style={{ marginTop: '10px' }}>
            <strong>Total: ${getTotalPrice()}</strong>
          </div>
        <CheckoutButton onClick={handleCheckout}>Realizar compra</CheckoutButton>
        <button onClick={() => clearCart()} className="bg-red-500 text-white py-1 px-3 rounded">Cancelar compra</button>
        </>
        
      )}
      {isModalOpen && (
        <ModalWrapper>
          <ModalContent>
            <h3>¡Gracias por su compra!</h3>
            <button onClick={closeModal} className="bg-blue-500 text-white py-2 px-4 rounded">Cerrar</button>
          </ModalContent>
        </ModalWrapper>
      )}
    </CartWrapper>
  );
};

export default Cart;

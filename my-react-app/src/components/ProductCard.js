import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';


const ProductCardWrapper = styled.div`
  background-color: #f3f3f3;
  border-radius: 10px;
  width: 80%;
  height: 400px; 
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  text-align: center;
  padding: 20px;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
`;


const ProductImage = styled.img`
    width: 100%;
    max-height: 50%;
    border-bottom: 1px solid #eaeaea;
`;

const ProductInfo = styled.div`
  margin-top: auto;
  padding: 15px;
  
`;

const ProductDescription = styled.p`
  color: black;
`;

const CartButton = styled.button`
  background-color: #5D6867;
  color: white;
  padding: 10px;
  border: none;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    background-color: #4B5756;
  }
`;

const UnitsDisplay = styled.span`
  font-weight: bold;
  color: #000;
  font-size: 1.2em;
`;

const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
`;

const ProductCard = ({ image, value, article, description }) => {
  const { addToCart,updateCartItemUnits , removeFromCart } = useContext(CartContext);
  const { user } = useAuth();
  const [units, setUnits] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart({ value, article, description, units });
    setAdded(true);
  };

  const handleIncreaseUnits = () => {
    const newUnits = units + 1;
    setUnits(newUnits);
    updateCartItemUnits(article, newUnits);
  };

  const handleDecreaseUnits = () => {
    if (units > 1) {
      setUnits(prevUnits => prevUnits - 1);
    } else {
      removeFromCart(article);
      setAdded(false);
    }
  };
  return (
    <ProductCardWrapper>
      <ProductImage src={image} alt={article} />
      <ProductInfo>
        <div className="product-price">
          <p style={{ color: '#5D6867' }}>{value}</p>
          <p style={{ fontWeight: 'bold', color: 'black' }}>{article}</p>
        </div>
        <ProductDescription>{description}</ProductDescription>
        {user && (
          <>
            {added ? (
              <ButtonGroup>
                <CartButton onClick={handleDecreaseUnits}>-</CartButton>
                <UnitsDisplay>{units}</UnitsDisplay>
                <CartButton onClick={handleIncreaseUnits}>+</CartButton>
              </ButtonGroup>
            ) : (
              <CartButton onClick={handleAddToCart}>Agregar al carrito</CartButton>
            )}
          </>
        )}
      </ProductInfo>
    </ProductCardWrapper>
  );
};

export default ProductCard;

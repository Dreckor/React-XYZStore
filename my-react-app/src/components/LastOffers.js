import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import productsData from './products.json'; 
import ProductCard from './ProductCard';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const LastOffersWrapper = styled.section`
  background-color: black;
  color: white;
  padding: 20px 0;
  text-align: center;
`;

const SectionHeader = styled.div`
  font-family: 'Barlow Semi Condensed', sans-serif;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
`;




const LastOffers = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch data from the API endpoint
    fetch('http://18.216.106.114/api/products/available')
      .then(response => response.json())
      .then(data => {
        setProducts(data); // Update state with fetched data
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, []); 


  const settings = {
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <LastOffersWrapper className="last-offers" id="last-offerts">
      <SectionHeader className="section-header">
        <h1>Últimas Ofertas</h1>
      </SectionHeader>
      <Slider {...settings}>
        {products.map((product, index) => (
          <ProductCard
            key={index}
            image={product.image}
            value={product.value}
            article={product.name}
            description={product.description}
          />
        ))}
      </Slider>
    </LastOffersWrapper>
  );
};

export default LastOffers;

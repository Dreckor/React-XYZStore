import React from 'react';
import styled from 'styled-components';

const Section = styled.section`
  display: flex;
  height: 100vh;
  @media (max-width: 768px) {
    flex-direction: column;
    height: auto;
  }
`;

const TextHalf = styled.div`
  flex: 1;
  background-color: black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 40px;
  color: white;
  text-align: left;
  @media (max-width: 768px) {
    padding: 20px;
    text-align: center;
  }
`;

const ImageHalf = styled.div`
  flex: 1;
  background-color: black;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
  @media (max-width: 768px) {
    max-height: 50vh;
  }
`;

const Title = styled.h2`
  color: #BFC4C6;
  font-size: 2rem;
  margin-bottom: 20px;
`;

const Description = styled.p`
  color: white;
  font-size: 1.2rem;
  line-height: 1.5;
  margin-bottom: 20px;
`;

const Button = styled.button`
  padding: 15px 30px;
  background-color: black;
  border: 2px solid #A7ADAF;
  color: #A7ADAF; 
  cursor: pointer;
  width: auto;
  transition: background-color 0.3s ease, color 0.3s ease;
  border-radius: 5px;

  &:hover {
    background-color: #A7ADAF; 
    color: black; 
  }
`;

const ImageTextSection = ({ imageSrc, title, description, reverse }) => (
  <Section style={{ flexDirection: reverse ? 'row-reverse' : 'row' }}>
    <ImageHalf>
      <Image src={imageSrc} alt={title} />
    </ImageHalf>
    <TextHalf>
      <Title>{title}</Title>
      <Description>{description}</Description>
      <Button>VER AHORA</Button>
    </TextHalf>
  </Section>
);

export default ImageTextSection;

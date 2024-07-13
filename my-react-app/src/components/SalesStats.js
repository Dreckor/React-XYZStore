import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import salesData from './ventas.json'; 

const StatsWrapper = styled.div`
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  width: 80%;
  margin: 20px auto;
`;

const StatCard = styled.div`
  background-color: white;
  padding: 15px;
  margin-bottom: 15px;
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
`;

const StatCardTitle = styled.h3`
  font-size: 1.2em;
  margin-bottom: 10px;
`;

const StatCardContent = styled.div`
  font-size: 1em;
`;

const SalesStats = () => {
  const [salesData, setSalesData] = useState(null);

  useEffect(() => {
      
    setSalesData({
        "sales": [
            {
                "id": 1,
                "article": "Computadora portátil",
                "description": "Equipo Lenovo con teclado retroiluminado y 1TB",
                "value": "2700000",
                "stock": 14,
                "image": "https://i.imgur.com/ItT5rbJ.jpeg",
                "clientID": 1
            },
            {
                "id": 2,
                "article": "Computadora de escritorio",
                "description": "Equipo de escritorio con gabinete personalizado y componentes a la medida",
                "value": "1700000",
                "stock": 18,
                "image": "https://i.imgur.com/XdQW2cc.jpeg",
                "clientID": 1
            },
            {
                "id": 3,
                "article": "Computadora portátil",
                "description": "Equipo Lenovo con teclado retroiluminado y 1TB",
                "value": "2700000",
                "stock": 12,
                "image": "https://i.imgur.com/ItT5rbJ.jpeg",
                "clientID": 3
            },
            {
                "id": 4,
                "article": "Computadora de escritorio",
                "description": "Equipo de escritorio con gabinete personalizado y componentes a la medida",
                "value": "1700000",
                "stock": 10,
                "image": "https://i.imgur.com/XdQW2cc.jpeg",
                "clientID": 3
            }
        ],
        "balance": 18300000
    }
    );
  }, [])

  if (!salesData) {
    return <p>Cargando datos...</p>;
  }

  const totalSales = salesData.sales.length;
  const totalBalance = salesData.balance;

  return (
    <StatsWrapper>
      <h2>Estadísticas de Ventas</h2>
      <StatCard>
        <StatCardTitle>Total de Ventas</StatCardTitle>
        <StatCardContent>{totalSales}</StatCardContent>
      </StatCard>
      <StatCard>
        <StatCardTitle>Balance Total</StatCardTitle>
        <StatCardContent>${totalBalance}</StatCardContent>
      </StatCard>
      <h3>Detalles de Ventas</h3>
      {salesData.sales.map((sale, index) => (
        <StatCard key={index}>
          <StatCardTitle>{sale.article}</StatCardTitle>
          <StatCardContent>
            <p>Descripción: {sale.description}</p>
            <p>Valor: ${sale.value}</p>
            <p>Stock: {sale.stock}</p>
            <p>Cliente ID: {sale.clientID}</p>
          </StatCardContent>
        </StatCard>
      ))}
    </StatsWrapper>
  );
};

export default SalesStats;

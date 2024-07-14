import React, { useEffect, useState } from 'react';
import styled from 'styled-components';


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
    fetch('http://18.216.106.114/api/sales')
      .then(response => response.json())
      .then(data => {
        setSalesData(data);
      })
      .catch(error => {
        console.error('Error fetching sales data:', error);
      });
  }, []);

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
  <StatCard key={sale._id}>
    <StatCardTitle>{sale.productId ? sale.productId.name : 'Producto Eliminado'}</StatCardTitle>
    <StatCardContent>
      {sale.productId && (
        <>
          <p>Descripción: {sale.productId.description}</p>
          <p>Valor: ${sale.productId.value.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
          <p>Stock: {sale.productId.stock}</p>
        </>
      )}
      <p>Cliente ID: {sale.clientID}</p>
      <p>Cantidad: {sale.quantity}</p>
      <p>Precio Total: ${sale.totalPrice.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
      <p>Fecha: {new Date(sale.timestamp).toLocaleString()}</p>
    </StatCardContent>
  </StatCard>
      ))}
    </StatsWrapper>
  );
};

export default SalesStats;

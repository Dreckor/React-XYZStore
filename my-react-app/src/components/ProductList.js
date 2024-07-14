import React, { useEffect, useState } from 'react';
import RowProductCard from './RowProductCard'; 


const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
      
      fetch('http://18.216.106.114/api/products')
        .then(response => response.json())
        .then(data => {
          setProducts(data);
        })
        .catch(error => {
          console.error('Error fetching products:', error);
        });
    }, []); 
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Listado de Productos</h1>
      <div className="grid grid-cols-1">
        {products.map((product, index) => (
          <RowProductCard
            imageUrl={product.image}
            key={index}
            units={product.stock}
            value={product.value}
            title={product.name}
            description={product.description}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductList;

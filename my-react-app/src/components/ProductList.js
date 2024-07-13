import React, { useEffect, useState } from 'react';
import RowProductCard from './RowProductCard'; 
import productsData from './products.json'; 

const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
      
      setProducts(productsData);
    }, [])
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
            title={product.article}
            description={product.description}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductList;

import React from 'react';
import styled from 'styled-components';

const RowProductCard = ({ imageUrl, units, value, title, description }) => {
  return (
      <div className="flex flex-col md:flex-row bg-white shadow-md rounded-lg overflow-hidden">
          {imageUrl && (
              <div className="md:w-1/4">
                  <img className="w-full h-full object-cover" src={imageUrl} alt={title} />
              </div>
          )}
          <div className="flex-1 p-4 border-4">
              <h2 className="text-xl font-bold mb-2">{title}</h2>
              <p className="text-gray-700 mb-4">{description}</p>
              <div className="flex justify-between items-center">
                  <span className="text-gray-900 font-bold">Unidades: {units}</span>
                  <span className="text-gray-900 font-bold">Precio: ${value}</span>
              </div>
          </div>
      </div>
  );
};

export default RowProductCard;

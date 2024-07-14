import React, { useState } from 'react';
import Modal from './Modal';
import styled from 'styled-components';

const FormWrapper = styled.div`
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 10px;
  margin-top: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  h2 {
    font-size: 1.5em;
    margin-bottom: 15px;
  }

  form {
    display: flex;
    flex-direction: column;

    label {
      margin-bottom: 10px;
      font-weight: bold;
    }

    input,
    textarea {
      padding: 8px;
      font-size: 14px;
      border: 1px solid #ccc;
      border-radius: 5px;
      margin-bottom: 10px;
      width: 100%;
    }

    button {
      background-color: #5D6867;
      color: white;
      padding: 10px 20px;
      border: none;
      cursor: pointer;
      border-radius: 5px;
      margin-top: 10px;

      &:hover {
        background-color: #4B5756;
      }

      &:not(:last-child) {
        margin-right: 10px;
      }
    }
  }
`;

const RowProductCard = ({ productId,imageUrl, units, value, title, description, onUpdate }) => {
  const [editedProduct, setEditedProduct] = useState({
    name: title,
    description: description,
    stock: units,
    value: value
  });
  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct({ ...editedProduct, [name]: value });
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };
  const handleDeleteClick = async () => {
    try {
      console.log(productId)
      const response = await fetch(`http://18.216.106.114/api/products/${productId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      
      onUpdate([{"_id":productId}]);
      
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };
  const handleSave = async () => {
    try {
      console.log(productId)
      const response = await fetch(`http://18.216.106.114/api/products/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(editedProduct)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const updatedProduct = await response.json();
      onUpdate(updatedProduct);
      console.log(updatedProduct)
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const handleClose = () => {
    setIsEditing(false);
  };

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
        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-900 font-bold">Unidades: {units}</span>
          <span className="text-gray-900 font-bold">Precio: ${value}</span>
        </div>
        <button className="bg-blue-500 text-white py-2 px-4 rounded p-10" onClick={handleEditClick}>Editar</button>
        <button className="bg-red-500 text-white py-2 px-4 rounded p-10" onClick={handleDeleteClick}>Eliminar</button>
      </div>
      {isEditing && (
        <Modal onClose={handleClose}>
          <FormWrapper>
      <h2>Editar Producto</h2>
      <form>
        <label>
          Título:
          <input type="text" name="name" value={editedProduct.name} onChange={handleInputChange} />
        </label>
        <label>
          Descripción:
          <textarea name="description" value={editedProduct.description} onChange={handleInputChange} />
        </label>
        <label>
          Unidades:
          <input type="number" name="stock" value={editedProduct.stock} onChange={handleInputChange} />
        </label>
        <label>
          Precio:
          <input type="number" name="value" value={editedProduct.value} onChange={handleInputChange} />
        </label>
        <div>
          <button type="button" onClick={handleSave}>Guardar Cambios</button>
          <button type="button" onClick={handleClose}>Cancelar</button>
        </div>
      </form>
    </FormWrapper>
        </Modal>
      )}
    </div>
  );
};

export default RowProductCard;

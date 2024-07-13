import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Modal from 'react-modal';
import productsData from './products.json'; 
import { Link } from 'react-router-dom';

Modal.setAppElement('#root');

export default function FormularioProductos() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState(null);

  const onSubmit = (data) => {
    setNewProduct(data);
    setIsModalOpen(true);
  };

  const handleConfirm = () => {
   
    const updatedProducts = [...productsData, newProduct];
    console.log('Actualizado products.json:', updatedProducts);

    
    setIsModalOpen(false);
    setIsSuccessModalOpen(true);
  };

  return (
    <div className="container mx-auto p-4">
      <h1>Nuevo producto</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Nombre del articulo"
            {...register('articulo', { required: true })}
            className="input w-full p-2 border rounded"
          />
          {errors.articulo && <span className="text-red-500">Este campo es obligatorio</span>}
        </div>
        
        <div className="mb-4">
          <input
            type="number"
            placeholder="Valor"
            {...register('valor', { required: true })}
            className="input w-full p-2 border rounded"
          />
          {errors.valor && <span className="text-red-500">Este campo es obligatorio</span>}
        </div>

        <div className="mb-4">
          <input
            type="number"
            placeholder="Unidades"
            {...register('unidades', { required: true })}
            className="input w-full p-2 border rounded"
          />
          {errors.valor && <span className="text-red-500">Este campo es obligatorio</span>}
        </div>

        <div className="mb-4">
          <input
            type="text"
            placeholder="URL de la imagen"
            {...register('imagen', { required: true })}
            className="input w-full p-2 border rounded"
          />
          {errors.imagen && <span className="text-red-500">Este campo es obligatorio</span>}
        </div>
        
        <div className="mb-4">
          <textarea
            placeholder="Descripción"
            {...register('descripcion', { required: true })}
            className="textarea w-full p-2 border rounded"
          />
          {errors.descripcion && <span className="text-red-500">Este campo es obligatorio</span>}
        </div>
        
        <button type="submit" className="btn-primary bg-blue-500 text-white py-2 px-4 rounded">Añadir</button>
      </form>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Confirmación de Producto"
        className="modal"
        overlayClassName="modal-overlay"
      >
        <h2>Confirmar nuevo producto</h2>
        <p>¿Estás seguro de que quieres añadir el siguiente producto?</p>
        {newProduct && (
          <div>
            <p><strong>Artículo:</strong> {newProduct.articulo}</p>
            <p><strong>Valor:</strong> {newProduct.valor}</p>
            <p><strong>Unidades:</strong> {newProduct.quantity}</p>
            <p><strong>Imagen:</strong> {newProduct.imagen}</p>
            <p><strong>Descripción:</strong> {newProduct.descripcion}</p>
          </div>
        )}
        <button onClick={handleConfirm} className="btn-primary bg-blue-500 text-white py-2 px-4 rounded">Confirmar</button>
        <button onClick={() => setIsModalOpen(false)} className="btn-secondary bg-gray-500 text-white py-2 px-4 rounded">Cancelar</button>
      </Modal>

      <Modal
        isOpen={isSuccessModalOpen}
        onRequestClose={() => setIsSuccessModalOpen(false)}
        contentLabel="Producto Añadido"
        className="modal"
        overlayClassName="modal-overlay"
      >
        <h2>Producto añadido correctamente</h2>
        <Link to="/articles">
          <button className="btn-primary bg-blue-500 text-white py-2 px-4 rounded">Ver artículos</button>
        </Link>
        <button onClick={() => setIsSuccessModalOpen(false)} className="btn-secondary bg-gray-500 text-white py-2 px-4 rounded">Cerrar</button>
      </Modal>
    </div>
  );
}
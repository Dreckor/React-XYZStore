import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import { CartProvider } from './context/CartContext';
import Login from './pages/login';
import Nav from './components/Nav';
import FormularioProductos from './components/formularioProductos';
import LastOffers from './components/LastOffers';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import SalesStats from './components/SalesStats';
import VideoSection from './components/VideoSection';
import ImageTextSection from './components/ImageTextSection';
import styled from 'styled-components';

const HomeWrapper = styled.div`
 
`;
const Home = () => (
  <div>
    <VideoSection/>
    <LastOffers />
    <HomeWrapper id="categorias">
    <ImageTextSection
      id="categorias"
      imageSrc="https://i.imgur.com/98zJ2qF.png"
      title="PORTÁTILES"
      description="Aquí encontrarás la combinación perfecta de potencia y portabilidad. Desde ultradelgados diseñados para llevar a todas partes hasta poderosas estaciones de trabajo móviles, tenemos el portátil que se adapta a tu estilo de vida."
    />
    <ImageTextSection
      imageSrc="https://i.imgur.com/RQqSMdZ.png"
      title="EQUIPOS DE MESA"
      description="Potencia tu vida con equipos de escritorio de alto rendimiento. Descubre el poder que necesitas en cada tarea."
      reverse
    />
    <ImageTextSection
      imageSrc="https://i.imgur.com/Pz6bvfQ.png"
      title="PERIFÉRICOS"
      description="Completa tu experiencia informática con periféricos de calidad superior. Teclado, ratón, monitor y más, todo lo que necesitas para un rendimiento óptimo. ¡Mejora tu setup ahora!"
    />
    </HomeWrapper>
   

  </div>
);

const AdminDashboard = () => {
  return (
    <div>
      <h1>Dashboard del Administrador</h1>
      <SalesStats />
    </div>
  );
};


const AppContent = () => {


  return (
    <CartProvider>
    <div className="min-h-screen bg-gray-100">
      {
        Nav()
    }
    
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Navigate to="/" />} />
        
        <Route element={<PrivateRoute roles={['admin']} />}>
          
          <Route path="/article/add" element={<FormularioProductos />} />
          <Route path="/articles" element={<ProductList />} />
          <Route path="/dashboard" element={<AdminDashboard />} />
        </Route>
        <Route element={<PrivateRoute roles={['user', 'admin']} />}>
          
          <Route path="/cart" element={<Cart />} />
        </Route>
      </Routes>
    
      
    </div>
    </CartProvider>
  );
};

const App = () => (
  <AuthProvider>
    <Router>
      <AppContent />
    </Router>
  </AuthProvider>
);

export default App;
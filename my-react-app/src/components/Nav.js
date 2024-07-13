import React, { useContext } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';


export default function Nav() {
    const { user, logout } = useAuth();
    return (
          
        <header className="sticky top-0 z-50 bg-white shadow-md" class="sticky-header">
            <div className="container mx-auto flex items-center justify-between p-4">
                <div class="logo">
                    <img src="https://i.imgur.com/CDKHabU.png" alt="Logo" className="h-8 w-auto" />
                </div>
                <nav className="nav-links flex space-x-4" class="nav-links">
                    <ul className="flex space-x-4">
                        <li className="active">
                            <Link to="/" className="text-blue-600 hover:text-blue-800">Inicio</Link>
                        </li>
                        <li>
                            <a href="#last-offerts" className="text-gray-600 hover:text-gray-800">Ofertas</a>
                        </li>
                        <li>
                            <a href="#categorias" className="text-gray-600 hover:text-gray-800">Categorías</a>
                        </li>
                    </ul>
                </nav>
                <div className="flex items-center space-x-4">
                    {user && (
                        <>
                            <span className="text-white">Bienvenido, {user.username}</span>
                            {user.role === 'admin' && (
                                <ul>
                                    <Link to="/articles">
                                        <button className="text-gray-200 hover:text-white">Ver inventario</button>
                                    </Link>
                                    <Link to="/dashboard">
                                        <button className="text-gray-200 hover:text-white p-5">Ver dashboard</button>
                                    </Link>
                                    <Link to="/article/add">
                                        <button className="bg-blue-500 text-white py-1 px-3 rounded">Añadir artículos</button>
                                    </Link>
                                   
                                </ul>
                               
                            )}
                            <button onClick={logout} className="bg-red-500 text-white py-1 px-3 rounded">Cerrar Sesión</button>
                        </>
                    )}
                    {!user && (
                        <Link to="/login" className="text-gray-200 hover:text-white">Iniciar Sesión</Link>
                    )}
                    <Link to="/cart">
                        <div className="cart-icon">
                        <i className={`fas fa-shopping-cart ${[1].length > 0 ? 'cart-icon-full' : ''}`}></i>
                        </div>
                     </Link>
                    
                </div>
            </div>
        </header>
    )
}
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Loyalty from './pages/Loyalty';
import Login from './pages/Login';
import Users from './pages/Users';
import Products from './pages/Products';

import data from './data/data.json';

const ProtectedAdminRoute = ({ user, children }) => {
  if (!user || !user.estAdmin) {
    return <Navigate to="/products" replace />;
  }
  return children;
};

const App = () => {
  const [user, setUser] = useState(null);
  
  // --- GESTION DU PANIER ---
  const [cart, setCart] = useState([]);

  // Ajouter au panier
  const addToCart = (product) => {
    setCart(prev => {
      // Vérifie si le produit est déjà dedans
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        // Si oui, on augmente la quantité (tant qu'il y a du stock)
        if (existingItem.qty < product.stock) {
          return prev.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item);
        }
        return prev; // Stock max atteint dans le panier
      }
      // Sinon, on l'ajoute avec quantité 1
      return [...prev, { ...product, qty: 1 }];
    });
  };

  // Retirer du panier
  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  // Vider le panier (après achat)
  const clearCart = () => {
    setCart([]);
  };

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
    setCart([]); // On vide le panier à la déconnexion
  };

  if (!user) {
    return <Login users={data.utilisateurs} onLogin={handleLogin} />;
  }

  const userFidelityData = {
    ...data.carteFidelite,
    nombreTampons: user.points || 0
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <Layout 
            isAdmin={user.estAdmin} 
            user={user} 
            onLogout={handleLogout}
            cart={cart}                // On passe le panier au Layout
            removeFromCart={removeFromCart} // Et la fonction pour supprimer
            clearCart={clearCart}      // Et la fonction pour vider
          />
        }>
          
          <Route index element={
            <ProtectedAdminRoute user={user}>
              <Dashboard stats={data} />
            </ProtectedAdminRoute>
          } />
          
          <Route path="products" element={
            <Products 
              products={data.produits} 
              user={user} 
              addToCart={addToCart} // On passe la fonction d'ajout à la page produits
            />
          } />

          <Route path="fidelity" element={<Loyalty data={userFidelityData} />} />
          
          <Route path="users" element={
            <ProtectedAdminRoute user={user}>
              <Users users={data.utilisateurs} />
            </ProtectedAdminRoute>
          } />

        </Route>
      </Routes>
    </Router>
  );
};

export default App;
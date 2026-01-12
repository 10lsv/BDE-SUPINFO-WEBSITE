import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, ShoppingCart, Award, LogOut, Package, X, Trash2, ExternalLink } from 'lucide-react';
import logo from '../assets/logo.png';

const Layout = ({ isAdmin, onLogout, cart, removeFromCart, clearCart }) => {
  const location = useLocation();
  const [isCartOpen, setIsCartOpen] = useState(false); // État pour ouvrir/fermer le panier

  const isActive = (path) => location.pathname === path;
  
  // Calcul du total
  const totalAmount = cart.reduce((acc, item) => acc + (item.prix * item.qty), 0);
  const totalItems = cart.reduce((acc, item) => acc + item.qty, 0);

  // Fonction finale d'achat
  const handleCheckout = () => {
    window.open('https://www.helloasso.com/associations/bde-supinfo-caen/boutiques/vente-de-snacks-2026', '_blank');
    setIsCartOpen(false);
    clearCart(); // Optionnel : vider le panier après clic sur le lien
    alert("Redirection vers HelloAsso pour le paiement...");
  };
  
  const linkClass = (path) => `
    flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium mb-1
    ${isActive(path) 
      ? 'bg-supinfo-orange text-white shadow-lg shadow-orange-900/20' 
      : 'text-indigo-200 hover:bg-white/10 hover:text-white'}
  `;

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-supinfo-purple font-sans relative">
      
      {/* SIDEBAR */}
      <aside className="w-full md:w-64 bg-supinfo-purple-dark border-r border-white/5 md:fixed md:h-full z-20 flex-shrink-0 text-white shadow-2xl flex flex-col">
        <div className="p-6 border-b border-white/5 flex flex-col items-center">
          <img src={logo} alt="SUPINFO" className="h-20 w-auto mb-4 object-contain" />
          <p className="text-xs font-bold text-supinfo-orange tracking-widest uppercase">
            {isAdmin ? "Espace Admin" : "Espace Étudiant"}
          </p>
        </div>

        <nav className="p-4 flex-1 overflow-y-auto">
          {isAdmin && (
            <Link to="/" className={linkClass('/')}>
              <LayoutDashboard size={20} />
              <span>Tableau de bord</span>
            </Link>
          )}

          <Link to="/products" className={linkClass('/products')}>
            <Package size={20} />
            <span>{isAdmin ? "Gestion Produits" : "Nos Produits"}</span>
          </Link>

          <Link to="/fidelity" className={linkClass('/fidelity')}>
            <Award size={20} />
            <span>Ma Fidélité</span>
          </Link>

          {/* BOUTON PANIER (Visible pour tout le monde, surtout les étudiants) */}
          <button 
            onClick={() => setIsCartOpen(true)}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium mb-1 w-full text-left
              ${isCartOpen ? 'bg-white/10 text-white' : 'text-indigo-200 hover:bg-white/10 hover:text-white'}
            `}
          >
            <div className="relative">
              <ShoppingCart size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-supinfo-orange text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </div>
            <span>Mon Panier</span>
          </button>

          {isAdmin && (
            <Link to="/users" className={linkClass('/users')}>
              <Users size={20} />
              <span>Utilisateurs</span>
            </Link>
          )}
        </nav>

        <div className="p-4 border-t border-white/5">
          <button 
            onClick={onLogout}
            className="flex items-center gap-3 px-4 py-3 w-full text-red-300 hover:bg-red-900/20 hover:text-red-200 rounded-xl transition-colors cursor-pointer"
          >
            <LogOut size={20} />
            <span className="font-medium">Déconnexion</span>
          </button>
        </div>
      </aside>

      {/* ZONE PRINCIPALE */}
      <main className="flex-1 md:ml-64 p-8 w-full">
        <div className="w-full h-full">
          <Outlet />
        </div>
      </main>

      {/* --- MODAL PANIER --- */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-end md:justify-center bg-black/60 backdrop-blur-sm p-0 md:p-4 animate-in fade-in duration-200">
          
          {/* Contenu du panier (Slide-over sur mobile, Modal sur PC) */}
          <div className="bg-[#1A0B36] w-full md:w-[450px] h-full md:h-auto md:max-h-[85vh] md:rounded-2xl shadow-2xl flex flex-col border-l md:border border-white/20">
            
            {/* Header Panier */}
            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/5">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <ShoppingCart className="text-supinfo-orange" /> Mon Panier
              </h2>
              <button onClick={() => setIsCartOpen(false)} className="text-indigo-300 hover:text-white">
                <X size={24} />
              </button>
            </div>

            {/* Liste des articles */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cart.length === 0 ? (
                <div className="text-center text-indigo-300 py-10 flex flex-col items-center">
                  <ShoppingCart size={48} className="mb-4 opacity-20" />
                  <p>Votre panier est vide.</p>
                  <button 
                    onClick={() => setIsCartOpen(false)}
                    className="mt-4 text-supinfo-orange hover:underline"
                  >
                    Retourner aux produits
                  </button>
                </div>
              ) : (
                cart.map(item => (
                  <div key={item.id} className="flex justify-between items-center bg-white/5 p-3 rounded-xl border border-white/5">
                    <div className="flex items-center gap-3">
                      <div className="bg-white/10 w-10 h-10 rounded-lg flex items-center justify-center text-xs font-bold text-indigo-200">
                        x{item.qty}
                      </div>
                      <div>
                        <p className="font-bold text-white text-sm">{item.nom}</p>
                        <p className="text-xs text-indigo-300">{(item.prix * item.qty).toFixed(2)} €</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-400 hover:text-red-200 p-2 hover:bg-red-500/10 rounded-full transition"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Footer Panier (Total + Bouton) */}
            {cart.length > 0 && (
              <div className="p-6 bg-white/5 border-t border-white/10">
                <div className="flex justify-between items-center mb-6 text-white">
                  <span className="text-indigo-200">Total à payer</span>
                  <span className="text-2xl font-bold text-supinfo-orange">{totalAmount.toFixed(2)} €</span>
                </div>
                
                <button 
                  onClick={handleCheckout}
                  className="w-full bg-supinfo-orange hover:bg-orange-600 text-white py-4 rounded-xl font-bold shadow-lg flex items-center justify-center gap-2 transition-transform hover:scale-[1.02]"
                >
                  <span>Payer sur HelloAsso</span>
                  <ExternalLink size={18} />
                </button>
                <p className="text-center text-[10px] text-indigo-400 mt-3">
                  Vous serez redirigé vers le site sécurisé HelloAsso.
                </p>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
};

export default Layout;
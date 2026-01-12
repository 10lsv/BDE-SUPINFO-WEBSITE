import React, { useState, useEffect } from 'react';
import { Search, Package, Tag, ShoppingCart, Edit, Plus, Trash2, X, Save, Box, Check } from 'lucide-react';

// On reçoit maintenant "addToCart"
const Products = ({ products, user, addToCart }) => {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  
  // États pour Modal Admin
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

  // Initialisation
  useEffect(() => {
    const productsWithStock = products.map(p => ({
      ...p,
      stock: p.stock !== undefined ? p.stock : (p.actif ? Math.floor(Math.random() * 45) + 5 : 0)
    }));
    setItems(productsWithStock);
  }, [products]);

  const filteredProducts = items.filter(p => 
    p.nom.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // --- NOUVELLE FONCTION D'ACHAT ---
  const handleAddToCart = (produit) => {
    addToCart(produit);
    // Petit effet visuel ou alerte simple
    // alert(`${produit.nom} ajouté au panier !`);
  };

  // --- ACTIONS ADMIN (Inchangées) ---
  const handleDelete = (id) => {
    if (window.confirm("Supprimer ce produit ?")) setItems(items.filter(item => item.id !== id));
  };

  const openModal = (product = null) => {
    setCurrentProduct(product ? { ...product } : { id: null, nom: '', prix: 0, stock: 10, actif: true });
    setIsModalOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    const productToSave = { ...currentProduct, actif: currentProduct.stock > 0 };
    if (productToSave.id) {
      setItems(items.map(item => item.id === productToSave.id ? productToSave : item));
    } else {
      const newProduct = { ...productToSave, id: Date.now() };
      setItems([newProduct, ...items]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="text-white h-full flex flex-col relative">
      
      {/* En-tête */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Package className="text-supinfo-orange" /> 
            {user.estAdmin ? "Gestion des Produits" : "Nos Produits"}
          </h2>
          <p className="text-indigo-200 text-sm">{items.length} articles disponibles</p>
        </div>
        <div className="flex gap-4 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-300" size={18} />
            <input 
              type="text" 
              placeholder="Rechercher..." 
              className="w-full bg-white/10 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-supinfo-orange transition-all placeholder-indigo-300/50"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          {user.estAdmin && (
            <button onClick={() => openModal()} className="bg-supinfo-orange hover:bg-orange-600 text-white px-4 py-2 rounded-xl flex items-center gap-2 font-bold shadow-lg transition-transform hover:scale-105">
              <Plus size={20} /> <span className="hidden md:inline">Ajouter</span>
            </button>
          )}
        </div>
      </div>

      {/* Tableau */}
      <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden shadow-xl flex-1 overflow-y-auto">
        <table className="w-full text-left border-collapse">
          <thead className="sticky top-0 bg-[#1A0B36]/90 backdrop-blur-sm z-10">
            <tr className="text-indigo-200 text-xs uppercase tracking-wider border-b border-white/10">
              <th className="p-4 font-semibold">Produit</th>
              <th className="p-4 font-semibold text-right">Prix</th>
              <th className="p-4 font-semibold text-center">Stock</th>
              <th className="p-4 font-semibold text-center">État</th>
              <th className="p-4 font-semibold text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filteredProducts.map((produit) => (
              <tr key={produit.id} className="hover:bg-white/5 transition-colors group">
                <td className="p-4 font-medium flex items-center gap-3">
                  <div className="p-2 bg-white/5 rounded-lg border border-white/10 group-hover:border-supinfo-orange/50 transition-colors">
                    <Tag size={16} className="text-supinfo-orange" />
                  </div>
                  {produit.nom}
                </td>
                <td className="p-4 text-right font-mono text-lg font-bold text-white">
                  {Number(produit.prix).toFixed(2)} €
                </td>
                <td className="p-4 text-center font-mono text-white/80">
                  <div className="inline-flex items-center gap-2 bg-white/5 px-3 py-1 rounded-lg border border-white/10">
                    <Box size={14} className="text-indigo-300" />
                    {produit.stock}
                  </div>
                </td>
                <td className="p-4 text-center">
                  {produit.stock > 0 ? (
                    <span className="inline-flex items-center gap-1.5 bg-green-500/10 text-green-400 px-2 py-1 rounded text-xs font-bold border border-green-500/20">En stock</span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 bg-red-500/10 text-red-400 px-2 py-1 rounded text-xs font-bold border border-red-500/20">Rupture</span>
                  )}
                </td>
                <td className="p-4 text-right">
                  {user.estAdmin ? (
                    <div className="flex justify-end gap-2">
                      <button onClick={() => openModal(produit)} className="p-2 bg-white/5 hover:bg-white/20 text-indigo-200 hover:text-white rounded-lg transition-colors border border-white/10"><Edit size={16} /></button>
                      <button onClick={() => handleDelete(produit.id)} className="p-2 bg-red-500/10 hover:bg-red-500/30 text-red-400 hover:text-red-200 rounded-lg transition-colors border border-red-500/20"><Trash2 size={16} /></button>
                    </div>
                  ) : (
                    <button 
                      onClick={() => handleAddToCart(produit)}
                      disabled={produit.stock <= 0}
                      className={`
                        flex items-center gap-2 ml-auto text-xs font-bold px-4 py-2 rounded-lg transition-all shadow-lg active:scale-95
                        ${produit.stock > 0 
                          ? 'bg-supinfo-orange hover:bg-orange-600 text-white shadow-orange-900/20 cursor-pointer' 
                          : 'bg-white/5 text-gray-500 cursor-not-allowed'}
                      `}
                    >
                      <Plus size={14} />
                      Ajouter
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Admin (Identique au précédent) */}
      {isModalOpen && (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm rounded-xl">
          <div className="bg-[#1A0B36] border border-white/20 rounded-2xl shadow-2xl p-6 w-full max-w-md animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                {currentProduct.id ? <Edit className="text-supinfo-orange" /> : <Plus className="text-supinfo-orange" />}
                {currentProduct.id ? "Modifier" : "Nouveau"}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-indigo-300 hover:text-white"><X size={24} /></button>
            </div>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-indigo-200 mb-1">Nom</label>
                <input type="text" required className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:ring-2 focus:ring-supinfo-orange outline-none" value={currentProduct.nom} onChange={(e) => setCurrentProduct({...currentProduct, nom: e.target.value})} />
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-indigo-200 mb-1">Prix (€)</label>
                  <input type="number" step="0.01" required className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:ring-2 focus:ring-supinfo-orange outline-none" value={currentProduct.prix} onChange={(e) => setCurrentProduct({...currentProduct, prix: parseFloat(e.target.value)})} />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-indigo-200 mb-1">Stock</label>
                  <input type="number" required className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:ring-2 focus:ring-supinfo-orange outline-none" value={currentProduct.stock} onChange={(e) => setCurrentProduct({...currentProduct, stock: parseInt(e.target.value)})} />
                </div>
              </div>
              <div className="flex gap-3 mt-6 pt-4 border-t border-white/10">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-3 rounded-xl font-bold text-indigo-200 hover:bg-white/5 transition-colors">Annuler</button>
                <button type="submit" className="flex-1 bg-supinfo-orange hover:bg-orange-600 text-white py-3 rounded-xl font-bold shadow-lg flex items-center justify-center gap-2 transition-transform hover:scale-[1.02]"><Save size={18} /> Enregistrer</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
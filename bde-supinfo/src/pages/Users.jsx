import React, { useState } from 'react';
import { Search, ShieldCheck, User, Award } from 'lucide-react';

const Users = ({ users }) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Filtrer les utilisateurs selon la recherche
  const filteredUsers = users.filter(user => 
    user.nomComplet.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="text-white h-full flex flex-col">
      {/* EN-TÊTE + RECHERCHE */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <User className="text-supinfo-orange" /> Gestion des Utilisateurs
          </h2>
          <p className="text-indigo-200 text-sm">
            {users.length} membres enregistrés
          </p>
        </div>

        {/* Barre de recherche */}
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-300" size={18} />
          <input 
            type="text" 
            placeholder="Rechercher un étudiant..." 
            className="w-full bg-white/10 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-supinfo-orange transition-all placeholder-indigo-300/50"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* TABLEAU DES UTILISATEURS */}
      <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden shadow-xl flex-1">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/5 text-indigo-200 text-xs uppercase tracking-wider border-b border-white/10">
                <th className="p-4 font-semibold">Étudiant</th>
                <th className="p-4 font-semibold">Promo</th>
                <th className="p-4 font-semibold">Code</th>
                <th className="p-4 font-semibold text-center">Points</th>
                <th className="p-4 font-semibold text-right">Rôle</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-white/5 transition-colors group">
                  
                  {/* Colonne Nom + Email */}
                  <td className="p-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-sm font-bold shadow-lg">
                      {user.nomComplet.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-white group-hover:text-supinfo-orange transition-colors">
                        {user.nomComplet}
                      </p>
                      <p className="text-xs text-indigo-300">{user.email}</p>
                    </div>
                  </td>

                  {/* Promo */}
                  <td className="p-4 text-sm text-white">
                    <span className="bg-white/10 px-2 py-1 rounded text-xs border border-white/10">
                      {user.promo}
                    </span>
                  </td>

                  {/* Code Adhérent */}
                  <td className="p-4 text-sm font-mono text-indigo-200">
                    {user.codeAdherent}
                  </td>

                  {/* Points Fidélité */}
                  <td className="p-4 text-center">
                    <div className="inline-flex items-center gap-1 font-bold text-supinfo-orange bg-supinfo-orange/10 px-3 py-1 rounded-full border border-supinfo-orange/20">
                      <Award size={14} />
                      {user.points}
                    </div>
                  </td>

                  {/* Badge Rôle */}
                  <td className="p-4 text-right">
                    {user.estAdmin ? (
                      <span className="inline-flex items-center gap-1 bg-purple-500/20 text-purple-200 px-3 py-1 rounded-full text-xs font-bold border border-purple-500/30">
                        <ShieldCheck size={12} /> Admin
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 bg-blue-500/10 text-blue-200 px-3 py-1 rounded-full text-xs font-medium border border-blue-500/20">
                        <User size={12} /> Étudiant
                      </span>
                    )}
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Message si aucun résultat */}
        {filteredUsers.length === 0 && (
          <div className="p-8 text-center text-indigo-300">
            Aucun utilisateur trouvé pour "{searchTerm}"
          </div>
        )}
      </div>
    </div>
  );
};

export default Users;
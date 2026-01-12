import React, { useState } from 'react';
import { Mail, Key, Lock, ArrowRight } from 'lucide-react';
import logo from '../assets/logo.png';

const Login = ({ users, onLogin }) => {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // --- DEBUGGING ---
    console.log("Tentative de connexion avec :", email, code);
    
    if (!users) {
      setError("Erreur technique : Liste d'utilisateurs introuvable.");
      return;
    }

    // Recherche de l'utilisateur avec "codeAdherent"
    const foundUser = users.find(u => 
      u.email.toLowerCase() === email.toLowerCase() && 
      String(u.codeAdherent) === String(code)
    );

    if (foundUser) {
      onLogin(foundUser);
    } else {
      setError('Identifiants inconnus. Vérifiez email et code.');
    }
  };

  return (
    <div className="min-h-screen bg-supinfo-purple flex items-center justify-center p-4">
      <div className="bg-white/10 backdrop-blur-md border border-white/10 p-8 rounded-3xl shadow-2xl w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <img src={logo} alt="Supinfo" className="h-20 mx-auto mb-4 object-contain" />
          <h2 className="text-2xl font-bold text-white">Connexion BDE</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-indigo-200 ml-1">Email SUPINFO</label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-300">
                <Mail size={20} />
              </div>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-black/20 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-supinfo-orange"
                placeholder="prenom.nom@supinfo.com"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-indigo-200 ml-1">Code Adhérent</label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-300">
                <Key size={20} />
              </div>
              <input 
                type="password" 
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full bg-black/20 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-supinfo-orange"
                placeholder="Votre code"
                required
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-500/20 border border-red-500/50 text-red-200 text-sm p-3 rounded-lg flex items-center gap-2">
              <Lock size={16} />
              {error}
            </div>
          )}

          <button 
            type="submit" 
            className="w-full bg-supinfo-orange hover:bg-orange-600 text-white font-bold py-3 rounded-xl shadow-lg transition-transform hover:scale-[1.02] flex items-center justify-center gap-2"
          >
            Se connecter <ArrowRight size={20} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { Trophy, Award, Clock, CreditCard, Tag } from 'lucide-react';

// IMPORT DES IMAGES
import bestsellerImg from '../assets/bestseller.png';
import bestbrandImg from '../assets/bestbrand.png';
import cbImg from '../assets/cartebancaire.png'; //
import haImg from '../assets/helloasso.png';     //
import espImg from '../assets/especes.png';      //

// MAPPING
const paymentIcons = {
  "Carte bancaire": cbImg,
  "HelloAsso": haImg,
  "Espèces": espImg
};

// COMPOSANT AXE X PERSONNALISÉ (ICÔNES AGRANDIES)
const CustomAxisTick = ({ x, y, payload }) => {
  const imageSrc = paymentIcons[payload.value];
  
  if (!imageSrc) return null;

  return (
    <g transform={`translate(${x},${y})`}>
      <image 
        x={-22}      // Centré (moitié de 45px)
        y={5}        // Petit espacement sous la barre
        width={50}   // TAILLE AUGMENTÉE (était 30)
        height={50}  // TAILLE AUGMENTÉE (était 30)
        href={imageSrc} 
        style={{ opacity: 1 }}
      />
    </g>
  );
};

const Dashboard = ({ stats }) => {
  const { statistiques, repartitionPaiements, ventesParMois, topClients } = stats;

  const glassCardClass = "bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/10 shadow-xl";

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] space-y-3 text-white pb-2">
      
      {/* --- 1. LIGNE DU HAUT (h-36) --- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-36 shrink-0">
        
        {/* Stats Clés */}
        <div className={`${glassCardClass} flex flex-col justify-between`}>
          <h3 className="text-lg font-bold flex items-center gap-2 text-indigo-100">
            <Tag className="text-supinfo-orange" size={20} /> Statistiques Clés
          </h3>
          <div className="grid grid-cols-3 gap-2 text-center divide-x divide-white/10 my-auto">
            <div className="px-1">
              <Clock className="w-6 h-6 text-supinfo-orange mx-auto mb-1" />
              <p className="text-xs text-indigo-300">Heure Moy.</p>
              <p className="text-xl font-bold">{statistiques.heureMoyenneCommande}</p>
            </div>
            <div className="px-1">
              <CreditCard className="w-6 h-6 text-supinfo-orange mx-auto mb-1" />
              <p className="text-xs text-indigo-300">Prix Moy.</p>
              <p className="text-xl font-bold">{statistiques.moyenneEurosParCommande} €</p>
            </div>
            <div className="px-1">
              <Award className="w-6 h-6 text-supinfo-orange mx-auto mb-1" />
              <p className="text-xs text-indigo-300">Best Promo</p>
              <p className="text-xl font-bold">{statistiques.meilleurePromo}</p>
            </div>
          </div>
        </div>

        {/* Produit Star */}
        <div className={`${glassCardClass} flex items-center justify-between relative overflow-hidden`}>
          <div className="z-10 pl-2">
            <h3 className="text-lg font-bold mb-1 flex items-center gap-2 text-indigo-100">
              <Trophy className="text-supinfo-orange" size={20} /> Produit Star
            </h3>
            <p className="text-indigo-300 text-xs mb-2">Le plus vendu du mois</p>
            <h4 className="text-3xl font-extrabold text-supinfo-orange mb-0 leading-tight">
              {statistiques.produitPlusVendu.nom}
            </h4>
            <p className="text-base font-medium mt-1">
              <span className="font-bold text-white">{statistiques.produitPlusVendu.quantite}</span> ventes
            </p>
          </div>

          <div className="flex items-center gap-4 pr-6 h-full z-10">
            <img 
              src={bestbrandImg} 
              alt="Marque" 
              className="w-36 h-auto object-contain opacity-100 drop-shadow-lg"
            />
            <img 
              src={bestsellerImg} 
              alt="Produit" 
              className="h-28 w-auto object-contain drop-shadow-2xl hover:scale-110 transition-transform duration-300"
            />
          </div>
        </div>
      </div>

      {/* --- 2. LIGNE DU MILIEU (h-48) --- */}
      <div className={`${glassCardClass} h-48 shrink-0 flex flex-col justify-center`}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full">
          {/* Clients */}
          <div className="border-r border-white/10 pr-4 flex flex-col justify-center">
            <h3 className="text-sm font-bold mb-3 flex items-center gap-2 text-supinfo-orange uppercase tracking-wider">
              <Trophy size={16} /> Top Clients (Commandes)
            </h3>
            <div className="grid grid-cols-3 gap-3">
              {topClients.parCommandes.map((client, index) => (
                <div key={index} className="bg-white/5 p-2 rounded-lg text-center border border-white/5 hover:bg-white/10 transition">
                  <div className="text-xs text-indigo-300 font-bold mb-1">#{index + 1}</div>
                  <div className="font-semibold text-xs truncate w-full mb-1">{client.nom}</div>
                  <div className="text-supinfo-orange font-bold text-xs">{client.nombreCommandes}</div>
                </div>
              ))}
            </div>
          </div>
          {/* Acheteurs */}
          <div className="pl-4 flex flex-col justify-center">
             <h3 className="text-sm font-bold mb-3 flex items-center gap-2 text-white uppercase tracking-wider">
              <Award size={16} /> Top Gros Acheteurs
            </h3>
            <div className="grid grid-cols-3 gap-3">
              {topClients.parProduits.map((client, index) => (
                <div key={index} className="bg-white/5 p-2 rounded-lg text-center border border-white/5 hover:bg-white/10 transition">
                   <div className="text-xs text-indigo-300 font-bold mb-1">#{index + 1}</div>
                  <div className="font-semibold text-xs truncate w-full mb-1">{client.nom}</div>
                  <div className="text-white font-bold text-xs">{client.nombreProduits}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* --- 3. GRAPHIQUES (Bas) --- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1 min-h-0">
        
        {/* Ventes */}
        <div className={`${glassCardClass} flex flex-col h-full`}>
          <h3 className="text-sm font-bold mb-2 text-indigo-100">Évolution des Ventes</h3>
          <div className="flex-1 min-h-0 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ventesParMois} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="mois" tick={{fontSize: 11, fill: '#A5B4FC'}} axisLine={false} tickLine={false} />
                <YAxis tick={{fontSize: 11, fill: '#A5B4FC'}} axisLine={false} tickLine={false} tickFormatter={(val)=>`${val}€`} />
                <Tooltip 
                  cursor={{fill: 'rgba(255,255,255,0.05)'}}
                  contentStyle={{ backgroundColor: '#1e1b4b', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', borderRadius: '8px', fontSize: '12px' }}
                />
                <Bar dataKey="montant" fill="#B7651D" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Paiements (ICÔNES AGRANDIES) */}
        <div className={`${glassCardClass} flex flex-col h-full`}>
          <h3 className="text-sm font-bold mb-2 text-indigo-100">Répartition des Paiements</h3>
          <div className="flex-1 min-h-0 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={repartitionPaiements} margin={{ top: 10, right: 10, left: -20, bottom: 45 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                <XAxis 
                  dataKey="type" 
                  tick={<CustomAxisTick />} 
                  axisLine={false} 
                  tickLine={false} 
                  interval={0} 
                />
                <YAxis tick={{fontSize: 11, fill: '#A5B4FC'}} axisLine={false} tickLine={false} tickFormatter={(val)=>`${val}%`} />
                <Tooltip 
                  cursor={{fill: 'rgba(255,255,255,0.05)'}}
                  contentStyle={{ backgroundColor: '#1e1b4b', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', borderRadius: '8px', fontSize: '12px' }}
                  formatter={(value) => [`${value}%`, 'Part']}
                />
                <Bar dataKey="pourcentage" fill="#4338ca" radius={[4, 4, 0, 0]} barSize={60} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
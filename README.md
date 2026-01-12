# 🦁 BDE SUPINFO - Application Snack & Fidélité

Application web de gestion pour le BDE de SUPINFO Caen. Elle permet de gérer les ventes de snacks, les stocks et la fidélité des étudiants.

## 🚀 Fonctionnalités

### 🔒 Authentification
* Système de connexion simulé (Admin vs Étudiant).
* Protection des routes (les étudiants ne voient pas le tableau de bord).

### 📊 Tableau de bord (Admin)
* Statistiques clés (Ventes, Panier moyen, Meilleure promo).
* Graphiques interactifs (Ventes par mois, Répartition des paiements).
* Podium des meilleurs clients.

### 🛍️ Boutique & Gestion (Produits)
* **Admin :** Ajout, Modification, Suppression de produits. Gestion des stocks et activation/désactivation.
* **Étudiant :** Consultation du catalogue, Ajout au panier, Paiement via redirection HelloAsso.

### 🎁 Fidélité
* Carte de fidélité numérique interactve.
* Calcul automatique des tampons.
* Déblocage de récompense après 8 commandes.

## 🛠️ Stack Technique

* **Framework :** React (Vite)
* **Style :** Tailwind CSS
* **Graphiques :** Recharts
* **Icônes :** Lucide React
* **Données :** JSON (Simulation de base de données locale)

## 📦 Installation & Démarrage

1.  Cloner le projet :
    ```bash
    git clone [https://github.com/10lsv/BDE-SUPINFO-WEBSITE.git](https://github.com/10lsv/BDE-SUPINFO-WEBSITE.git)
    ```
2.  Installer les dépendances :
    ```bash
    npm install
    ```
3.  Lancer le serveur de développement :
    ```bash
    npm run dev
    ```

## 🔑 Identifiants de Test

Pour tester les différents rôles, utilisez ces comptes :

| Rôle | Email | Code | Accès |
| :--- | :--- | :--- | :--- |
| **Admin** | `martin.crocquevieille@supinfo.com` | `5050` | Tout (Dashboard, Stocks, Users) |
| **Étudiant** | `axel.nicolas@supinfo.com` | `2511` | Boutique (Achat), Fidélité |

---
*Projet réalisé pour le BDE SUPINFO.*

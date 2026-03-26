# 🛒 SUPECO E-COMMERCE (Laravel + Inertia + React)

## 📌 Présentation du projet

SUPECO est une application e-commerce développée avec Laravel et React via Inertia.js.
Elle permet aux utilisateurs de consulter des produits, passer des commandes et suivre leurs achats, tandis qu’un espace administrateur permet la gestion complète de la plateforme.

---

## 🎯 Objectifs du projet

* Proposer une plateforme e-commerce moderne et responsive
* Offrir une expérience utilisateur fluide (sans rechargement grâce à Inertia)
* Permettre une gestion administrative complète (produits, commandes, utilisateurs)
* Mettre en pratique une architecture Laravel + React sans API

---

## 🧱 Stack technique

### Backend

* Laravel 10+
* MySQL
* Eloquent ORM

### Frontend

* React (Inertia.js)
* JavaScript (ES6+)
* CSS personnalisé

### Autres outils

* Vite
* Git & GitHub

---

## ⚙️ Architecture du projet

### 🔹 Backend (Laravel)

* `app/Models` → Modèles (User, Product, Order…)
* `app/Http/Controllers` → Logique métier
* `routes/web.php` → Routes Inertia

### 🔹 Frontend (React + Inertia)

* `resources/js/Pages` → Pages (Home, Products, Admin…)
* `resources/js/Layouts` → Layouts (ShopLayout, AdminLayout)

### 🔹 Inertia

* Permet de connecter Laravel et React sans API REST

---

## 👤 Fonctionnalités utilisateur

* Inscription / Connexion
* Consultation des produits
* Recherche de produits
* Ajout au panier
* Passage de commande
* Choix du mode de paiement (Wave / Orange Money / PayPal)
* Suivi des commandes
* Gestion du profil

---

## 🛠️ Fonctionnalités administrateur

* Dashboard administrateur
* Gestion des produits (CRUD)
* Gestion des catégories
* Gestion des commandes (statuts + paiement)
* Gestion des utilisateurs (activer / désactiver)
* Gestion des messages clients

---

## 🔐 Sécurité

* Middleware admin (`AdminMiddleware`)
* Authentification Laravel
* Protection CSRF
* Validation des formulaires

---

## 📦 Installation du projet

### 1. Cloner le projet

```bash
git clone https://github.com/TON-USERNAME/supeco-ecommerce.git
cd supeco-ecommerce
```

---

### 2. Installer les dépendances

```bash
composer install
npm install
```

---

### 3. Configuration

le fichier `.env` :
APP_NAME=SUPECO
APP_ENV=local
APP_KEY=base64:7676zGIhajHXtkAKsEB5Qu6IWHzmVb5Zys+pPkV4f9E=
APP_DEBUG=true
APP_URL=http://127.0.0.1:8000

APP_LOCALE=en
APP_FALLBACK_LOCALE=en
APP_FAKER_LOCALE=en_US

APP_MAINTENANCE_DRIVER=file
BCRYPT_ROUNDS=12

LOG_CHANNEL=stack
LOG_STACK=single
LOG_DEPRECATIONS_CHANNEL=null
LOG_LEVEL=debug

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=supeco_ecommerce_clean
DB_USERNAME=root
DB_PASSWORD=

SESSION_DRIVER=file
SESSION_LIFETIME=120
SESSION_ENCRYPT=false
SESSION_PATH=/
SESSION_DOMAIN=null

BROADCAST_CONNECTION=log
FILESYSTEM_DISK=local
QUEUE_CONNECTION=database

CACHE_STORE=file

MEMCACHED_HOST=127.0.0.1

REDIS_CLIENT=phpredis
REDIS_HOST=127.0.0.1
REDIS_PASSWORD=null
REDIS_PORT=6379

MAIL_MAILER=log
MAIL_SCHEME=null
MAIL_HOST=127.0.0.1
MAIL_PORT=2525
MAIL_USERNAME=null
MAIL_PASSWORD=null
MAIL_FROM_ADDRESS="hello@example.com"
MAIL_FROM_NAME="${APP_NAME}"

AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_DEFAULT_REGION=us-east-1
AWS_BUCKET=
AWS_USE_PATH_STYLE_ENDPOINT=false

VITE_APP_NAME="${APP_NAME}"

WAVE_NUMBER="77 873 23 23"
ORANGE_MONEY_NUMBER="78 946 19 02"
ADMIN_EMAIL="contact@supeco.sn"
SUPECO_WHATSAPP="221779461902"

MIGRATIONS_TABLE=migrations_new


```bash
cp .env.example .env
```

Configurer :

* Base de données: supeco_ecommerce_clean

---

### 4. Générer la clé

```bash
php artisan key:generate
```

---

### 5. Migration base de données

```bash
php artisan migrate
```

---

### 6. Lancer le projet

```bash
php artisan serve
npm run dev
```

---

## 🌐 Accès

* Front : http://127.0.0.1:8000
* Admin : http://127.0.0.1:8000/admin

---

## 👨‍💻 Comptes de test

### Admin

* Email : [admin@supeco.com](mailto:admin@supeco.com)
* Mot de passe : madolina

### Utilisateur

* Inscription via le site

---

## 📁 Structure principale

```
app/
resources/
routes/
public/
```

---

## 🚀 Améliorations possibles

* Paiement en ligne réel (API Wave/OM)
* Notifications email
* Dashboard analytics
* Application mobile (React Native / Flutter)
* Système de livraison avancé

---

## 👤 Auteur

Ndeye Madeleine Diallo
CSDS M2 ISM
Laravel
---

## 📜 Licence

Projet académique / pédagogique

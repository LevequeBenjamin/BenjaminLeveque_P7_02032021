Auteur
Benjamin Leveque

Projet 7 - Création d'un réseau social d'entreprise

Démarrage 

Cloner le repo sur votre ordinateur
Lancer le terminal de commande, se placer dans le dossier Groupomania:
  - installer sequelize cli
  - dans le fichier config/config.json :

{
  "development": {
    "username": "votre username mysql",
    "password": "votre mot de passe mysql,
    "database": "la db que vous aurez préalablement créé sur mysql",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": "votre username mysql",
    "password": "votre mot de passe mysql",
    "database": "la db que vous aurez préalablement créé sur mysql",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "votre username mysql",
    "password": "votre mot de passe mysql",
    "database": "la db que vous aurez préalablement créé sur mysql",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}

  - creez un fichier .env dans le dossier config:
    PORT=5000
    CLIENT_URL=http://localhost:3000
    DBID=votre username mysql
    DBPW=mot de passe mysql
    JWT_TOKEN=un token aléatoire

  - dans le terminal:
    sequelize db:create
    sequelize db:migrate

  (vous devez être connecté à MySQL)

  - et npm install, puis npm start

  - placez vous maintenant dans le dossier client
  - créez un fichier .env:
    REACT_APP_API_URL=http://localhost:5000/
  - npm install, npm start

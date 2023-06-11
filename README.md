# Hackathon Carbon IT 
Réalisation d'un intranet pour l'entreprise Carbon IT.
Ce projet a été réalisé dans le cadre d'un hackathon d'une semaine.


## Feature 

- [x] Carbon Overflow - un forum de questions/réponses pour les employés de l'entreprise. 
Un forum peut être relier à un client. Il sera alors privé et seul les employés en mission pour ce client pourront y accéder.
Un systeme de tri par nom et par client est mise en place.


- [x] Evolution Carbon - Des formations pour les employés de l'entreprise. Une formation peut être liée à une technologie.


- [x] Regroupement Carbon - Les events de l'entreprise. N'importe quel employé peut rejoindre.


- [x] Carbon Pass - Un Battle Pass pour les employés de l'entreprise.
Plus ils seront impliqué dans la vie de l'entreprise plus ils gagnent de l'xp et des récompenses.


- [x] Carbon Mentoring - Un système de mentorat pour les employés de l'entreprise.


- [x] Mes Carbons - Un listing des employés de l'entreprise.
Un système de tri par Technologie, Client, Expertise, etc. est disponible pour trouver un employé plus facilement.


- [x] Carbon News - Une redirection sur le dernier article du blog de l'entreprise.


- [x] Carbon Back office - Un back office pour les administrateurs de l'entreprise et les supports (RH, Sales)
Cet outil permet de gérer les utilisateurs, les clients, les technologies,  les formations, les events, les mentors, les battle pass, les forums, les articles de blog, etc.
Il permet aussi de gérer les missions des employés et de les lier à un client et de gérer les clients également.


- [x] Carbon Drive - Une architecture GDrive pour simplifier la recherche de documents pour les fonctions RH et Sales.
Cela permet aussi de centralisé la donnée et de la sécuriser.

  
## Tech Stack

Le projet est réalisé avec les technologies suivantes:
- [x] [NestJS](https://nestjs.com/)
- [x] [ReactJS](https://fr.reactjs.org/)
- [x] [Prisma](https://www.prisma.io/)
- [x] [PostgreSQL](https://www.postgresql.org/)
- [x] [Docker](https://www.docker.com/)


## Installation

### ENV FILE 

Il y a deux .env :
- Un .env à la racine du projet pour faire tourner le docker
- Un .env dans le dossier back pour faire tourner le back


Il faut créer ces .env et les remplir. Des .env.example sont disponibles pour vous aider.


### LANCER DOCKER

````bash
docker compose up -d
````

### LANCER LE BACK
```bash
docker compose exec back npm i
```
```bash
docker compose exec back npx prisma migrate dev
```
```bash
docker compose exec back npx prisma generate
```
```bash
docker compose exec back npm run prisma:seed
```
```bash
docker compose exec back npm run start:dev
```

### LANCER LE FRONT 
```bash
docker compose exec front npm i
```
```bash
docker compose exec front npm run dev
```

### VIDER LA BASE DE DONNEES

```bash
	make clear
```

### RELANCER LES SEEDS
```bash
    make seed
```

### LANCER DOCKER + BACK + SEED
```bash
    make all
``` 

### INSTALLER LES DEPENDENCES + GENERER SCHEMA BDD
```bash
    make prerequisites
```

### LANCER API SOLO 
```bash
    make api
```

## Voir le rendu 

Le front est disponible à l'adresse suivante : http://localhost:3000/

Trois workflow sont mises à disposition pour tester l'application :

- [x] Un workflow pour les employés de l'entreprise
Ce workflow permet de tester toutes les fonctionnalités de l'application.

Se connecter : 
- email : consultant@carbon.com
- password : test


- [x] Un workflow pour les administrateurs de l'entreprise
Ce workflow permet de tester toutes les fonctionnalités de l'application.

Se connecter :
- email : admin@carbon.com
- password : test


- [x] Un workflow pour les supports de l'entreprise (RH, Sales)
Ce workflow permet de tester les fonctionnalités de l'application qui sont liées à leur fonction.

Se connecter :
- email : support@carbon.com
- password : test


## Auteurs

- [@Alexandre Baudry](https://github.com/Alexandrebdry)
- [@Raida Sadik](https://github.com/SadikRaida)
- [@Arthur Gratton](https://github.com/Arthur-creator)
- [@Antoine Saunier](https://github.com/Antoine-973)
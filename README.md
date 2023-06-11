# hackathon-carbon
Remplacer les .env.example par des .env et les remplir


### DOCKER

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
# hackathon-carbon
Remplacer les .env.example par des .env et les remplir

````bash
docker compose up -d
````

### BACK
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
docker compose exec back npm run start:dev
```

### FRONT 
```bash
docker compose exec front npm i
```
```bash
docker compose exec front npm run dev
```
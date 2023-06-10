.PHONY: up back-prerequisites back-commands front-prerequisites front-commands

up:
	docker compose up -d

back-prerequisites:
	docker compose exec back npm i
	docker compose exec back npx prisma migrate dev
	docker compose exec back npx prisma generate

back-commands:
	docker compose exec back npm run start:dev

seed:
	docker compose exec back npx prisma db push --preview-feature --force-reset
	docker compose exec back npm run prisma:seed
	

front-prerequisites:
	docker compose exec front npm i

front-commands:
	docker compose exec front npm run dev


all: up back-prerequisites seed back-commands front-prerequisites front-commands


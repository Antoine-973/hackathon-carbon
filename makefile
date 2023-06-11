.PHONY: up back-prerequisites back-commands front-prerequisites front-commands

up:
	docker compose up -d

back-prerequisites:
	docker compose exec back npm i
	docker compose exec back npx prisma migrate dev
	docker compose exec back npx prisma generate

api:
	docker compose exec back npm run start:dev

seed:
	docker compose exec back npx prisma db push --preview-feature --force-reset
	docker compose exec back npm run prisma:seed

clear:
	docker compose exec back npx prisma db push --preview-feature --force-reset


front-prerequisites:
	docker compose exec front npm i

front-commands:
	docker compose exec front npm run dev


all: up back-prerequisites seed api front-prerequisites front-commands


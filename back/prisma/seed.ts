import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcryptjs';
const prisma = new PrismaClient();


async function main() {
    const hashedPassword = await bcrypt.hash('password', 10);

    const users = [
        {
            email: 'consultant@carbon.com',
            firstname: 'Falcon',
            lastname: 'Sultan',
            role: 'ROLE_CONSULTANT',
            password: hashedPassword,
            recruitmentAt: new Date(),
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            email: 'admin@carbon.com',
            firstname: 'Jade',
            lastname: 'Mine',
            role: 'ROLE_ADMIN',
            password: hashedPassword,
            recruitmentAt: new Date(),
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            email: 'support@carbon.com',
            firstname: 'Pierre',
            lastname: 'Rash',
            role: 'ROLE_SUPPPORT',
            password: hashedPassword,
            recruitmentAt: new Date(),
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    ];

    const events = [
        {
            title: 'Conférence JS vs PHP',
            description: 'Conférence sur les langages de programmation',
            date: new Date(),
        },
        {
            title: 'Visionnage de la finale de la coupe du monde',
            description: 'Visionnage de la finale de la coupe du monde rdv 18h en salle commune',
            date: new Date(),
        },
        {
            title: 'Conférence sur le développement durable',
            description: 'Conférence sur le développement durable',
            date: new Date(),
        },
        {
            title: 'Repas de noël',
            description: 'CNOEL15',
            date: new Date(),
        },
        {
            title: 'Le jour est enfin venu...',
            description: 'Lancer de ballots de paille annuel',
            date: new Date(),
        },
    ]

    

    for (let user of users) {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        await prisma.user.create({
            data: {
                email: user.email,
                firstname: user.firstname,
                lastname: user.lastname,
                role: user.role,
                password: hashedPassword,
                recruitmentAt: user.recruitmentAt,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        });
    }

    for (let i = 4; i <= 40; i++) {
        await prisma.user.create({
            data: {
                email: `user` + i + `@carbon.com`,
                firstname: `user` + i,
                lastname: `user` + i,
                role: 'ROLE_CONSULTANT',
                password: hashedPassword,
                recruitmentAt: new Date(),
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        });
    }
    
    for (let i = 1; i <= 40; i++) {
        await prisma.client.create({
            data: {
                title: `client` + i,
                description: i + ` client: lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies ultrices, nisl nisl ultricies nisl, nec ultricies nisl nisl nec nisl. Nullam auctor, nisl eget ultricies ultrices, nisl nisl ultricies nisl, nec ultricies nisl nisl nec nisl. Nullam auctor, nisl eget ultricies ultrices, nisl nisl ultricies nisl, nec ultricies nisl nisl nec nisl. Nullam auctor, nisl eget ultricies ultrices, nisl nisl ultricies nisl, nec ultricies nisl nisl nec nisl. Nullam auctor, nisl eget ultricies ultrices, nisl nisl ultricies nisl, nec ultricies nisl nisl nec nisl. Nullam auctor, nisl eget ultricies ultrices, nisl nisl ultricies nisl, nec ultricies nisl nisl nec nisl. Nullam auctor, nisl eget ultricies ultrices, nisl nisl ultricies nisl, nec ultricies nisl nisl nec nisl. Nullam auctor, nisl eget ultricies ultrices, nisl nisl ultricies nisl, nec ultricies nisl nisl nec nisl.`,
                email: `client` + i + `@carbon.com`,
            },
        });
    }

    for (let i = 1; i <= 40; i++) {
        await prisma.article.create({
            data: {
                title: `article` + i,
                description: i+` article : lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies ultrices, nisl nisl ultricies nisl, nec ultricies nisl nisl nec nisl. Nullam auctor, nisl eget ultricies ultrices, nisl nisl ultricies nisl, nec ultricies nisl nisl nec nisl. Nullam auctor, nisl eget ultricies ultrices, nisl nisl ultricies nisl, nec ultricies nisl nisl nec nisl. Nullam auctor, nisl eget ultricies ultrices, nisl nisl ultricies nisl, nec ultricies nisl nisl nec nisl. Nullam auctor, nisl eget ultricies ultrices, nisl nisl ultricies nisl, nec ultricies nisl nisl nec nisl. Nullam auctor, nisl eget ultricies ultrices, nisl nisl ultricies nisl, nec ultricies nisl nisl nec nisl. Nullam auctor, nisl eget ultricies ultrices, nisl nisl ultricies nisl, nec ultricies nisl nisl nec nisl. Nullam auctor, nisl eget ultricies ultrices, nisl nisl ultricies nisl, nec ultricies nisl nisl nec nisl.`,
                image: 'https://picsum.photos/200/300',
                author: `author` + i,
            },
        });
    }  

    for (let event of events) {
        await prisma.event.create({
            data: {
                title: event.title,
                description: event.description,
                date: event.date,
            },
        });
    }

    for (let i = 6; i <= 40; i++) {
        await prisma.event.create({
            data: {
                title: `event` + i,
                description: i + ` Description de l'event : lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies ultrices, nisl nisl ultricies nisl, nec ultricies nisl nisl nec nisl. Nullam auctor, nisl eget ultricies ultrices, nisl nisl ultricies nisl, nec ultricies nisl nisl nec nisl. Nullam auctor, nisl eget ultricies ultrices, nisl nisl ultricies nisl, nec ultricies nisl nisl nec nisl. Nullam auctor, nisl eget ultricies ultrices, nisl nisl ultricies nisl, nec ultricies nisl nisl nec nisl. Nullam auctor, nisl eget ultricies ultrices, nisl nisl ultricies nisl, nec ultricies nisl nisl nec nisl. Nullam auctor, nisl eget ultricies ultrices, nisl nisl ultricies nisl, nec ultricies nisl nisl nec nisl. Nullam auctor, nisl eget ultricies ultrices, nisl nisl ultricies nisl, nec ultricies nisl nisl nec nisl. Nullam auctor, nisl eget ultricies ultrices, nisl nisl ultricies nisl, nec ultricies nisl nisl nec nisl.`,
                date: new Date(),
            },
        });
    }

    await prisma.pass.create({
        data: {
            title: 'Carbon Pass - SAISON 1',
            startAt: new Date(),
            endAt: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
        },
    }); 

    await prisma.stage.create({
        data: {
            position:0,
            passId:1,
        },
    });

    for (let i = 1; i <= 40; i+10) {
        await prisma.reward.create({
            data: {
                title: `reward` + i,
                description: i + `Description de la récompense : lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies ultrices, nisl nisl ultricies nisl, nec ultricies nisl nisl nec nisl. Nullam auctor, nisl eget ultricies ultrices, nisl nisl ultricies nisl, nec ultricies nisl nisl nec nisl. Nullam auctor, nisl eget ultricies ultrices, nisl nisl ultricies nisl, nec ultricies nisl nisl nec nisl. Nullam auctor, nisl eget ultricies ultrices, nisl nisl ultricies nisl, nec ultricies nisl nisl nec nisl. Nullam auctor, nisl eget ultricies ultrices, nisl nisl ultricies nisl, nec ultricies nisl nisl nec nisl. Nullam auctor, nisl eget ultricies ultrices, nisl nisl ultricies nisl, nec ultricies nisl nisl nec nisl. Nullam auctor, nisl eget ultricies ultrices, nisl nisl ultricies nisl, nec ultricies nisl nisl nec nisl. Nullam auctor, nisl eget ultricies ultrices, nisl nisl ultricies nisl, nec ultricies nisl nisl nec nisl.` ,
                image: 'https://picsum.photos/200/300',
                stageId: 1,
            },
        });
    }


    


}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

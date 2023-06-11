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
            expertise: 'Carbon Poli',
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
            expertise: 'Carbon Poli',
            password: hashedPassword,
            recruitmentAt: new Date(),
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            email: 'support@carbon.com',
            firstname: 'Pierre',
            expertise: 'Carbon Poli',
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
            participants: []
        },
        {
            title: 'Visionnage de la finale de la coupe du monde',
            description: 'Visionnage de la finale de la coupe du monde rdv 18h en salle commune',
            date: new Date(),
            participants: []
        },
        {
            title: 'Conférence sur le développement durable',
            description: 'Conférence sur le développement durable',
            date: new Date(),
            participants: []
        },
        {
            title: 'Repas de noël',
            description: 'CNOEL15',
            date: new Date(),
            participants: []
        },
        {
            title: 'Le jour est enfin venu...',
            description: 'Lancer de ballots de paille annuel',
            date: new Date(),
            participants: []
        },
    ]

    const techno = [
        {
            title: 'React',
            description: 'React est une bibliothèque JavaScript libre développée par Facebook depuis 2013. Le but principal de cette bibliothèque est de faciliter la création d\'application web monopage, via la création de composants dépendant d\'un état et générant une page (ou portion) HTML à chaque changement d\'état.',
        },
        {
            title: 'Angular',
            description: 'Angular est une plate-forme de développement pour construire des applications web mobiles et de bureau. Il s\'agit d\'un framework open source, principalement maintenu par Google et par une communauté de particuliers et de sociétés, qui se concentre sur le développement côté client.',
        },
        {
            title: 'Vue',
            description: 'Vue.js est un framework JavaScript open-source utilisé pour construire des interfaces utilisateur et des applications web monopages. Vue est conçu pour être progressivement adoptable. Le cœur de la bibliothèque est concentré uniquement sur la couche vue, et il est très simple à utiliser et à intégrer avec d\'autres bibliothèques ou projets existants.',
        },
        {
            title: 'Symfony',
            description: 'Symfony est un ensemble de composants PHP ainsi qu\'un framework MVC libre écrit en PHP. Il fournit des fonctionnalités modulables et adaptables qui permettent de faciliter et d’accélérer le développement d\'un site web. Symfony est publié sous licence MIT.',
        },
        {
            title: 'Laravel',
            description: 'Laravel est un framework web open-source écrit en PHP respectant le principe modèle-vue-contrôleur et entièrement développé en programmation orientée objet. Laravel est distribué sous licence MIT, avec ses sources hébergées sur GitHub.',
        },
        {
            title: 'Django',
            description: 'Django est un framework web open-source écrit en Python qui suit le pattern architectural MVC. Il a été conçu pour répondre à deux problématiques : la nécessité de développer rapidement des applications web et de les maintenir dans le temps.',
        },
        {
            title: 'Spring',
            description: 'Spring est un framework libre pour construire et définir l\'infrastructure d\'une application Java, dont il facilite le développement et les tests. Il cherche à éviter la programmation en environnement Java EE en proposant une approche alternative.',
        },
        {
            title: 'Express',
            description: 'Express.js est un framework pour construire des applications web basées sur Node.js. Il fournit des mécanismes pour gérer les requêtes entre le serveur et le client. Il est conçu pour construire des applications web et des API.',
        },
        {
            title: 'Flask',
            description: 'Flask est un framework web minimaliste écrit en Python. Il est développé depuis 2010 par Armin Ronacher, également connu pour avoir écrit le framework Python Jinja2. Flask est distribué sous licence BSD.',
        },
        {
            title: 'Ruby on Rails',
            description: 'Ruby on Rails, couramment appelé Rails, est un framework web libre écrit en Ruby. Il suit le motif de conception MVC et a pour but de faciliter la création d\'applications web de type CRUD. Rails est distribué selon les termes de la licence MIT.',
        },
        {
            title: 'ASP.NET',
            description: 'ASP.NET est un framework web développé par Microsoft pour permettre aux développeurs de créer des sites dynamiques, des applications web et des services web. Il est basé sur le Common Language Runtime, permettant aux programmeurs d\'écrire du code ASP.NET en utilisant n\'importe quel langage .NET.',
        },
        {
            title: 'Docker',
            description: 'Docker est un logiciel libre permettant de lancer des applications dans des conteneurs logiciels. Il a été créé par Solomon Hykes en 2013. Docker est un projet open source bénéficiant de la contribution de la société Docker, Inc et de la communauté.',
        },
        {
            title: 'Kubernetes',
            description: 'Kubernetes est un système open source qui vise à fournir une « plate-forme permettant d\'automatiser le déploiement, la montée en charge et la mise en œuvre de conteneurs d\'application sur des clusters de serveurs ». Il fonctionne avec toute une série de technologies de conteneurisation, et est souvent utilisé avec Docker.',
        },
        {
            title: 'Go',
            description: 'Go est un langage de programmation compilé et concurrent inspiré de C et Pascal. Il a été développé par Google au sein de l\'équipe de Robert Griesemer, Rob Pike et Ken Thompson. Go est un langage compilé, typé et concurrent, inspiré de C et Pascal.',
        },
        {
            title: 'Node.js',
            description: 'Node.js est une plateforme logicielle libre et événementielle en JavaScript orientée vers les applications réseau qui doivent pouvoir monter en charge. Elle utilise la machine virtuelle V8 et implémente sous licence MIT les spécifications CommonJS.',
        },
        {
            title: 'Java',
            description: 'Java est un langage de programmation orienté objet créé par James Gosling et Patrick Naughton, employés de Sun Microsystems, avec le soutien de Bill Joy, présenté officiellement le 23 mai 1995 au SunWorld.',
        },
        {
            title: 'C#',
            description: 'C# est un langage de programmation orienté objet, commercialisé par Microsoft depuis 2002 et destiné à développer sur la plateforme Microsoft .NET. Le langage C# est très proche du Java dont il reprend en grande partie la syntaxe et les concepts.',
        },
    ]

    const formations = [
        {
            title: 'Formation Développeur Web',
            description: 'Formation intensive de 5 mois pour devenir développeur web',
            date: new Date(2023, 9, 1),
        },
        {
            title: 'Formation AWS',
            description: 'Formation intensive de 2 semaines pour passer la certification Cloud Pratictioner',
            date: new Date(2023, 7, 8),
            
        },
        {
            title: 'Formation React',
            description: 'Formation intensive de 2 semaines pour devenir développeur React',
            date: new Date(2023, 10, 14),
        },
        {
            title: 'Formation Docker',
            description: 'Formation de 2 semaines pour poser les bases de Docker',
            date: new Date(2023, 8, 23),
        },
        {
            title: 'Angular, pour aller plus loin',
            description: ' Formation d\'une semaine pour aller plus loin avec Angular',
            date: new Date(2023, 11, 1),
        },
    ];

    const clients = [
        {
            title: 'Airbus',
            email: 'airbus@airbus.fr',
            description: 'Airbus est un constructeur aéronautique européen dont le siège social se trouve à Blagnac, dans la banlieue de Toulouse, en France. Airbus est le principal constructeur aéronautique mondial.',
        },
        {
            title: 'Air France',
            email: 'conact@airfrance.fr',
            description: 'Air France est la compagnie aérienne nationale française. Elle dessert les principaux aéroports français ainsi que de nombreuses destinations à l\'étranger. Elle fait partie du groupe Air France-KLM.',

        },
        {
            title: 'PMU',
            email: 'contact@pmu.fr',
            description: 'Le PMU est une entreprise française de paris hippiques dont les activités sont la conception, la promotion, la commercialisation et le traitement des paris sur les courses de chevaux.',
        },
        {
            title: 'La Poste',
            email: 'contact@laspote.net',
            description: 'La Poste est une entreprise française, principale opérateur postal du pays, à la fois opérateur de services postaux (courrier, colis et express), banque, assurance, opérateur de téléphonie mobile, fournisseur de services numériques et de solutions commerce, collecte et vente de données.',
        },
        {
            title: 'Fnac',
            email: 'contact@fnac.fr',
            description: 'Fnac est une chaîne de magasins française spécialisée dans la distribution de produits culturels et électroniques grand public. Elle est issue de la fusion des chaînes Fnac et Darty.',
        }
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
                niveau: 42,
                updatedAt: new Date(),
                expertise: user.expertise,
                bio: "lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies ultrices, nisl nisl ultricies nisl, nec ultricies nisl nisl nec nisl.",
            },
        });
    }

    for (let i = 4; i <= 40; i++) {
        await prisma.user.create({
            data: {
                email: `user` + i + `@carbon.com`,
                firstname: `user` + i,
                lastname: `user` + i,
                niveau: 10,
                role: 'ROLE_CONSULTANT',
                password: hashedPassword,
                recruitmentAt: new Date(),
                createdAt: new Date(),
                updatedAt: new Date(),
                expertise: "Argile Fragile",
                bio: "lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies ultrices, nisl nisl ultricies nisl, nec ultricies nisl nisl nec nisl.",

            },
        });
    }
    for (let i = 41; i <= 80; i++) {
        await prisma.user.create({
            data: {
                email: `user` + i + `@carbon.com`,
                firstname: `user` + i,
                lastname: `user` + i,
                role: 'ROLE_CONSULTANT',
                niveau: 35,
                password: hashedPassword,
                recruitmentAt: new Date(),
                createdAt: new Date(),
                updatedAt: new Date(),
                expertise: "Terre Cuite",
                bio: "lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies ultrices, nisl nisl ultricies nisl, nec ultricies nisl nisl nec nisl.",

            },
        });
    }
    for (let i = 81; i <= 120; i++) {
        await prisma.user.create({
            data: {
                email: `user` + i + `@carbon.com`,
                firstname: `user` + i,
                lastname: `user` + i,
                role: 'ROLE_CONSULTANT',
                password: hashedPassword,
                recruitmentAt: new Date(),
                createdAt: new Date(),
                niveau: 85,
                updatedAt: new Date(),
                expertise: "Céramique Etincelante",
                bio: "lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies ultrices, nisl nisl ultricies nisl, nec ultricies nisl nisl nec nisl.",

            },
        });
    }
    for (let i = 121; i <= 130; i++) {
        await prisma.user.create({
            data: {
                email: `user` + i + `@carbon.com`,
                firstname: `user` + i,
                lastname: `user` + i,
                role: 'ROLE_CONSULTANT',
                password: hashedPassword,
                recruitmentAt: new Date(),
                createdAt: new Date(),
                niveau: 98,
                updatedAt: new Date(),
                expertise: "Carbon Poli",
                bio: "lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies ultrices, nisl nisl ultricies nisl, nec ultricies nisl nisl nec nisl.",

            },
        });
    }

    for (let client of clients) {
        await prisma.client.create({
            data: {
                title: client.title,
                email: client.email,
                description: client.description,
            },
        });
    }
    
    for (let i = 6; i <= 40; i++) {
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
                link: 'https://medium.com/maxime-olla/les-nouveaut%C3%A9s-de-java-20-bc3ec75ae3ec',
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

    for (let i = 1; i <= 100; i++) {
        await prisma.stage.create({
            data: {
                position:i,
                passId:1,
            },
        });
    }

    for (let i = 1; i <= 100; i+=10) {
        
        await prisma.reward.create({
            data: {
                title: `reward` + i,
                description: i + `Description de la récompense : lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies ultrices, nisl nisl ultricies nisl, nec ultricies nisl nisl nec nisl. Nullam auctor, nisl eget ultricies ultrices, nisl nisl ultricies nisl, nec ultricies nisl nisl nec nisl. Nullam auctor, nisl eget ultricies ultrices, nisl nisl ultricies nisl, nec ultricies nisl nisl nec nisl. Nullam auctor, nisl eget ultricies ultrices, nisl nisl ultricies nisl, nec ultricies nisl nisl nec nisl. Nullam auctor, nisl eget ultricies ultrices, nisl nisl ultricies nisl, nec ultricies nisl nisl nec nisl. Nullam auctor, nisl eget ultricies ultrices, nisl nisl ultricies nisl, nec ultricies nisl nisl nec nisl. Nullam auctor, nisl eget ultricies ultrices, nisl nisl ultricies nisl, nec ultricies nisl nisl nec nisl. Nullam auctor, nisl eget ultricies ultrices, nisl nisl ultricies nisl, nec ultricies nisl nisl nec nisl.` ,
                image: 'https://picsum.photos/200/300',
                stageId: i+9,
            },
        });
    }
    
    for(const technology of techno) {
        await prisma.technology.create({
            data: {
                title: technology.title,
                description: technology.description,
            },
        });
    }
    
    for (let formation of formations) {
        await prisma.formation.create({
            data: {
                title: formation.title,
                description: formation.description,
                date: formation.date,
            },
        });
    }

    for (let i = 1; i <= 12; i++) {
        await prisma.mission.create({
            data: {
                title: `mission` + i,
                description: i + `Description de la mission : lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies ultrices, nisl nisl ultricies nisl, nec ultricies nisl nisl nec nisl.`,
                clientId: i,
            },
        });
    }

    for (let i = 1; i <= 12; i++) {
        await prisma.topic.create({
            data: {
                title: `topic` + i,
                createdById: i+3,
                content: i + `Description du topic : lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies ultrices, nisl nisl ultricies nisl, nec ultricies nisl nisl nec nisl.`,
                note: i + 13,
            },
        });
    }

    for (let i = 1; i <= 4; i++) {
        await prisma.topic.create({
            data: {
                title: `Topic with Client` + i,
                createdById: i+3,
                content: i + `Description du topic : lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies ultrices, nisl nisl ultricies nisl, nec ultricies nisl nisl nec nisl.`,
                note: i + 13,
                clientId: i,
            },
        });
    }

    for (let i = 1; i <= 12; i++) {
        for (let j = 1; j <= 12; j++) {
            await prisma.comment.create({
                data: {
                    content: `comment` + j,
                    topicId: i,
                    createdById: j+2,
                },
            });
        }
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

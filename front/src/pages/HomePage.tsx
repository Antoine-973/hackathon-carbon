import {RewardCard} from '../components/assets/rewardCard';
import {Container, Grid, Stack, Typography,Box} from "@mui/material";
import {useEffect, useState} from "react";
import {FormationServices} from "../services/FormationServices.ts";
import {ArticlesServices} from "../services/ArticlesServices.ts";
import Loader from "../components/loader/Loader.tsx";
import MonCarbonCard from '../components/card/MonCarbonCard';
import Article from "../components/Article";
import CardEvent from "../components/event/CardEvent.tsx";
import CardFormation2 from "../components/formation/CardFormation2";
import CardForum from "../components/card/CardForum.tsx";
import { useAuthContext } from '../providers/AuthProvider';
import { EventServices } from '../services/EventServices';
import { ForumServices } from '../services/ForumServices';
import {Link, useNavigate} from 'react-router-dom';
import {useTheme} from "@mui/material/styles";


export default function HomePage() {

    const {user} = useAuthContext();
    const navigate = useNavigate();
    const theme = useTheme();

    const [formations, setFormations] = useState([]);
    const [article, setArticle] = useState({});
    const [loading, setLoading] = useState(true);
    const [forums, setForums] = useState([]);
    const [events, setEvents] = useState([]);

    useEffect(() => {

        Promise.all([
            FormationServices.getFormations(),
            ArticlesServices.getLast(),
            ForumServices.getAllForums(),
            EventServices.getAllEvents()

        ]).then(([formationsData, articleData, forumsData, eventsData]) => {
            setFormations(formationsData.slice(0, 4));
            setArticle(articleData);
            setForums(forumsData.slice(0, 3));
            setEvents(eventsData.slice(0, 4));
        }).finally(() => {
            setLoading(false);
        });


    },[])

    return (
        loading ? <Loader/> :
        <Container>
            <Grid container spacing={2} >
                <Grid item xs={3} >
                    <MonCarbonCard
                        name={user.firstname + ' ' + user.lastname}
                        expertise={'Carbon Fiber'}
                        level={user?.niveau}
                    />
                </Grid>
                <Grid xs={9} item >
                    <Stack>
                        <Typography sx={{ paddingBottom:2 }}>
                            Les prochaines récompenses
                        </Typography>
                        <Grid item container spaing={2} >
                            <Grid item mr={2} mb={2}>
                                <RewardCard
                                    niveau={'70'}
                                    name={'Sac à dos'}
                                    src={'https://picsum.photos/200/300'}
                                />
                            </Grid>
                            <Grid item mr={2} mb={2}>
                                <RewardCard
                                    niveau={'80'}
                                    name={'100€'}
                                    src={'https://picsum.photos/200/300'}
                                />
                            </Grid>
                            <Grid item mr={2} mb={2}>
                                <RewardCard
                                    niveau={'90'}
                                    name={'Place de cinéma'}
                                    src={'https://picsum.photos/200/300'}
                                />
                            </Grid>
                            <Grid item mr={2} mb={2}>
                                <RewardCard
                                    niveau={'100'}
                                    name={'5 RTT'}
                                    src={'https://picsum.photos/200/300'}
                                />
                            </Grid>
                        </Grid>
                        <Typography sx={{
                            pt:2,
                        }}>
                            Carbon à parler
                        </Typography>
                        <Grid item container spaing={2} >
                            <Grid item mr={2} mb={2}>
                                {
                                    article &&
                                    <Article
                                        link={article.link}
                                        key={article.id}
                                        title={article.title}
                                        description={article.description}
                                        image={article.image}
                                    />
                                }

                            </Grid>
                        </Grid>
                    </Stack>
                </Grid>
                <Grid mb={4} item xs={6}>
                    <Stack>
                        <Typography sx={{ paddingBottom:2 }}>
                            Les regroupements carbon à venir
                        </Typography>
                        <Grid item container spaing={2} >
                            {
                                events && events.length > 0 ? events.map((event) => {
                                    return (
                                        <Grid item mr={2} mb={2} key={event?.id}>
                                            <CardEvent
                                                id={event.id}
                                                title={event.title}
                                                description={event.description}
                                                date={event.date}
                                            />
                                        </Grid>
                                    )
                                }) : <Typography>Aucun événement à venir</Typography>
                            }
                        </Grid>
                        { events && events.length > 0 &&
                            <Link style={{
                                textDecoration: 'none',
                                fontWeight: 'bold',
                                color: theme.palette.info.main
                            }} to={'/evenement'}>Voir tous les regroupements carbon</Link>
                        }
                    </Stack>
                </Grid>
                <Grid mb={4} item xs={6}>
                    <Stack>
                        <Typography sx={{ paddingBottom:2 }}>
                            Evolution des carbon
                        </Typography>

                        <Grid item container spaing={2} >
                            {
                                formations && formations.length > 0 ? formations.map((formation) => {
                                    return (
                                        <Grid item mr={2} mb={2} key={formation.id}>
                                            <CardFormation2
                                                id={formation?.id}
                                                title={formation?.title}
                                                description={formation?.description}
                                                date={new Date(formation?.date)}
                                            />
                                        </Grid>
                                    )
                                }) :
                                    <Typography>
                                        prochainement
                                    </Typography>
                            }
                        </Grid>
                        { formations && formations.length > 0 &&
                            <Link style={{
                                textDecoration: 'none',
                                fontWeight: 'bold',
                                color: theme.palette.info.main
                            }} to={'/formation'}>Voir toutes les évolutions carbon</Link>
                        }
                    </Stack>
                </Grid>
                <Grid item xs={12} >
                    <Stack sx={{mb:8}}>
                        <Typography sx={{paddingBottom:2}}>
                            Carbon Overflow
                        </Typography>
                        <Grid item container  >
                            {
                                forums && forums.length > 0 ? forums.map((forum) => {
                                    return (
                                        <Grid item mr={2}  key={forum?.id}>
                                            <CardForum
                                                title={forum?.title}
                                                author={forum?.createdBy}
                                                repondu={forum?.repondu}
                                                createdAt={new Date(forum?.createdAt)}
                                                action={() => {
                                                    navigate(`/forum/${forum.id}`)
                                                }}
                                            />
                                        </Grid>
                                    )
                                }) :
                                    <Stack>
                                        <Typography>
                                            Aucun carbon overflow pour le moment.
                                        </Typography>
                                        <Link style={{
                                            textDecoration: 'none',
                                            fontWeight: 'bold',
                                            color: theme.palette.info.main
                                        }} to={'/forum'}>
                                            Créer un carbon overflow
                                        </Link>
                                    </Stack>

                            }
                        </Grid>
                        {
                            forums && forums.length > 0 &&
                            <Link style={{
                                textDecoration: 'none',
                                fontWeight: 'bold',
                                color: theme.palette.info.main
                            }} to={'/forum'}>Voir tous les carbon overflow</Link>

                        }
                    </Stack>
                </Grid>
            </Grid>
        </Container>
    )
}
import {CircularStatic} from '../components/assets/progressBar';
import {RewardCard} from '../components/assets/rewardCard';
import {Box, Container, Grid, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import {FormationServices} from "../services/FormationServices";
import {ArticlesServices} from "../services/ArticlesServices";

export default function HomePage() {
    const reward = {
        name: "Récompense 1",
        img: "https://picsum.photos/200/300"
    }

    const nextReward = {
        name: "Récompense 2",
        img: "https://picsum.photos/200/300"
    }

    const [formations, setFormations] = useState([]);
    const [article, setArticle] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        FormationServices.getFormations().then((data) => {
            setFormations(data);
        }).finally(() => {
            setLoading(false);
        });

        ArticlesServices.getLast().then((data) => {
            setArticle(data);
        }).finally(() => {
            setLoading(false);
        });
    },[])

    return (
        loading ? <div>Chargement...</div> :
        <>
            <Grid container spacing={2} style={{marginTop: 100}}>
                <Grid sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'spawce-between',
                    alignItems: 'center',
                }}>
                    <CircularStatic level={10}/>
                    <Grid container spacing={5} justifyContent={'center'}>
                        <Grid item xs={12} md={3}>
                            <RewardCard comingReward={reward}/>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <RewardCard comingReward={nextReward}/>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid sx={{
                marginTop: 10,
                width: '100%',
                height: '47vh',
                display: 'flex',
                backgroundImage: 'url(https://picsum.photos/1920/1080)',
                backgroundSize: 'cover',
                position: 'relative',
            }}>
                <Box sx={{
                    position: 'absolute',
                    bottom: '10%',
                    left: '5%',
                    padding: 2,
                    borderRadius: 10,
                    width: '50vw',
                    height: 'fit-content',
                    backgroundColor: "rgba(255, 255, 255, 0.3)",
                }}>
                    <Typography
                        variant={'h4'}
                        style={{
                            color: '#000000',
                            fontWeight: 'bold',
                        }}>
                        Séminaire de rentrée
                    </Typography>
                    <Typography variant={'p'} sx={{
                        color: '#000000',
                    }}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl sed
                    </Typography>
                </Box>
            </Grid>
            <Container>
                <Grid container sx={{marginTop: 10, width: '100%'}} direction={'row'} >
                    <Grid item sm={12} md={6}>
                        <Typography variant={'h5'} sx={{color: '#282C2B', fontWeight: 'bold'}}>
                            Formation en cours
                        </Typography>
                        <Typography variant={'h6'} sx={{color: '#282C2B'}}>
                            { formations.length > 0 &&  formations[0].title}
                        </Typography>
                        <Typography align={'justify'}>
                            {formations.length > 0 && formations[0].description}
                        </Typography>
                    </Grid>
                    <Grid item sm={0} md={1}></Grid>
                    <Grid item xs={12} md={5}>
                        <img src={"https://picsum.photos/1920/1080"} width={500}/>
                    </Grid>
                </Grid>

                {
                    article && article.title &&
                    <Grid container sx={{marginY: 10, width: '100%'}} direction={'row'}>
                        <Grid item sm={12} md={5}>
                            <img src={article.img} width={500}/>
                        </Grid>
                        <Grid item xs={0} md={1}></Grid>
                        <Grid item xs={12} md={6}>
                            <Typography variant={'h5'} sx={{color: '#282C2B', fontWeight: 'bold', textAlign: 'right'}}>
                                Informations & technologies
                            </Typography>
                            <Typography variant={'h6'} sx={{color: '#282C2B', textAlign: 'right'}}>
                                {article.title}
                            </Typography>
                            <Typography align={'justify'} sx={{textAlign: 'right', marginBottom: '10'}}>
                                {article.description}
                            </Typography>
                            <Typography align={'justify'} style={{textAlign: 'right', fontStyle: "italic"}}>
                                {article.author}
                            </Typography>
                        </Grid>
                    </Grid>

                }
            </Container>

        </>
    )
}
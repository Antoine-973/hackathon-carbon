import {Box, Card, CardMedia, Container, Grid, Typography} from "@mui/material";
import {CardFormation} from "../components/formation/CardFormation";
import {useEffect, useState} from "react";
import {FormationServices} from "../services/FormationServices";
import SideNav from "../components/SideNav/SideNav";
import FilterBar from "../components/filter/FilterBar";
import AliceCarousel from "react-alice-carousel";

interface Formation {
    id: number;
    title: string;
    description: string;
    date: string[];
    participants: Array<string>;
}

const formationConseilles = [
    {
        id: 1,
        title: "Formation 1",
        description: "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
        date: ["2021-10-10", "2021-10-11"],
        participants: ["Participant 1", "Participant 2"]
    },
    {
        id: 2,
        title: "Formation 2",
        description: "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum ",
        date: ["2021-10-10", "2021-10-11"],
        participants: ["Participant 1", "Participant 2"]
    },
    {
        id: 3,
        title: "Formation 3",
        description: "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum ",
        date: ["2021-10-10", "2021-10-11"],
        participants: ["Participant 1", "Participant 2"]
    },
    {
        id: 4,
        title: "Formation 4",
        description: "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum ",
        date: ["2021-10-10", "2021-10-11"],
        participants: ["Participant 1", "Participant 2"]
    }
]

const responsive = {
    0: {items: 1},
    568: {items: 2},
    1024: {items: 3},
};

export const FormationPage = () => {
    const [formations, setFormations] = useState<Formation[]>([])
    const [loading, setLoading] = useState(true);
    const [carousel, setCarousel] = useState({});
    // const [formationConseilles, setFormationConseilles] = useState<Formation[]>([])
  
    useEffect(() => {
        FormationServices.getFormations().then((data) => {
            setFormations(data);
            setLoading(false);
        })
    }, [])

    useEffect(() => {
        setCarousel(
            formationConseilles.map((stage) => {
                return (<>
                        <Card sx={{marginX: 1}}>
                            <CardMedia
                                sx={{height: 250}}
                                image="https://picsum.photos/250/200"
                                title={stage.title}
                            />
                        </Card>
                        <Box style={{marginLeft:10, maxWidth:250}}>
                            <Typography variant="h6" component="h2">
                                {stage.title}
                            </Typography>
                            <Typography color="textSecondary">
                                {stage.date[0]}
                            </Typography>
                            <Typography variant={'p'} style={{width:'100%'}}>
                                {stage.description}
                            </Typography>
                        </Box>
                    </>
                )
            })
        )

    }, [formations])
    return (
        loading ? <div>Chargement...</div> :
            <>
                <Container>
                    <Grid container>
                        <Grid item xs={3}>
                            <SideNav links={[
                                {name: 'Général', path: '/forum'},
                                {name: 'Utilisateur', path: '/forum/user/:id'},
                                {name: 'Client', path: '/forum/client/:id'},
                            ]}/>
                        </Grid>
                        <Grid item xs={9}>
                            {/*<Grid>*/}
                            {/*<FilterBar selectors={''} resetFilter={} handleSearchChange={}/>*/}
                            {/*</Grid>*/}
                            <Grid style={{marginBottom: 40}}>
                                <Typography style={{fontWeight: 'bold', marginBottom:10}} variant={'h6'}>
                                    Conseillé pour vous
                                </Typography>
                                <AliceCarousel
                                    mouseTracking
                                    items={carousel}
                                    responsive={responsive}
                                    controlsStrategy="default"
                                />
                            </Grid>
                            <Box style={{justifyContent: 'center', display: 'flex'}}>
                                <hr style={{width: '60%'}}/>
                            </Box>
                            <Grid>
                                <Typography style={{fontWeight: 'bold'}} variant={'h6'}>
                                    Liste des formations
                                </Typography>
                                <Grid container >
                                    <Grid style={{
                                        display: "grid",
                                        gridTemplateColumns: "repeat(3, 1fr)",
                                        gap: "10px",
                                        gridAutoRows: "minmax(100px, auto)"
                                    }}>
                                        {
                                            formations.map((formation: Formation, key) => {
                                                return (
                                                    <Grid key={key}>
                                                        <CardFormation formation={formation}/>
                                                    </Grid>
                                                )
                                            })
                                        }
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Container>
            </>
    )
}
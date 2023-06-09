import {Box, Card, CardMedia, Container, Grid, Typography} from "@mui/material";
import {CardFormation} from "../../components/formation/CardFormation.tsx";
import {ChangeEvent, useEffect, useState} from "react";
import {FormationServices} from "../../services/FormationServices.tsx";
import SideNav from "../../components/SideNav/SideNav.tsx";
import AliceCarousel from "react-alice-carousel";
import Loader from "../../components/loader/Loader.tsx";
import FilterBar from "../../components/filter/FilterBar";

interface Formation {
    id: number;
    title: string;
    description: string;
    date: string[];
    participants: Array<string>;
}


const responsive = {
    0: {items: 1},
    568: {items: 2},
    1024: {items: 3},
};

export const FormationPage = () => {

    const [formations, setFormations] = useState<Formation[]>([])
    const [loading, setLoading] = useState(true);
    const [carousel, setCarousel] = useState({});

    const [date, setDate] = useState<string[]>([]);
    const [techno, setTechno] = useState<string[]>([]);
    const [niveau, setNiveau] = useState<string[]>([]);
    const [search, setSearch] = useState<string>('');

    const handleDateChange = (event: ChangeEvent<{ value: unknown }>) => {
        setDate(event.target.value as string[]);

    }
    const handleTechnoChange = (event: ChangeEvent<{ value: unknown }>) => {
        setTechno(event.target.value as string[]);
    }
    const handleNiveauChange = (event: ChangeEvent<{ value: unknown }>) => {
        setNiveau(event.target.value as string[]);

    }

    const handleSearchChange = (event) => {
        setSearch(event.target.value) ;
    }

    // const [formationConseilles, setFormationConseilles] = useState<Formation[]>([])
  
    useEffect(() => {
        FormationServices.getFormations().then((data) => {
            setFormations(data);
        }).finally(() => {
            setLoading(false);
        });
    }, [])

    useEffect(() => {
        setCarousel(
            formations.map((stage) => {
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
        loading ? <Loader/> :
                <Container>
                    <Grid container>

                            <SideNav links={[
                                {name: 'Général', path: '/forum'},
                                {name: 'Utilisateur', path: '/forum/user/:id'},
                                {name: 'Client', path: '/forum/client/:id'},
                            ]}/>

                        <Grid item xs={10}>
                            <FilterBar
                                selectors={[
                                    {
                                        title: 'Date',
                                        value: date,
                                        values: ['Date 1', 'Date 2', 'Date 3'],
                                        handleChange: handleDateChange
                                    }, {
                                        title: 'Techno',
                                        value: techno,
                                        values: ['Techno 1', 'Techno 2', 'Techno 3'],
                                        handleChange: handleTechnoChange
                                    }, {
                                        title: 'Niveau',
                                        value: niveau,
                                        values: ['Niveau 1', 'Niveau 2', 'Niveau 3'],
                                        handleChange: handleNiveauChange
                                    }
                                ]}
                                resetFilter={() => {
                                    setDate('');
                                    setTechno('');
                                    setNiveau('');
                                }}
                                handleSearchChange={handleSearchChange}
                            />
                            {/*<Grid>*/}
                            {/*<FilterBar selectors={''} resetFilter={} handleSearchChange={}/>*/}
                            {/*</Grid>*/}
                            <Box style={{marginBottom: 40}}>
                                <Typography style={{fontWeight: 'bold', marginBottom:10}} variant={'h6'}>
                                    Conseillé pour vous
                                </Typography>
                                <AliceCarousel
                                    mouseTracking
                                    items={carousel}
                                    responsive={responsive}
                                    controlsStrategy="default"
                                />
                            </Box>
                            <Box style={{justifyContent: 'center', display: 'flex'}}>
                                <hr style={{width: '60%'}}/>
                            </Box>
                            <Box sx={{
                                pb: 4
                            }}>
                                <Typography style={{fontWeight: 'bold'}} variant={'h6'}>
                                    Liste des formations
                                </Typography>
                                <Grid container >
                                    <Grid item style={{
                                        display: "grid",
                                        gridTemplateColumns: "repeat(3, 1fr)",
                                        gap: "10px",
                                        gridAutoRows: "minmax(100px, auto)"
                                    }}>
                                        {
                                            formations.map((formation: Formation, key) => {
                                                return (
                                                    <Grid key={key}>
                                                        <CardFormation title={formation.title} description={formation.description} date={new Date()}/>
                                                    </Grid>
                                                )
                                            })
                                        }
                                    </Grid>
                                </Grid>
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
    )
}
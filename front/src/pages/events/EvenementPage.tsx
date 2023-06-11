import {Box, Card, CardMedia, Container, Grid, Typography} from "@mui/material";
import {CardEvent2} from "../../components/event/CardEvent2.tsx";
import {ChangeEvent, useEffect, useState} from "react";
import SideNav from "../../components/SideNav/SideNav.tsx";
import AliceCarousel from "react-alice-carousel";
import Loader from "../../components/loader/Loader.tsx";
import FilterBar from "../../components/filter/FilterBar.tsx";
import {EventServices} from "../../services/EventServices.ts";

interface Event {
    id: number;
    title: string;
    description: string;
    date: string;
}


const responsive = {
    0: {items: 1},
    568: {items: 2},
    1024: {items: 3},
};

export const EvenementPage = () => {



    const [evenements, setEvenements] = useState<Event[]>([])
    const [loading, setLoading] = useState(true);
    const [carousel, setCarousel] = useState({});

    const [date, setDate] = useState<string[]>([]);
    const [search, setSearch] = useState<string>('');

    const handleDateChange = (event: ChangeEvent<{ value: unknown }>) => {
        setDate(event.target.value as string[]);

    }


    const handleSearchChange = (event) => {
        setSearch(event.target.value) ;
    }


    useEffect(() => {
        EventServices.getAllEvents().then((data) => {
            setEvenements(data);
        }).catch((error) => {
            console.log(error);
        }).finally(() => {
            setLoading(false);
        }
        );
    }, [])

    useEffect(() => {
        setCarousel(
            evenements.slice(0,5).map((event) => {
                return (
                    <CardEvent2
                        key={event.id}
                        id={event.id}
                        title={event.title}
                        description={event.description}
                        date={new Date(event.date)}
                    />
                )
            })
        )

    }, [evenements])
    return (
        loading ? <Loader/> :
                <Container>
                    <Grid container>

                            <SideNav links={[
                                {name: 'Général', path: '/evenement'},
                            ]}/>

                        <Grid item xs={10}>
                            <FilterBar
                                selectors={[
                                    {
                                        title: 'Date',
                                        value: date,
                                        values: ['Date 1', 'Date 2', 'Date 3'],
                                        handleChange: handleDateChange
                                    },
                                ]}
                                resetFilter={() => {
                                    setDate('');

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
                                    Liste des regroupements
                                </Typography>
                                <Grid container spacing={2}>
                                        {
                                            evenements && evenements.map((event: Event, ) => {
                                                return (
                                                    <Grid item key={event.id}>
                                                        <CardEvent2
                                                            key={event.id}
                                                            id={event.id}
                                                            title={event.title}
                                                            description={event.description}
                                                            date={new Date(event.date)}
                                                        />
                                                    </Grid>
                                                )
                                            })
                                        }
                                </Grid>
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
    )
}
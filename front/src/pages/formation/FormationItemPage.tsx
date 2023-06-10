import FilterBar from "../../components/filter/FilterBar.tsx";
import {ChangeEvent, useEffect, useState} from "react";
import {FormationServices} from "../../services/FormationServices.ts";
import {Box, Button, Container, Divider, Grid, Stack, Typography} from "@mui/material";
import SideNav from "../../components/SideNav/SideNav.tsx";
import {useParams} from "react-router-dom";
import Loader from "../../components/loader/Loader.tsx";
import {useAuthContext} from "../../providers/AuthProvider.tsx";

interface Formation {
    id: number;
    title: string;
    description: string;
    date: Date;
    participants: Array<string>;
}
export default function FormartionItemPage() {

    const id = useParams().id;
    const {user} = useAuthContext();

    const [formation, setFormation] = useState<Formation>([])
    const [loading, setLoading] = useState(true);
    const [carousel, setCarousel] = useState({});

    const [date, setDate] = useState<string[]>([]);
    const [techno, setTechno] = useState<string[]>([]);
    const [niveau, setNiveau] = useState<string[]>([]);
    const [search, setSearch] = useState<string>('');
    const [participe, setParticipe] = useState<boolean>(false);

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

    useEffect(() => {
        if(loading) {
            FormationServices.getFormation(id).then((data) => {
                setFormation(data);
                if( data.participants.find( (particpant) => particpant.id === user.id) )
                    setParticipe(true) ;

            }).finally(() => {
                setLoading(false);
            }) ;
        }

    }, [formation]) ;

    const joinFormation = () => {
        FormationServices.joinFormation(id,user).then((data) => {
            setFormation({...formation, participants: [...formation.participants, user]});
            setParticipe(true) ;
        });
    }

    const leaveFormation = () => {
        FormationServices.leaveFormation(id,user).then((data) => {
            setParticipe(false) ;
            setFormation({...formation,
                participants: formation.participants.filter((participant) => participant.id !== user.id)
            });
        });
    }

    return (
        loading ? <Loader/> :
        <Container>
            <Grid container>
                <SideNav links={[
                    {name: 'Général', path: '/formation'},
                ]}/>
                <Grid item xs={10}>
                    <Stack>
                        <Box display={'flex'} justifyContent={'space-between'}>
                            <Typography componant={'h1'} variant={'h4'}>
                                {formation?.title}
                            </Typography>
                            <Typography componant={'p'} variant={'body1'}>
                                à lieu le : {new Date(formation?.date).toDateString()}
                            </Typography>
                        </Box>
                        <img width={'50%'} height={'250px'} style={{
                            objectFit: 'cover',
                            objectPosition: 'center',
                            margin:'4px 0'
                        }}
                             src="https://cataas.com/cat/says/hello%20world!" alt="Image de la formation"/>
                        <Typography componant={'p'} variant={'body1'}>
                            {formation?.description}
                        </Typography>
                        <Divider sx={{my:4}}/>
                        <Stack >
                            <Box>
                                {

                                    !participe ?
                                        <Button onClick={()=>joinFormation()} sx={{mb:2}} color={'secondary'} variant={'contained'}>
                                            Participer
                                        </Button> :
                                        <Button onClick={()=>leaveFormation()} sx={{mb:2}} color={'secondary'} variant={'contained'}>
                                            Annuler
                                        </Button>
                                }
                            </Box>
                            <Typography componant={'h2'} variant={'h5'}>
                                Participants
                            </Typography>

                            <Stack sx={{mt:1}} direction={'row'} spacing={2}>
                                {formation?.participants.map((participant) => (
                                    <Box key={participant.id} >
                                        <Typography componant={'p'} variant={'body1'}>
                                            {participant.firstname} {participant.lastname}
                                        </Typography>
                                    </Box>
                                ))}
                            </Stack>
                        </Stack>
                    </Stack>

                </Grid>
            </Grid>

        </Container>
    )
}
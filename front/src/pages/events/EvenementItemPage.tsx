import {useEffect, useState} from "react";
import {FormationServices} from "../../services/FormationServices.ts";
import {Box, Button, Container, Divider, Grid, Stack, Typography} from "@mui/material";
import SideNav from "../../components/SideNav/SideNav.tsx";
import {useParams} from "react-router-dom";
import Loader from "../../components/loader/Loader.tsx";
import {useAuthContext} from "../../providers/AuthProvider.tsx";
import {EventServices} from "../../services/EventServices.ts";

interface Event {
    id: number;
    title: string;
    description: string;
    date: Date;
    participants: Array<string>;
}
export default function EvenementItemPage () {

    const id = useParams().id;
    const {user} = useAuthContext();

    const [event, setEvent] = useState<Event>({} as Event)
    const [loading, setLoading] = useState(true);

    const [participe, setParticipe] = useState<boolean>(false);



    useEffect(() => {
        if(loading) {
            EventServices.getEventById(id).then((data) => {
                setEvent(data);
                if( data.participants.find( (particpant) => particpant.id === user.id) )
                    setParticipe(true) ;

            }).finally(() => {
                setLoading(false);
            }) ;
        }

    }, [event]) ;

    const joinFormation = () => {
        EventServices.joinEvent(id,user).then((data) => {
            setEvent({...event, participants: [...event.participants, user]});
            setParticipe(true) ;
        });
    }

    const leaveFormation = () => {
        EventServices.leaveEvent(id,user).then((data) => {
            setParticipe(false) ;
            setEvent({...event,
                participants: event.participants.filter((participant) => participant.id !== user.id)
            });
        });
    }

    return (
        loading ? <Loader/> :
            <Container>
                <Grid container>
                    <SideNav links={[
                        {name: 'Général', path: '/evenement'},
                    ]}/>
                    <Grid item xs={10}>
                        <Stack>
                            <Box display={'flex'} justifyContent={'space-between'}>
                                <Typography componant={'h1'} variant={'h4'}>
                                    {event?.title}
                                </Typography>
                                <Typography componant={'p'} variant={'body1'}>
                                    à lieu le : {new Date(event?.date).toDateString()}
                                </Typography>
                            </Box>
                            <img width={'50%'} height={'250px'} style={{
                                objectFit: 'cover',
                                objectPosition: 'center',
                                margin:'4px 0'
                            }}
                                 src="https://cataas.com/cat/says/hello%20world!" alt="Image de la formation"/>
                            <Typography componant={'p'} variant={'body1'}>
                                {event?.description}
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
                                    { event && event.participants && event?.participants.map((participant) => (
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
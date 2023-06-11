import {Box, Button, Container, Grid, Stack} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import SideNav from "../../components/SideNav/SideNav";
import {SetStateAction, useEffect, useMemo, useState} from "react";
import FilterBar from "../../components/filter/FilterBar";
import CardForum from "../../components/card/CardForum";
import {ForumServices} from "../../services/ForumServices.ts";
import { useModalContext } from "../../providers/ModalProvider";
import NewForum from "../../components/forms/forum/NewForum.tsx";
import {useNavigate} from "react-router-dom";
import Loader from "../../components/loader/Loader";
import {ClientServices} from "../../services/ClientServices.ts";
import {useAuthContext} from "../../providers/AuthProvider.tsx";
import {ROLES} from "../../rooter/permissions.ts";

export default function () {

    const [client,setClient] = useState('');
    const [clientsSearch,setClientsSearch] = useState('') ; // liste des clients pour la recherche [id, nom
    const [techno,setTechno] = useState('');
    const [search,setSearch] = useState('');
    const [forums, setForums] = useState() ;
    const [clients, setClients] = useState() ;
    const [loading, setLoading] = useState(true) ;

    const navigate = useNavigate() ;
    const {user} = useAuthContext() ;
    const {openModal} = useModalContext() ;
    const theme = useTheme() ;

    const handleClientChange = (event: { target: { value: SetStateAction<undefined>; }; }) => {
        setClient(event.target.value);
    }

    const handleSearchChange = (event: { target: { value: SetStateAction<undefined>; }; }) => {
        setSearch(event.target.value);
    }

    useEffect(() => {

       Promise.all([
           ForumServices.getAllForums(),
           ClientServices.getAllClients()
        ]).then(([forumData, clientData]) => {
            // suppression des forums dont le client n'est pas le client du user connecté
            forumData = forumData.filter((forum) => {
                if(user.role === ROLES.ADMIN)
                    return true ;
                if (forum.clientId === null)
                    return true ;

                const clients = user?.missions?.map((mission) => mission.clientId) ;
                if (clients) return clients.includes(forum.clientId) ;

            });

            setForums(forumData);
            const clientsSearch = clientData.map((client) => {
                return client.title ;
            }) ;
            setClientsSearch(clientsSearch) ;
            setClients(clientData);
        }).finally(() => {
           setLoading(false);
       });

    },[]) ;


    const data = useMemo(() => {

        if (client === '' && techno === ''  && search === '')
            return forums ;

        return forums.filter((forum) => {

            if (client !== '' && forum?.client?.title !== client)
                return false ;
            if (techno !== '' && forum.techno !== techno)
                return false ;

            return !(search !== '' && forum.title.toLowerCase().indexOf(search.toLowerCase()) === -1);

        });

    },[client, techno,  search, forums]) ;

    return (
        loading ? <Loader/> :
        <Container>
            <Grid container spacing={2}>
                <SideNav links={[
                    {name:'Général', path:'/forum'},
                    /*{name:'Utilisateur', path:'/forum/user/:id'},
                    {name:'Client', path:'/forum/client/:id'},*/
                ]}/>
                <Grid item xs={10}>
                    <FilterBar
                        selectors={[
                            {
                                title: 'Client',
                                value: client,
                                values: clientsSearch,
                                handleChange: handleClientChange
                            },
                            {
                                title: 'Techno',
                                value: techno,
                                values: ['React', 'Angular', 'Vue'],
                                handleChange: (event: { target: { value: SetStateAction<undefined>; }; }) => {
                                    setTechno(event.target.value);
                                }
                            }

                        ]}
                        resetFilter={() => {
                            setClient('');
                            setTechno('');
                        }}
                        handleSearchChange={(evt) => {setSearch(evt.target.value)}}
                    ></FilterBar>
                    <Box my={2} display={'flex'} justifyContent={'flex-end'}>
                        <Button onClick={() => {
                            openModal({
                                title: 'Demander un carbon',
                                content:
                                   <NewForum clients={clients} forums={forums}/>
                                })
                            }
                        }
                        variant={'contained'} color={'secondary'}>Demander un carbon</Button>
                    </Box>
                    <Stack sx={{my:2}}>
                        {
                            data &&  data.length > 0 && data.map((forum: any) => {
                                return (
                                    <CardForum
                                        client={forum.client}
                                        key={forum.id}
                                        title={forum.title}
                                        createdAt={new Date(forum.createdAt)}
                                        description={forum.content}
                                        author={forum.createdBy}
                                        action={() => {navigate('/forum/' + forum.id)}}
                                        repondu={forum.repondu}
                                    />
                                )
                            })
                        }
                    </Stack>

                </Grid>
            </Grid>
        </Container>
    )
}
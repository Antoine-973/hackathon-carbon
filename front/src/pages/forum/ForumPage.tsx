import {Box, Button, Container, Grid, Stack} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import SideNav from "../../components/SideNav/SideNav";
import {SetStateAction, useEffect, useState} from "react";
import FilterBar from "../../components/filter/FilterBar";
import CardForum from "../../components/card/CardForum";
import {ForumServices} from "../../services/ForumServices.ts";
import { useModalContext } from "../../providers/ModalProvider";
import NewForum from "../../components/forms/forum/NewForum.tsx";
import {useNavigate} from "react-router-dom";
import Loader from "../../components/loader/Loader";

export default function () {

    const [date,setDate] = useState('');
    const [techno,setTechno] = useState('');
    const [tag,setTag] = useState('');
    const [search,setSearch] = useState('');

    const navigate = useNavigate() ;

    const {openModal} = useModalContext() ;

    const handleDateChange = (event: { target: { value: SetStateAction<undefined>; }; }) => {
        setDate(event.target.value);
    }
    const handleTechnoChange = (event: { target: { value: SetStateAction<undefined>; }; }) => {
        setTechno(event.target.value);
    }
    const handleTagChange = (event: { target: { value: SetStateAction<undefined>; }; }) => {
        setTag(event.target.value);
    }
    const handleSearchChange = (event: { target: { value: SetStateAction<undefined>; }; }) => {
        setSearch(event.target.value);
    }



    const theme = useTheme() ;
    const [forums, setForums] = useState() ;
    const [loading, setLoading] = useState(true) ;

    useEffect(() => {

        const getForums = async () => {
            try {
                const res = await ForumServices.getAllForums() ;
                setForums(res) ;
                setLoading(false) ;
            } catch (err) {
                return err ;
                setLoading(false) ;
            }
        }

        getForums() ;


    },[])

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
                                title: 'Date',
                                value: date,
                                values: ['Date 1', 'Date 2', 'Date 3'],
                                handleChange: handleDateChange
                            },
                            {
                                title: 'Techno',
                                value: techno,
                                values: ['Techno 1', 'Techno 2', 'Techno 3'],
                                handleChange: handleTechnoChange
                            },
                            {
                                title: 'Tag',
                                value: tag,
                                values: ['Tag 1', 'Tag 2', 'Tag 3'],
                                handleChange: handleTagChange
                            }
                        ]}
                        resetFilter={() => {
                            setDate('');
                            setTechno('');
                            setTag('');
                        }}
                        handleSearchChange={(evt) => {setSearch(evt.target.value)}}
                    ></FilterBar>
                    <Box my={2} display={'flex'} justifyContent={'flex-end'}>
                        <Button onClick={() => {
                            openModal({
                                title: 'Demander un carbon',
                                content:
                                   <NewForum forums={forums}/>
                                })
                            }
                        }
                        variant={'contained'} color={'secondary'}>Demander un carbon</Button>
                    </Box>
                    <Stack sx={{my:2}}>
                        {
                            forums &&  forums.length > 0 && forums.map((forum: any) => {
                                return (
                                    <CardForum
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
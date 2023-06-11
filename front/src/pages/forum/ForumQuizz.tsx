import {Box, Button, Container, Grid, Stack, Typography} from "@mui/material";
import SideNav from "../../components/SideNav/SideNav";
import ResponseForum from "../../components/ResponseForum.tsx";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {ForumServices} from "../../services/ForumServices";
import {useModalContext} from "../../providers/ModalProvider.tsx";
import NewResponseForm from "../../components/forms/forum/NewResponseForm.tsx";
import Loader from "../../components/loader/Loader.tsx";

interface ForumQuizz {
    chips: string[];
    title: string;
    description: string;
    author: string;
    createdAt: Date;
    ended : boolean;
    reponses: Reponse[];
}

interface Reponse {
    title: string;
    description: string;
    positiveVote: any;
    negativeVote: any;
    valide: boolean;
}


export default function ForumQuizz () {

    const [forum,setForum] = useState(null);
    const [loading, setLoading] = useState(false);

    const params = useParams() ;

    useEffect(() => {
            ForumServices.getForum(params.id).then(res =>
                    setForum(res)
            ).finally(() => setLoading(false));

    },[]);

    const {openModal} = useModalContext() ;

    const addResponse = () => {
        openModal({
            title: 'Répondre à la question',
            content: <NewResponseForm responses={forum.comments} forumId={params.id}/>
        }) ;
    }

    return (
        loading ? <Loader/> : forum &&
        <Container>
            <Grid container spacing={2}>
               <SideNav links={[
                    {name:'Général', path:'/forum'},
                    /*{name:'Utilisateur', path:'/forum/user/:id'},
                    {name:'Client', path:'/forum/client/:id'},*/
                ]}
               />
                <Grid item xs={10}>
                    <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'} sx={{
                        width:'100%',
                    }}>
                        <Typography variant={'h1'} component={'h1'} sx={{
                            fontSize:'2rem',
                        }}>
                            Question du Carbon
                        </Typography>

                    </Box>
                    <Stack sx={{mt:4}}>
                        <Typography variant={'h2'} component={'h2'}
                                    sx={{
                                        fontSize:'1.5rem',
                                        fontWeight:'bold',
                                    }}
                        >
                            {forum.title}
                        </Typography>
                        <Typography sx={{py:4}}>
                            <span dangerouslySetInnerHTML={{__html:forum.content}}></span>
                        </Typography>
                        <Box display={'flex'} justifyContent={'flex-end'}>
                            {forum.createdBy.firstname} {forum.createdBy.lastname} - déposé le {forum.createdAt.toLocaleDateString()}
                        </Box>
                        {
                            forum.comments && forum.comments.map((reponse: Reponse) => {
                                return(
                                    <ResponseForum
                                        key={reponse.id}
                                        id={reponse.id}
                                        valide={reponse.valide}
                                        response={reponse.content}
                                        author={reponse.createdBy}
                                        createdAt={new Date(reponse.createdAt)}
                                        positiveVote={reponse.positiveVote}
                                        negativeVote={reponse.negativeVote}
                                    />
                                )
                            })
                        }
                    </Stack>

                        <Box mt={2} display={'flex'} justifyContent={'flex-end'}>
                            <Button onClick={() => {addResponse()}} variant={'contained'} color={'secondary'}>Répondre</Button>
                        </Box>

                </Grid>
            </Grid>
        </Container>
    )

}
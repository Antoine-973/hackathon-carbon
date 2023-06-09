import { Box, Container, Typography } from "@mui/material";
import { Grid } from "@mui/material";
import {CircularStatic} from '../components/assets/progressBar';
import { useEffect, useState } from "react";
import {FormationServices} from "../services/FormationServices";
import {ArticlesServices} from "../services/ArticlesServices";
import { EvenementServices } from "../services/EvenementServices";

interface Event {
    title: string;
    description: string;
    date: string;
}

export default function EvenementPage() {

    const [formations, setFormations] = useState([]);
    const [evenements, setEvenements] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        FormationServices.getFormations().then((data) => {
            setFormations(data);
        }).finally(() => {
            setLoading(false);
        });

        EvenementServices.getEvenements().then((data) => {
            setEvenements(data);
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
                x
                {
                Array.isArray(evenements) && evenements.map((evenement: Event,key) => {
                    //condition key pair ou impair 
                    const isEven = key % 2 === 0;
                    return(

                        <Grid key={key} container sx={{ marginY: 10, width: '100%' }} direction={'row'}>
            {isEven ? (
                <>
                    <Grid item sm={12} md={5}>
                        <img src={"https://picsum.photos/1920/1080"} width={300} height={300} />
                    </Grid>
                    <Grid item xs={0} md={1}></Grid>
                    <Grid item xs={12} md={6}>
                        <Typography variant={'h5'} sx={{ color: '#282C2B', fontWeight: 'bold', textAlign: 'left' }}>
                            Informations & technologies
                        </Typography>
                        <Typography variant={'h6'} sx={{ color: '#282C2B', textAlign: 'left' }}>
                            {evenement.title}
                        </Typography>
                        <Typography align={'justify'} sx={{ textAlign: 'left', marginBottom: '10' }}>
                            {evenement.description}
                        </Typography>
                    </Grid>
                </>
            ) : (
                <>
                    <Grid item xs={12} md={6}>
                        <Typography variant={'h5'} sx={{ color: '#282C2B', fontWeight: 'bold', textAlign: 'right' }}>
                            Informations & technologies
                        </Typography>
                        <Typography variant={'h6'} sx={{ color: '#282C2B', textAlign: 'right' }}>
                            {evenement.title}
                        </Typography>
                        <Typography align={'justify'} sx={{ textAlign: 'right', marginBottom: '10' }}>
                            {evenement.description}
                        </Typography>
                    </Grid>
                    <Grid item xs={0} md={1}></Grid>
                    <Grid item sm={12} md={5}>
                        <img src={"https://picsum.photos/1920/1080"} width={300} height={300} />
                    </Grid>
                </>
            )}
        </Grid>
                    )
                })
                }


            </Container>
        </Grid>        

    </>
)

}
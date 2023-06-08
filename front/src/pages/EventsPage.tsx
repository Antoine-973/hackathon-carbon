import { Box, Container, Typography } from "@mui/material";
import { Grid } from "@mui/material";
import {CircularStatic} from '../components/assets/progressBar';

export default function EventsPage() {



return (
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
        </Grid>        

    </>
)

}
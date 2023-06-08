import {Container, Box, Grid, Typography, Chip, Stack, Button} from "@mui/material";
import SideNav from "../../components/SideNav/SideNav";

interface ForumQuizz {
    chips: string[];
    title: string;
    description: string;
    author: string;
    createdAt: Date;
    ended : boolean;
}
export default function ForumQuizz ({chips = ['chip 1'], title = "Test topic j'ai besoin d'aide", description = "lorem lorem lorem lorem lorem lorem lorem lorem lorem loremloremlorem lorem loremlorem lorem lorem", createdAt = new Date(), author = "JE suis l'authour", ended = false} : ForumQuizz) {

    return (
        <Container>
            <Grid container spacing={2}>
               <SideNav links={[
                    {name:'Général', path:'/forum'},
                    {name:'Utilisateur', path:'/forum/user/:id'},
                    {name:'Client', path:'/forum/client/:id'},
                ]}
               />
                <Box item xs={10}>
                    <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'} sx={{
                        width:'100%',
                    }}>
                        <Typography variant={'h1'} component={'h1'} sx={{
                            fontSize:'2rem',
                        }}>
                            Question du Carbon
                        </Typography>
                        {
                            chips && chips.map((chip: string) => {
                                return (
                                    <Chip
                                        key={chip}
                                        label={chip}
                                        color={'secondary'}
                                        size={'small'}
                                    />
                                )
                            })
                        }
                    </Box>
                    <Stack sx={{mt:4}}>
                        <Typography variant={'h2'} component={'h2'}
                                    sx={{
                                        fontSize:'1.5rem',
                                        fontWeight:'bold',
                                    }}
                        >
                            {title}
                        </Typography>
                        <Typography sx={{py:4}}>
                            {description}
                        </Typography>
                        <Box display={'flex'} justifyContent={'flex-end'}>
                            {author} - déposé le {createdAt.toLocaleDateString()}
                        </Box>
                    </Stack>
                    {
                        !ended &&
                        <Box mt={2} display={'flex'} justifyContent={'flex-end'}>
                            <Button variant={'contained'} color={'secondary'}>Répondre</Button>
                        </Box>
                    }
                </Box>
            </Grid>
        </Container>
    )

}
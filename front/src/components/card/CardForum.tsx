import {Box, Card, CardActionArea, CardContent, Chip, Stack, Typography, useTheme} from "@mui/material";

interface Forum {
    title: string;
    author: string;
    createdAt: Date;
    repondu: boolean;
    action: Function;
    client: Client;
}
interface Client {
    title: string;
    description: string;
    id: number;
}
export default function CardForum({title,  client,  author, createdAt, repondu, action}: Forum) {


    return (
        <Card sx={{
            minWidth:'300px',
            width: '100%',
            height: '100px',
            mb:2,
            background: "linear-gradient(150deg, rgba(255,255,255,1) 0%, rgba(40,44,43,0.5) 100%)"
        }}>
            <CardActionArea onClick={() =>action()}>
                <CardContent>
                    <Stack>
                        <Typography variant={'h5'} component={'h2'}>
                            {title}
                        </Typography>

                        <Box mt={2} display={'flex'} justifyContent={'flex-end'}>
                            <Box display={'flex'}>
                                {
                                    repondu &&
                                    <Chip
                                        sx={{mr:1}}
                                        label={'Répondu'}
                                        color={'success'}
                                        size={'small'}
                                    />
                                }
                            </Box>
                            {
                                client &&
                                <Typography sx={{mr:2, fontWeight: 'bold'}} variant={'caption'} >
                                   Client - {client?.title}
                                </Typography>
                            }
                            <Typography variant={'caption'} >
                                {author?.firstname} {author?.lastname} - déposé le { createdAt && createdAt?.toLocaleDateString()}
                            </Typography>
                        </Box>
                    </Stack>
                </CardContent>
            </CardActionArea>
        </Card>
    )

}
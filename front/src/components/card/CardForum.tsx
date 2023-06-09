import {Box, Card, CardActionArea, CardContent, Chip, Stack, Typography, useTheme} from "@mui/material";

interface Forum {
    title: string;
    description: string;
    author: string;
    createdAt: Date;
    repondu: boolean;
    action: Function;
}
export default function CardForum({title, description,  author, createdAt, repondu, action}: Forum) {


    return (
        <Card sx={{
            width: '100%',
            mb:4,
            background: "linear-gradient(150deg, rgba(255,255,255,1) 0%, rgba(40,44,43,0.5) 100%)"
        }}>
            <CardActionArea onClick={() =>action()}>
                <CardContent>
                    <Stack>
                        <Typography variant={'h5'} component={'h2'}>
                            {title}
                        </Typography>
                        <span dangerouslySetInnerHTML={{__html: description}}>
                        </span>
                        <Box mt={2} display={'flex'} justifyContent={'space-between'}>
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
                            <Typography >
                                {author?.firstname} {author?.lastname} - déposé le { createdAt && createdAt?.toLocaleDateString()}
                            </Typography>
                        </Box>
                    </Stack>
                </CardContent>
            </CardActionArea>
        </Card>
    )

}
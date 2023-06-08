import {Card, CardContent, CardHeader, Typography, Stack, Box, Chip, CardActionArea} from "@mui/material";

interface Forum {
    title: string;
    description: string;
    chips: string[];
    author: string;
    createdAt: Date;
    repondu: boolean;
    action: () => void;
}
export default function CardForum({title, description, chips, author, createdAt, repondu, action}: Forum) {

    return (
        <Card sx={{
            width: '100%',
            mb:4
        }}>
            <CardActionArea onClick={action}>
                <CardContent>
                    <Stack>
                        <Typography variant={'h5'} component={'h2'}>
                            {title}
                        </Typography>
                        <Typography>
                            {description}
                        </Typography>
                        <Box mt={2} display={'flex'} justifyContent={'space-between'}>
                            <Box display={'flex'}>
                                {
                                    repondu &&
                                    <Chip
                                        label={'Répondu'}
                                        color={'success'}
                                        size={'small'}
                                    />
                                }
                                {
                                    chips.map((chip: string) => {
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
                            <Typography>
                                {author} - déposé le {createdAt.toLocaleDateString()}
                            </Typography>
                        </Box>
                    </Stack>
                </CardContent>
            </CardActionArea>
        </Card>
    )

}
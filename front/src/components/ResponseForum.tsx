import {Typography, Box, Stack, Divider, IconButton, useTheme, Badge} from "@mui/material";
import {ThumbUp,ThumbDown} from "@mui/icons-material";

export default function ({valide, response, author, createdAt, negativeVote, positiveVote}: {valide: boolean, response: string, author: string, createdAt: Date, positiveVote: number, negativeVote: number}) {

    const theme = useTheme() ;

    return (
        <Stack sx={{
            my:2,
            border: valide && '1px solid green'  ,
        }}>
            {
                !valide &&
                <Divider sx={{my:1}}/>
            }
            <Typography>
                <span
                    dangerouslySetInnerHTML={{__html: response}}
                >

                </span>
            </Typography>
            <Box mt={2} display={'flex'} justifyContent={'flex-end'}>
                {author?.firstname} {author?.lastname} - déposé le {createdAt.toLocaleDateString()}
            </Box>
            <Box alignItems={'center'}  mt={1} display={'flex'} justifyContent={'flex-end'} >
                <IconButton sx={{color: theme.palette.success.main}}>
                        <ThumbUp/>
                </IconButton>
                <Typography >
                    {positiveVote}
                </Typography>

                <IconButton sx={{color: theme.palette.secondary.main}}>
                        <ThumbDown/>
                </IconButton>
                <Typography>
                    {negativeVote}
                </Typography>
            </Box>
        </Stack>
    )

}
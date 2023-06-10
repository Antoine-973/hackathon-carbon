import {Box,Stack,Typography} from "@mui/material";
import {useTheme} from "@mui/material/styles";

export default function CardEvent({date,title, description}: {date: Date, title: string, description: string}) {
    const theme = useTheme();
    return (
        <Box
            sx={{
                backgroundColor: theme.palette.info.main,
                borderRadius: '10px',
                Width: '200px',
                px:2,
                py:2,
                cursor: 'pointer',
                border: '1px solid ' + theme.palette.secondary.main,
                boxShadow: '0px 5px 8px 0px ' + theme.palette.secondary.main,
            }}
        >
            <Stack alignItems={'center'}>
                <Typography variant={'caption'} sx={{pb:2}}>
                    {new Date(date).toLocaleDateString()}
                </Typography>
                <Typography fontWeight={'bold'} >
                    {title}
                </Typography>
                <Typography sx={{
                    textAlign: 'center',
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    width: '200px',
                }}>
                    {description}
                </Typography>
            </Stack>


        </Box>
    )
}
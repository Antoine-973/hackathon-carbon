import {Box,Stack,Typography} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import {useNavigate} from "react-router-dom";

export default function CardEvent({id,date,title, description}: {id:number, date: Date, title: string, description: string}) {
    const theme = useTheme();
    const navigate = useNavigate();
    return (
        <Box
            onClick={() => {
                navigate(`/evenement/${id}`)
            }}
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
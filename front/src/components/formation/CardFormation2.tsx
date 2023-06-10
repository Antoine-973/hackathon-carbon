import {Box, useTheme,Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";

export default function CardFormation2 ({id,date, title, description}: {id:number,date: Date, title: string, description: string}) {

    const theme = useTheme();
    const navigate = useNavigate();

    return (
        <Box
            onClick={()=> {
                navigate(`/formation/${id}`)
            }}
            sx={{
            border:'1px solid ' + theme.palette.info.main,
            borderRadius: '5px',
            minWidth: '200px',
            color: theme.palette.secondary.main,
            cursor: 'pointer',
        }}>
            <img style={{width:'100%', borderTopRightRadius:'5px', borderTopLeftRadius:'5px'}}  src="https://picsum.photos/250/75" alt="Formation"/>
            <Box sx={{
                px:2,
                pb:2
            }}>
                <Typography>
                    {date.toLocaleDateString()} - {title}
                </Typography>
                <Typography variant={'caption'}>
                    {description}
                </Typography>
            </Box>
        </Box>

    )
}
import {Box, useTheme,Typography} from "@mui/material";

export default function CardEvent3 ({date, title, description}: {date: Date, title: string, description: string}) {

    const theme = useTheme();

    return (
        <Box sx={{
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
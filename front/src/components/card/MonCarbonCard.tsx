import {Box, Stack, Typography} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import {CircularStatic} from "../assets/progressBar.tsx";

export default function MonCarbonCard({name,expertise, level}: {name: string, expertise: string, level: number}) {

    const theme = useTheme();

    return (
        <Box
            sx={{
                backgroundColor: theme.palette.secondary.main,
                color: theme.palette.primary.main,
                borderRadius: 2,
                padding: 4,
                display:'flex',
                flexDirection:'column',
                justifyContent:'center',
                alignItems:'center',
            }}
        >
            <img width={100} height={100}
                src="/profil.png" alt="Imagine User"/>
            <Typography sx={{mt:1}}>
                {name}
            </Typography>
            <Typography variant={'caption'}>
                {expertise}
            </Typography>
            <Stack mt={2} alignItems={'center'}>
                <Typography >
                    Mon Carbon Pass
                </Typography>
                <CircularStatic level={level}/>
            </Stack>
        </Box>
    )
}
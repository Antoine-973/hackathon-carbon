import {Grid, Box,Stack, useTheme, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import {CircularStatic} from "../assets/progressBar";

interface Links {
    name: string;
    path: string;
}
export default function SideNav ({links}: {links?: Links[]}){

    const theme = useTheme() ;

    return (
        <Grid item xs={2}>
            <Stack sx={{
                position: 'fixed',
            }}>
                <Box display={'flex'} width={'100%'}>
                    <CircularStatic
                        level={80}
                    />
                </Box>

                <Typography variant={'h4'} component={'p'} >
                    Accueil
                </Typography>
                {
                    links && links.length > 0 && links.map((link: Link)  => (
                        <Link  key={link.name} style={{
                            textDecoration: 'none',
                            marginLeft: 12,
                            marginTop: 8,
                            color: theme.palette.secondary.main,
                        }}
                                to={link.path}
                        >
                            {link.name}
                        </Link>
                    ))
                }
            </Stack>
        </Grid>
    )
}
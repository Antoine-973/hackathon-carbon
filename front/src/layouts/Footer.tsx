import {Grid, Stack, Typography} from "@mui/material";
import logo from "../../public/logo-blanc.png";
import linkedin from "../../public/linkdin.png";
import instagram from "../../public/insta.png";
import twitter from "../../public/twitter.png";
import m from "../../public/m.png";
import {CardFooter} from "../components/cardFooter";
import {useTheme} from "@mui/material/styles";
import Box from "@mui/material/Box";

export default function Footer() {

    const theme = useTheme();

    return (
        <>
            <Grid display={'flex'} spacing={4}  alignItems={'flex-start'} container sx={{backgroundColor: theme.palette.secondary.main, py:4, mt:4}}>
                <Grid item xs={12} md={3}>
                    <Box>
                        <img src={logo} width={'75%'} style={{
                            marginTop: 20,
                            marginLeft: 10,
                            marginBottom: 10,
                        }}/>

                        <Box display={'flex'}>
                            <img src={linkedin} width={20} style={{marginLeft: 22}}/>
                            <img src={instagram} width={20} style={{marginLeft: 10}}/>
                            <img src={twitter} width={20} style={{marginLeft: 10}}/>
                            <img src={m} width={20} style={{marginLeft: 10}}/>
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={12} md={3}
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                    }}
                >
                    <Typography color={'#ffffff'} sx={{marginTop: 1, fontSize: '0.90rem'}}>
                        131 avenue Charles de Gaulle - Hall A 92 200 Neuilly-sur-Seine
                    </Typography>
                    <Typography color={'#d9d9d9'} sx={{marginTop: 1, fontSize: '0.90rem'}}>
                        Métro ligne 1 : Les Sablons Bus ligne 73 : Hôtel de Ville
                    </Typography>
                    <Typography color={'#ffffff'} sx={{marginTop: 1, fontSize: '0.90rem'}}>
                        Rh.contact @carbon-it.fr T. 01 80 87 51 42
                    </Typography>
                    <Typography color={'#d9d9d9'} sx={{marginTop: 1, fontSize: '0.90rem'}}>
                        Commerciaux.contact @carbon-it.fr T. 01 80 87 51 42
                    </Typography>
                </Grid>
                <Grid item container  xs={12} md={6}>
                    <Grid container item>
                        <Grid item xs={6} >
                            <CardFooter
                                title={'Nos évènements'}
                                firstLink={"M’inscrire pour les prochains"}
                                secondLink={"Rattrape ce que tu as loupé"}
                            />
                        </Grid>
                        <Grid item xs={6} >
                            <CardFooter
                                title={'Formation'}
                                firstLink={"M’inscrire pour les prochains"}
                                secondLink={"Rattrape ce que tu as loupé"}
                            />
                        </Grid>
                    </Grid>
                    <Grid container item>
                        <Grid item xs={6} >
                            <CardFooter
                                title={'Le forum'}
                                firstLink={"M’inscrire pour les prochains"}
                                secondLink={"Rattrape ce que tu as loupé"}
                            />
                        </Grid>

                        <Grid item xs={6} >
                            <CardFooter
                                title={'Mon profil'}
                                firstLink={"M’inscrire pour les prochains"}
                                secondLink={"Rattrape ce que tu as loupé"}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    )

}
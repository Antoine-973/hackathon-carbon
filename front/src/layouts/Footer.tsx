import {Grid, Stack, Typography} from "@mui/material";
import logo from "../../public/logo-blanc.png";
import linkedin from "../../public/linkdin.png";
import instagram from "../../public/insta.png";
import twitter from "../../public/twitter.png";
import m from "../../public/m.png";
import {CardFooter} from "../components/cardFooter";

export default function Footer() {

    return (
        <>
            <Grid container direction={"row"} style={{backgroundColor: "#282C2B", padding: 10}}>
                <Grid item xs={4}>
                    <Grid>
                        <img src={logo} width={400} style={{
                            marginTop: 20,
                            marginLeft: 10,
                            marginBottom: 10,
                        }}/>
                    </Grid>
                    <Grid>
                        <img src={linkedin} width={20} style={{marginLeft: 22}}/>
                        <img src={instagram} width={20} style={{marginLeft: 10}}/>
                        <img src={twitter} width={20} style={{marginLeft: 10}}/>
                        <img src={m} width={20} style={{marginLeft: 10}}/>
                    </Grid>
                </Grid>
                <Grid item xs={2} style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    marginRight: 50,
                }}>
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
                <Grid item xs={5}>
                    <Grid container >
                        <CardFooter
                            title={'Nos évènements'}
                            firstLink={"M’inscrire pour les prochains"}
                            secondLink={"Rattrape ce que tu as loupé"}
                        />
                        <CardFooter
                            title={'Formation'}
                            firstLink={"M’inscrire pour les prochains"}
                            secondLink={"Rattrape ce que tu as loupé"}
                        />
                        <CardFooter
                            title={'Le forum'}
                            firstLink={"M’inscrire pour les prochains"}
                            secondLink={"Rattrape ce que tu as loupé"}
                        />
                        <CardFooter
                            title={'Mon profil'}
                            firstLink={"M’inscrire pour les prochains"}
                            secondLink={"Rattrape ce que tu as loupé"}
                        />
                    </Grid>
                </Grid>
            </Grid>
        </>
    )

}
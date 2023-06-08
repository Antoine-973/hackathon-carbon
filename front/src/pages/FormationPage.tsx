import {Box, Container, Grid, Typography} from "@mui/material";
import {CardFormation} from "../components/formation/CardFormation";
import {useEffect, useState} from "react";
import {FormationServices} from "../services/FormationServices";

interface Formation {
    id: number;
    title: string;
    description: string;
    date: string[];
    participants: Array<string>;
}

const formationConseilles = [
    {
        id: 1,
        title: "Formation 1",
        description: "Description 1",
        date: ["2021-10-10", "2021-10-11"],
        participants: ["Participant 1", "Participant 2"]
    },
    {
        id: 2,
        title: "Formation 2",
        description: "Description 2",
        date: ["2021-10-10", "2021-10-11"],
        participants: ["Participant 1", "Participant 2"]
    },
    {
        id: 3,
        title: "Formation 3",
        description: "Description 3",
        date: ["2021-10-10", "2021-10-11"],
        participants: ["Participant 1", "Participant 2"]
    }
]

export const FormationPage = () => {
    const [formations, setFormations] = useState<Formation[]>([])
    const [loading, setLoading] = useState(true);
    console.log(formations)
    useEffect(() => {
        FormationServices.getFormations().then((data) => {
            setFormations(data);
            setLoading(false);
        })
    },[])
    // const [formationConseilles, setFormationConseilles] = useState<Formation[]>([])
    return (
        loading ? <div>Chargement...</div> :
        <>
            <Container>
                <Grid container>
                    <Grid item xs={3}>

                    </Grid>
                    <Grid item xs={9}>
                        <Box style={{justifyContent: 'center', display: 'flex'}}>
                            <hr style={{width: '60%'}}/>
                        </Box>
                        <Typography style={{fontWeight: 'bold'}} variant={'h6'}>
                            Conseillé pour vous
                        </Typography>
                        <Grid
                            spacing={3}
                            justifyContent="center"
                            alignItems="stretch"
                        >
                            {
                                formationConseilles.map((formationConseille: Formation, key) => {
                                    return (
                                        <Grid key={key} style={{}}>
                                            <CardFormation formation={formationConseille}/>
                                        </Grid>

                                    )
                                })
                            }
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}
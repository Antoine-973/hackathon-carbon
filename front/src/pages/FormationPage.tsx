import {Box, Container, Grid, Typography} from "@mui/material";
import {CardFormation} from "../components/formation/CardFormation";
import {useEffect, useState} from "react";
import {FormationServices} from "../services/FormationServices";
import SideNav from "../components/SideNav/SideNav";
import FilterBar from "../components/filter/FilterBar";

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
        description: "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
        date: ["2021-10-10", "2021-10-11"],
        participants: ["Participant 1", "Participant 2"]
    },
    {
        id: 2,
        title: "Formation 2",
        description: "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum ",
        date: ["2021-10-10", "2021-10-11"],
        participants: ["Participant 1", "Participant 2"]
    },
    {
        id: 3,
        title: "Formation 3",
        description: "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum ",
        date: ["2021-10-10", "2021-10-11"],
        participants: ["Participant 1", "Participant 2"]
    },
    {
        id: 4,
        title: "Formation 4",
        description: "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum ",
        date: ["2021-10-10", "2021-10-11"],
        participants: ["Participant 1", "Participant 2"]
    }
]

export const FormationPage = () => {
    const [formations, setFormations] = useState<Formation[]>([])
    const [loading, setLoading] = useState(true);

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
                        <SideNav links={[
                            {name:'Général', path:'/forum'},
                            {name:'Utilisateur', path:'/forum/user/:id'},
                            {name:'Client', path:'/forum/client/:id'},
                        ]}/>
                    </Grid>
                    <Grid item xs={9}>
                        {/*<Grid>*/}
                            {/*<FilterBar selectors={''} resetFilter={} handleSearchChange={}/>*/}
                        {/*</Grid>*/}
                        <Grid style={{marginBottom:40}}>
                            <Typography style={{fontWeight: 'bold'}} variant={'h6'}>
                                Conseillé pour vous
                            </Typography>
                            <Grid
                                display="flex"
                                direction="row"
                                justifyContent="space-around"
                            >
                                {
                                    formationConseilles.map((formationConseille: Formation, key) => {
                                        return (
                                            <Grid key={key} style={{
                                                maxWidth: 250,
                                            }}>
                                                <CardFormation formation={formationConseille}/>
                                            </Grid>

                                        )
                                    })
                                }
                            </Grid>
                        </Grid>
                        <Box>
                            <Box style={{justifyContent: 'center', display: 'flex'}}>
                                <hr style={{width: '60%'}}/>
                            </Box>
                            <Typography style={{fontWeight: 'bold'}} variant={'h6'}>
                                Liste des formations
                            </Typography>
                            <Grid
                                display="flex"
                                direction="row"
                                justifyContent="space-around"
                                alignItems="stretch"
                            >
                                {
                                    formations.map((formation: Formation, key) => {
                                        return (
                                            <Grid key={key} style={{}}>
                                                <CardFormation formation={formation}/>
                                            </Grid>

                                        )
                                    })
                                }
                            </Grid>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}
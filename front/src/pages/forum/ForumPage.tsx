import {Container, Grid} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import SideNav from "../../components/SideNav/SideNav";

export default function () {

    const theme = useTheme() ;

    return (
        <Container>
            <Grid container spacing={2}>
                <SideNav links={[
                    {name:'Général', path:'/forum'},
                    {name:'Utilisateur', path:'/forum/user/:id'},
                    {name:'Client', path:'/forum/client/:id'},
                ]}/>
                <Grid item xs={10}>

                </Grid>
            </Grid>
        </Container>
    )
}
import {Card, CardContent, Grid, Typography} from "@mui/material";

interface Formation {
    id: number;
    title: string;
    description: string;
    date: string[];
    participants: Array<string>;
}

export const CardFormation = ({formation}: { formation: Formation }) => {
    return (
        <Grid style={{margin:20}}>
            <img src={"https://picsum.photos/250/200"}/>
            <Typography variant="h6" component="h2">
                {formation.title}
            </Typography>
            <Typography color="textSecondary">
                {formation.date[0]}
            </Typography>
            <Typography variant={'p'} style={{width:'100%'}}>
                {formation.description}
            </Typography>
        </Grid>
    );
}
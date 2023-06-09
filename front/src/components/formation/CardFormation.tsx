import {Card, CardContent, Grid, Typography} from "@mui/material";

interface Formation {
    title: string;
    description: string;
    date: Date;
}

export const CardFormation = ({title, date, description}: Formation) => {
    return (
        <Grid style={{margin:20}}>
            <img src={"https://picsum.photos/250/200"}/>
            <Typography variant="h6" component="h2">
                {title}
            </Typography>
            <Typography color="textSecondary">
                {date.toLocaleDateString()}
            </Typography>
            <Typography variant={'p'} style={{width:'100%'}}>
                {description}
            </Typography>
        </Grid>
    );
}
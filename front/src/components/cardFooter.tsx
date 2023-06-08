import {Grid, Typography} from "@mui/material";

interface CardFooterProps {
    title: string;
    firstLink?: string;
    secondLink?: string;
}

export const CardFooter = (props:CardFooterProps ) => {

    const {title, firstLink, secondLink} = props;

    return(
        <Grid item xs={6} style={{marginBottom:15}}>
            <Typography component={'h4'} variant={'h6'} color={"#E53F49"}>
                {title}
            </Typography>
            <Typography>
                <a href={''} style={{
                    color: '#ffffff',
                    textDecoration: 'none',
                    fontSize: '0.90rem',
                }}>
                    {firstLink}
                </a>
            </Typography>
            <Typography>
                <a href={''} style={{
                    color: '#ffffff',
                    textDecoration: 'none',
                    fontSize: '0.90rem',
                }}>
                    {secondLink}
                </a>
            </Typography>
        </Grid>
    )
}
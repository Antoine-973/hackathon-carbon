import {Card, CardActionArea, CardContent, CardHeader, CardMedia, Grid, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";

interface Formation {
    title: string;
    description: string;
    date: Date;
    id: number;
}

export const CardFormation = ({id, title, date, description}: Formation) => {

    const navigate = useNavigate();

    return (
        <Card  sx={{
            m:2,
            width: '250px',
        }}>
            <CardActionArea sx={{
                width: '100%',
                height:'300px',
            }} onClick={() => {
                navigate(`/formation/${id}`)
            }}>
                <CardHeader
                    title={title}
                />
                <CardMedia
                    component="img"
                    height={100}
                    width={250}
                    image="https://picsum.photos/200/100"
                />
                <CardContent>

                    <Typography color="textSecondary">
                        {date.toLocaleDateString()}
                    </Typography>
                    <Typography  style={{width:'100%'}}>
                        {description}
                    </Typography>
                </CardContent>
            </CardActionArea>

        </Card>

    );
}
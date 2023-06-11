import {Card, CardMedia,CardActionArea, CardContent, Grid, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";

interface Event {
    title: string;
    description: string;
    date: Date;
    id: number;
}

export const CardEvent2 = ({id,title, date, description}: Event) => {
    const navigate = useNavigate();
    return (
        <Card sx={{
            m:2,
            width: '250px',
        }}>
            <CardActionArea sx={{
                width: '100%',
                height:'300px',
            }} onClick={() => {
                navigate(`/evenement/${id}`);
            }}>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {title}
                    </Typography>
                    <CardMedia
                        sx={{
                            mb:2,
                        }}
                        component="img"
                        height={100}
                        width={250}
                        image="https://picsum.photos/200/100"
                    />
                    <Typography variant="body2" color="textSecondary" component="p">
                        {date.toLocaleDateString()}
                    </Typography>
                    <Typography sx={{
                       overflow: 'hidden',
                        position: 'relative',
                        maxHeight: '4.5em',
                        "&::after": {
                            content: '""',
                            position: 'absolute',
                            right: 0,
                            width: '1em',
                            height: '1em',
                        },
                        "&::before": {
                            content: '"..."',
                            position: 'absolute',
                            right: 0,
                            bottom: 0,
                        }
                    }} variant="body2" color="textSecondary" component="p">
                        {description}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>

    );
}
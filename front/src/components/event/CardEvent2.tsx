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
        <Card sx={{m:2}}>
            <CardActionArea sx={{
                minWidth: '250px',
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
                        height="50px"
                        width="100%"
                        image={"https://picsum.photos/200/50" }
                        alt="Image de l'event"
                    />
                    <Typography variant="body2" color="textSecondary" component="p">
                        {date.toLocaleDateString()}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {description}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>

    );
}
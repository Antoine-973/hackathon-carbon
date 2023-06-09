import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import {Card, CardContent, CardMedia, Grid, Typography} from "@mui/material";

interface Pass {
    startAt: Date,
    endAt: Date,
    title: string,
    stages: Stage[]
}

interface Stage {
    position: number,
    rewards: Reward[]
}

interface Reward {
    title: string,
    image: string
    description: string
}

export default function CarbonPass({pass}: Pass) {

    const responsive = {
        0: {items: 1},
        568: {items: 2},
        1024: {items: 10},
    };

    const items =() => {
        if (pass) {
            if (pass.stages) {
                return pass.stages.map((stage: Stage) => {
                    return (
                        <Grid container direction={"column"} gap={1}>
                            <Card sx={{marginX: 1}}>
                                <CardMedia
                                    sx={{height: 100}}
                                    image="https://picsum.photos/100"
                                    title="Stage Reward"
                                />
                                <CardContent>
                                    <Typography  variant="caption">
                                        {stage && stage.rewards  && stage.rewards.length > 0 ? stage.rewards[0].title : ""}
                                    </Typography>
                                </CardContent>
                            </Card>
                            <Card sx={{display: "flex", justifyContent:"center", marginX: 1}}>
                                {stage.position}
                            </Card>
                        </Grid>
                    )
                });
            }
        }
        return [] ;
    }

    return (
        <AliceCarousel
            mouseTracking
            items={ pass && pass.stages && pass.stages.length > 0 ? items() : []}
            responsive={responsive}
            controlsStrategy="alternate"
        />
    );
}

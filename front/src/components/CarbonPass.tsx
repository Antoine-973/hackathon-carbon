import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import {Card, CardContent, CardMedia, Grid, Typography} from "@mui/material";

export default function CarbonPass() {

    const responsive = {
        0: {items: 1},
        568: {items: 2},
        1024: {items: 10},
    };

    const carbonPass = {
        "id": 1,
        "name": "CarbonPass 2023",
        "startDate": "2023-01-01",
        "endDate": "2023-12-31",
        "stages": [
            {
                "id": 1,
                "name": "Stage 1",
                "position": 1,
                "reward": {
                    "id": 1,
                    "name": "Stylo Carbon",
                }
            },
            {
                "id": 2,
                "name": "Stage 2",
                "position": 2,
                "reward": {
                    "id": 2,
                    "name": "T-shirt Carbon",
                }
            },
            {
                "id": 3,
                "name": "Stage 3",
                "position": 3,
                "reward": {
                    "id": 3,
                    "name": "Sweat Carbon",
                }
            },
            {
                "id": 4,
                "name": "Stage 4",
                "position": 4,
                "reward": {
                    "id": 4,
                    "name": "Casquette Carbon",
                }
            },
            {
                "id": 5,
                "name": "Stage 5",
                "position": 5,
                "reward": {
                    "id": 5,
                    "name": "Sac à dos Carbon",
                }
            },
            {
                "id": 6,
                "name": "Stage 6",
                "position": 6,
                "reward": {
                    "id": 6,
                    "name": "Gourde Carbon",
                }
            },
            {
                "id": 7,
                "name": "Stage 7",
                "position": 7,
                "reward": {
                    "id": 7,
                    "name": "Trousse Carbon",
                }
            },
            {
                "id": 8,
                "name": "Stage 8",
                "position": 8,
                "reward": {
                    "id": 8,
                    "name": "Tapis de souris Carbon",
                }
            },
            {
                "id": 9,
                "name": "Stage 9",
                "position": 9,
                "reward": {
                    "id": 9,
                    "name": "Mug Carbon",
                }
            },
            {
                "id": 10,
                "name": "Stage 10",
                "position": 10,
                "reward": {
                    "id": 10,
                    "name": "Clé USB Carbon",
                }
            },
            {
                "id": 10,
                "name": "Stage 10",
                "position": 10,
                "reward": {
                    "id": 10,
                    "name": "Clé USB Carbon",
                }
            }
        ]
    }

    const items = carbonPass.stages.map((stage) => {
        return (
            <Grid container direction={"column"} gap={1}>
                <Card sx={{marginX: 1}}>
                    <CardMedia
                        sx={{height: 100}}
                        image="https://picsum.photos/100"
                        title="Stage Reward"
                    />
                    <CardContent>
                        <Typography inline variant="caption">
                            {stage.reward.name}
                        </Typography>
                    </CardContent>
                </Card>
                <Card sx={{display: "flex", justifyContent:"center", marginX: 1}}>
                    {stage.position}
                </Card>
            </Grid>
        )
    });

    return (
        <AliceCarousel
            mouseTracking
            items={items}
            responsive={responsive}
            controlsStrategy="alternate"
        />
    );
}

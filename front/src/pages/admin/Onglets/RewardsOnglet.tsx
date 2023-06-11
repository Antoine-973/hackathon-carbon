import {useEffect, useState} from "react";
import {Button, Card, CardActions, CardContent, CardMedia, Grid, Typography} from "@mui/material";
import {RewardService} from "../../../services/RewardService.ts";
import {AddRewardModal} from "../../../components/rewards/AddRewardModal.tsx";

export const RewardsOnglet = () => {

    const [createRewardIsOpen, setCreateRewardIsOpen] = useState(false);
    const toggleCreateRewardIsOpen = () => {
        setCreateRewardIsOpen(!createRewardIsOpen)
    }

    const [rewards, setRewards] = useState<any>([])

    const getRewards = () => {
        RewardService.getRewards()
            .then((response) => {
                    setRewards(response)
                }
            )
    }

    useEffect(() => {
        getRewards();
    }, []);


    return (
        <>
            <Grid container gap={2}>
                <Grid item>
                    <Typography display={"inline"} componant={'h1'} variant={'h4'}>
                        Rewards
                    </Typography>
                </Grid>
                <Grid item>
                    <Button variant="contained" color="success" onClick={toggleCreateRewardIsOpen}>
                        Ajouter un reward
                    </Button>
                </Grid>
            </Grid>
            <Grid container p={3} spacing={5}>
                {rewards && rewards.map((reward: any) => {
                        return (
                            <Grid item key={reward.id}>
                                <Card sx={{minWidth: 345, maxWidth: 345, minHeight: 400, maxHeight: 1000}}>
                                    <CardMedia
                                        sx={{height: 140}}
                                        image="https://picsum.photos/200/100"
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {reward.title}
                                        </Typography>
                                        <Typography variant="caption" color="text.secondary">
                                            {reward.description}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button color={"success"} size="small">Modifier</Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        )
                    }
                )}
            </Grid>
            {createRewardIsOpen &&
                <AddRewardModal
                    open={createRewardIsOpen}
                    toggleEditModal={toggleCreateRewardIsOpen}
                />
            }
        </>
    )
}
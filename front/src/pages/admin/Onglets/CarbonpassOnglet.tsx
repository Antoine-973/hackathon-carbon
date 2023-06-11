import React, {useEffect, useState} from "react";
import {PassServices} from "../../../services/PassServices.ts";
import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Divider,
    FormControl,
    Grid,
    MenuItem,
    Paper,
    Select,
    SelectChangeEvent,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import {AddCarbonPassModal} from "../../../components/CarbonPass/AddCarbonPassModal.tsx";
import {RewardService} from "../../../services/RewardService.ts";

export const CarbonpassOnglet = () => {

    const [createPassIsOpen, setCreatePassIsOpen] = useState(false);
    const toggleCreatePassIsOpen = () => {
        setCreatePassIsOpen(!createPassIsOpen)
    }

    const [carbonPasses, setCarbonPasses] = useState<any>([])
    const [activePass, setActivePass] = useState<any>({})
    const [rewards, setRewards] = useState<any>([]);
    const [selectedReward, setSelectedReward] = useState<any>(null);

    const getRewards = () => {
        RewardService.getRewards()
            .then((response) => {
                    setRewards(response)
                }
            )
    }

    const getCarbonPasses = () => {
        PassServices.getPasses()
            .then((response) => {
                    setCarbonPasses(response)
                }
            )
    }

    useEffect(() => {
        getCarbonPasses();
        getRewards();
    }, []);

    const handleSelectChange = (event: SelectChangeEvent) => {
        setActivePass(event.target.value)
    };


    return (
        <>
            <Grid container gap={2}>
                <Grid item>
                    <Typography display={"inline"} componant={'h1'} variant={'h4'}>
                        Carbon Pass
                    </Typography>
                </Grid>
                <Grid item>
                    <Button variant="contained" color="success" onClick={toggleCreatePassIsOpen}>
                        Ajouter un Carbon Pass
                    </Button>
                </Grid>
            </Grid>
            <Grid container p={3} spacing={5}>
                {carbonPasses && carbonPasses.map((carbonPass: any) => {
                        return (
                            <Grid item key={carbonPass.id}>
                                <Card sx={{minWidth: 345, maxWidth: 345, minHeight: 400, maxHeight: 400}}>
                                    <CardMedia
                                        sx={{height: 140}}
                                        image="https://picsum.photos/200/100"
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {carbonPass.title}
                                        </Typography>
                                        <Typography variant="caption" color="text.secondary">
                                            {carbonPass.description}
                                        </Typography>
                                        <Typography fontWeight={"bold"} variant="body1" color="text.secondary">
                                            Date de début : {new Date(carbonPass.startAt).toLocaleDateString()}
                                        </Typography>
                                        <Typography fontWeight={"bold"} variant="body1" color="text.secondary">
                                            Date de fin : {new Date(carbonPass.endAt).toLocaleDateString()}
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
            <Divider sx={{mb: 5}}/>
            {carbonPasses &&
                <>
                    <FormControl variant="outlined" sx={{minWidth: "90%"}}>
                        <Select
                            name="application"
                            value={activePass}
                            onChange={handleSelectChange}
                        >
                            {carbonPasses &&
                                carbonPasses.map((item) => {
                                    return <MenuItem key={item.id} value={item}>{item.title}</MenuItem>
                                })
                            }
                        </Select>
                    </FormControl>

                    {activePass &&
                        <TableContainer component={Paper}>
                            <Table sx={{minWidth: 650}} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Rewards</TableCell>
                                        {activePass.stages && activePass.stages.map((stage: any) => {
                                            return <TableCell key={stage.id} align="right">{stage.position}</TableCell>
                                        }
                                        )}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rewards && rewards.map((reward: any) => {
                                            return (
                                                <TableRow
                                                    key={reward.id}
                                                    sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                                >
                                                    <TableCell component="th" scope="row">
                                                        {reward.title}
                                                    </TableCell>
                                                    {activePass.stages && activePass.stages.map((stage: any) => {
                                                            return (
                                                                <TableCell key={stage.id} align="right">
                                                                    <input onClick={(evt) => {
                                                                        if(evt.target.checked){
                                                                            setSelectedReward([selectedReward, {rewardId: reward.id, stageId: stage.id}].flat()) ;
                                                                            return ;
                                                                        }

                                                                    }}
                                                                           type="checkbox"/>
                                                                </TableCell>
                                                            )
                                                        }
                                                    )}
                                                </TableRow>
                                            )
                                        }
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>

                    }
                    <Button sx={{mt:2}} variant="contained" color="success" onClick={() => {
                        for (const item of selectedReward) {
                            if(item !== null){
                                RewardService.patchReward(item.rewardId, item.stageId)
                            }
                        }
                    }}>
                        Ajouter les récompenses
                    </Button>

                </>
            }
            {createPassIsOpen &&
                <AddCarbonPassModal
                    open={createPassIsOpen}
                    toggleEditModal={toggleCreatePassIsOpen}
                />
            }
        </>
    )
}
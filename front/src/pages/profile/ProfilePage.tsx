import {Accordion, AccordionDetails, AccordionSummary, Avatar, Card, Grid, IconButton, Typography} from "@mui/material";
import {Edit, Email, ExpandMore, LocalPhone} from '@mui/icons-material';
import React, {SyntheticEvent, useEffect, useState} from "react";
import CarbonPass from "../../components/CarbonPass/CarbonPass.tsx";
import {Link, useParams} from "react-router-dom";
import UserService from "../../services/UserService.ts";
import {PassServices} from "../../services/PassServices.ts";
import Loader from "../../components/loader/Loader.tsx";
import {useAuthContext} from "../../providers/AuthProvider.tsx";
import EditProfileModal from "../../components/profile/EditProfileModal.tsx";
import ReactQuill from "react-quill";
import {CircularStatic} from "../../components/assets/progressBar.tsx";

export default function ProfilePage() {

    const id = useParams().id;
    const {user} = useAuthContext() ;
    const [data, setData] = useState({})
    const [expanded, setExpanded] = useState<string | false>(false);
    const [pass,setPass] = useState(false) ;
    const [loader, setLoader] = useState(true);
    const actualMission = data.missions?.filter((mission) => mission.endAt > new Date().toISOString())[0]
    const [open, setOpen] = useState(false);
    const toggleEditModal = () => {
        setOpen(!open)
    }


    useEffect(() => {
        if(id) {
            UserService.get(+id).then((response) => {
                setData(response)
            }).finally(() => {
                setLoader(false)
            });
        } else {
            setData(user) ;
        }
        PassServices.getLastPass().then((response) => {
            setPass(response)
        }).finally(() => {
            setLoader(false)
        });
       
    }, [id])

    const handleChange =
        (panel: string) => (event: SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };

    return (
        loader ? <Loader/> :
        <>
            {data &&
                <Grid paddingY={2} paddingX={5} container spacing={2} alignItems={"center"} justifyItems={"center"}>
                    <Grid item xl={12}>
                        <Card variant="outlined">
                            <Grid container direction={"column"}>
                                <Grid item position={"relative"}>
                                    <Avatar src={"https://picsum.photos/200"} sx={{
                                        position: "absolute",
                                        top: "calc(50% - 50px)",
                                        left: 40,
                                        width: 170,
                                        height: 170,
                                        boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)",
                                        border: "1px solid white"
                                    }}></Avatar>
                                    <img width={"100%"} src={"https://picsum.photos/1400/200"}
                                         alt={"User profile banner"}/>
                                </Grid>
                                <Grid item container marginTop={1} padding={5} spacing={2} position={"relative"}>
                                    <IconButton aria-label="delete" sx={{position: "absolute", top: 50, right: 20}} onClick={() => toggleEditModal()}>
                                        <Edit color={"info"}/>
                                    </IconButton>
                                    <Grid item xl={10}>
                                        <Grid item>
                                            <Grid container alignItems={"center"} gap={1}>
                                                <CircularStatic level={data.niveau}/>
                                                <Typography variant="h5"
                                                            fontWeight={"bold"}>{data.firstname} {data.lastname}</Typography>
                                                <a href={"mailto:" + data.email}>
                                                    <Email fontSize={"small"} color={"info"}/>
                                                </a>
                                                <a href={"tel:" + data.phone}>
                                                    <LocalPhone fontSize={"small"} color={"info"}/>
                                                </a>
                                            </Grid>
                                        </Grid>
                                        {actualMission &&
                                            <Grid item key={actualMission.id}>
                                                <Typography display={"inline"} variant="subtitle2">{actualMission.title} en
                                                    mission
                                                    chez {actualMission.client.id}</Typography>
                                            </Grid>
                                        }
                                        {data.localisation &&
                                        <Grid item>
                                            <Typography variant="subtitle2">{data.localisation}</Typography>
                                        </Grid>
                                        }
                                        {
                                            data.mentor &&
                                            <Grid item>
                                                <Typography display={"inline"} variant="subtitle2">Mentor : </Typography>
                                                <Link style={{textDecoration: 'none'}} to={"/consultant/" + data.mentor.id}><Typography display={"inline"} variant="subtitle2" fontWeight={"bold"} color={"info"}>{data.mentor.firstname} {data.mentor.lastname}</Typography></Link>
                                            </Grid>
                                        }
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Card>
                    </Grid>

                    {data.description &&
                    <Grid item xl={12}>
                        <Card variant="outlined">
                            <Grid container>
                                <Grid container padding={2} direction={"column"}>
                                    <Grid item>
                                        <Typography variant="h5"
                                                    fontWeight={"bold"}>Infos</Typography>
                                    </Grid>
                                    <Grid item>
                                        <ReactQuill
                                            value={data.description}
                                            readOnly={true}
                                            theme={"bubble"}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Card>
                    </Grid>
                    }

                    {pass &&
                    <Grid item xl={12}>
                        <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                            <AccordionSummary
                                expandIcon={<ExpandMore/>}
                                aria-controls="panel1bh-content"
                                id="panel1bh-header"
                            >
                                <Typography fontWeight={'bold'}>
                                    CarbonPass Niveau {user.niveau}
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <CarbonPass level={data.niveau} pass={pass[0]}/>
                            </AccordionDetails>
                        </Accordion>
                    </Grid>
                    }

                    {data.missions &&
                    <Grid item xl={6}>
                        <Card variant="outlined">
                            <Grid container>
                                <Grid  container padding={2} direction={"column"}>
                                    <Grid item>
                                        <Typography variant="h5"
                                                    fontWeight={"bold"}>Missions</Typography>
                                    </Grid>
                                    {
                                        data.missions.map((mission) => {
                                            return (
                                                <Grid  key={mission.title} item padding={1} borderBottom={1} borderColor={'lightgray'}>
                                                    <Typography fontWeight={"bold"}
                                                                variant="body1">{mission.title}</Typography>
                                                </Grid>
                                            )
                                        })
                                    }
                                </Grid>
                            </Grid>
                        </Card>
                    </Grid>
                    }

                    {data.formations &&
                    <Grid item xl={6}>
                        <Card variant="outlined">
                            <Grid container>
                                <Grid container padding={2} direction={"column"}>
                                    <Grid item>
                                        <Typography variant="h5"
                                                    fontWeight={"bold"}>Formations</Typography>
                                    </Grid>
                                    {
                                        data.formations.map((formation) => {
                                            return (
                                                <Grid key={formation.id} item padding={1} borderBottom={1} borderColor={'lightgray'}>
                                                    <Typography fontWeight={"bold"}
                                                                variant="body1">{formation.title}</Typography>
                                                </Grid>
                                            )
                                        })
                                    }
                                </Grid>
                            </Grid>
                        </Card>
                    </Grid>
                    }

                    {data.technologies &&
                    <Grid sx={{mb: 4}} item xl={12}>
                        <Card variant="outlined">
                            <Grid container>
                                <Grid container padding={2} direction={"column"}>
                                    <Grid item>
                                        <Typography variant="h5"
                                                    fontWeight={"bold"}>Compétences</Typography>
                                    </Grid>
                                    {
                                        data.technologies.map((technology) => {
                                            return (
                                                <Grid key={technology.id} item padding={1} borderBottom={1} borderColor={'lightgray'}>
                                                    <Typography fontWeight={"bold"}
                                                                variant="body1">{technology.title}</Typography>
                                                </Grid>
                                            )
                                        })
                                    }
                                </Grid>
                            </Grid>
                        </Card>
                    </Grid>
                    }
                </Grid>
            }
            {open &&
                <EditProfileModal
                    open={open}
                    toggleEditModal={toggleEditModal}
                    userId={data.id}
                />
            }
        </>
    )
}
import Loader from "../../../components/loader/Loader";
import {Box, Button, Card, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography} from "@mui/material";
import {Clear} from "@mui/icons-material";
import * as React from "react";
import {useEffect, useState} from "react";
import {ClientService} from "../../../services/ClientService";
import {MissionService} from "../../../services/MissionService";
import {UserServices} from "../../../services/UserServices";
import DatePicker from "react-datepicker";

export const MissionOnglet = () => {

    const [loading, setLoading] = useState(true)
    const [missions, setMissions] = useState([])

    const [clients, setClients] = useState([])
    const [users, setUsers] = useState([])

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [userId, setUserId] = useState("")
    const [clientId, setClientId] = useState("")
    const [dateDebut, setDateDebut] = useState(new Date())
    const [dateFin, setDateFin] = useState(new Date())

    useEffect(() => {
        MissionService.getAll().then((response) => {
            setMissions(response);
            UserServices.getUsers().then((response) => {
                setUsers(response);
            })
            ClientService.getAll().then((response) => {
                setClients(response);
            })
        }).finally(() => {
            setLoading(false);
        });
    }, [])

    const handleDelete = (id: number) => {
        MissionService.delete(id).then((response) => {
            return response;
        }).finally(() => {
            setMissions(missions.filter((mission) => mission.id !== id));
            setLoading(false);
        });
        setLoading(false);
    }

    const handleSubmit = () => {
        const startAt = dateDebut.toISOString();
        const endAt = dateFin.toISOString();
        MissionService.create({title, description, userId, clientId, startAt, endAt}).then((response) => {
            return response;
        }).finally(() => {
            setLoading(false);
        });
        setLoading(false);
    }

    return (
        loading ? <Loader/> :
            <Grid container direction={"row"}>
                <Grid item xs={12} md={6}>
                    <h2>Ajout d'une mission</h2>
                    <Box
                        component="form"
                        sx={{
                            '& .MuiTextField-root': { m: 1, width: '25ch' },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <TextField
                            id="outlined-multiline-flexible"
                            label="Titre"
                            name="title"
                            color="secondary"
                            onChange={(e) => setTitle(e.target.value)}
                            multiline
                            maxRows={4}
                        />
                        <TextField
                            id="outlined-multiline-flexible"
                            label="Description"
                            name="description"
                            onChange={(e) => setDescription(e.target.value)}
                            color="secondary"
                            multiline
                            maxRows={4}
                        />
                        <FormControl fullWidth sx={{
                            marginY: 2,
                            marginLeft: 1,
                            maxWidth: 400
                        }}>
                            <InputLabel color={"secondary"} id="demo-simple-select-label">Consultant</InputLabel>
                            <Select
                                required={true}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={userId}
                                label="Consultant"
                                color="secondary"
                                name="userId"
                                onChange={(e) => setUserId(e.target.value)}
                            >
                                {
                                    users.length > 0 && users.map((user, key) => {
                                        if(user.role !== "ROLE_CONSULTANT" ){
                                            return null;
                                        }
                                    if (user.missions.length > 0) {
                                        user?.missions.map((mission) => {
                                            const formatedDate = new Date(mission.endAt);
                                            console.log("date 1", formatedDate)
                                            console.log("date 2", new Date())
                                            console.log(formatedDate > new Date())
                                            if (formatedDate > new Date()) {
                                                setUsers(users.filter((user) => user.id !== mission.userId));
                                            }
                                        })
                                    }
                                        return (
                                            <MenuItem key={key} value={user.id}>{user.firstname +" "+user.lastname}</MenuItem>
                                        )
                                    })
                                }
                            </Select>
                        </FormControl>
                        <FormControl fullWidth sx={{
                            marginY: 2,
                            marginLeft: 1,
                            maxWidth: 400,
                        }}>
                            <InputLabel color={"secondary"} id="demo-simple-select-label">Client</InputLabel>
                            <Select
                                required={true}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={clientId}
                                label="Client"
                                color="secondary"
                                name="clientId"
                                onChange={(e) => setClientId(e.target.value)}
                            >
                                {
                                    clients.length > 0 && clients.map((client, key) => {
                                        return (
                                            <MenuItem key={key} value={client.id}>{client.title}</MenuItem>
                                        )
                                    })
                                }
                            </Select>
                        </FormControl>
                        <Grid style={{
                            marginBottom: 10,
                            marginLeft:10
                        }}>
                            <label>
                                Date de début de la mission :
                            </label>
                            <DatePicker
                                selected={dateDebut}
                                onChange={(date) => setDateDebut(date)}
                            />
                        </Grid>
                        <Grid style={{
                            marginBottom: 10,
                            marginLeft:10
                        }}>
                            <label>
                                Date de fin de la mission :
                            </label>
                            <DatePicker
                                selected={dateFin}
                                onChange={(date) => setDateFin(date)}
                            />
                        </Grid>
                        <Grid style={{marginLeft:10}}>
                            <Button variant="contained" type="submit" onClick={() => handleSubmit()}>Créer</Button>
                        </Grid>
                    </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                    <h2>Suppression d'une mission</h2>
                    {
                        missions.length > 0 && missions.map((mission, key) => {
                            const dateDebut = new Date(mission.startAt);
                            const dateFin = new Date(mission.endAt);
                            return (
                                <Card style={{margin:10, padding:10}} key={key}>
                                    <Grid container direction={"row"} alignItems={"center"}>
                                        <Grid item xs={10}>
                                            <Typography variant={"h6"}>{mission.title}</Typography>
                                            <Typography >{mission.description}</Typography>
                                            <Typography >
                                                <span style={{fontWeight:"bold"}}>
                                                    Client : &nbsp;
                                                </span>
                                                {mission.client.title}
                                            </Typography>
                                            <Typography >
                                                <span style={{fontWeight:"bold"}}>
                                                    Consultant : &nbsp;
                                                </span>
                                                {mission.user.firstname +" "+ mission.user.lastname}
                                            </Typography>
                                            <Typography >
                                                <span style={{fontWeight:"bold"}}>
                                                    Dates : &nbsp;
                                                </span>
                                                {dateDebut.toLocaleDateString() +" à "+ dateFin.toLocaleDateString()}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={2}>
                                            <Clear
                                                style={{
                                                    cursor: 'pointer',
                                                }}
                                                onClick={() => {handleDelete(mission.id)}}
                                            />
                                        </Grid>
                                    </Grid>
                                </Card>
                            )
                        })
                    }
                </Grid>
            </Grid>
    )
}
import Loader from "../../../components/loader/Loader";
import {Box, Button, Card, Grid, TextField, Typography} from "@mui/material";
import {Clear} from "@mui/icons-material";
import * as React from "react";
import {useEffect, useState} from "react";
import DatePicker from "react-datepicker";
import {EventServices} from "../../../services/EventServices";

export const EventsOnglet = () => {

    const [loading, setLoading] = useState(true)
    const [events, setEvents] = useState([])
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [date, setDate] = useState(new Date())

    useEffect(() => {
        EventServices.getAllEvents().then((response) => {
            setEvents(response);
        }).finally(() => {
            setLoading(false);
        });
        setLoading(false);
    }, [])

    const handleDelete = (id: number) => {
        EventServices.delete(id).then((response) => {
            return response;
        }).finally(() => {
            setEvents(events.filter((event) => event.id !== id));
            setLoading(false);
        });
        setLoading(false);
    }

    const handleSubmit = () => {
        EventServices.create({title, description, date}).then((response) => {
            return response;
        }).finally(() => {
            setLoading(false);
        });
        setLoading(false);
    }

    return (
        loading ? <Loader/> :
            <Grid container direction={"row"}>
                <Grid item xs={12} >
                    <h2>Ajout d'un évènement</h2>
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
                        <Grid style={{
                            marginBottom: 10,
                            marginLeft:10
                        }}>
                            <DatePicker
                                selected={date}
                                onChange={(date) => setDate(date)}
                            />
                        </Grid>
                        <Grid style={{marginLeft:10}}>
                            <Button variant="contained" type="submit" onClick={() => handleSubmit()}>Créer</Button>
                        </Grid>
                    </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                    <h2>Suppression d'un évènement</h2>
                    {
                        events.length > 0 && events.map((event, key) => {
                            return (
                                <Card style={{margin:10, padding:10}} key={key}>
                                    <Grid container direction={"row"} alignItems={"center"}>
                                        <Grid item xs={10}>
                                            <Typography variant={"h6"}>{event.title}</Typography>
                                            <Typography >{event.description}</Typography>
                                            <Typography >{(new Date(event.date)).toLocaleDateString()}</Typography>
                                        </Grid>
                                        <Grid item xs={2}>
                                            <Clear
                                                style={{
                                                    cursor: 'pointer',
                                                }}
                                                onClick={() => {handleDelete(event.id)}}
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
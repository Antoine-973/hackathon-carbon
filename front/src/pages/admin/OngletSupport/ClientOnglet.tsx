import Loader from "../../../components/loader/Loader";
import {Box, Button, Card, Grid, TextField, Typography} from "@mui/material";
import {Clear} from "@mui/icons-material";
import * as React from "react";
import {useEffect, useState} from "react";
import {ArticlesServices} from "../../../services/ArticlesServices.ts";
import {ClientService} from "../../../services/ClientService";

export const ClientOnglet = () => {

    const [loading, setLoading] = useState(true)
    const [clients, setClients] = useState([])
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [email, setEmail] = useState("")

    useEffect(() => {
        ClientService.getAll().then((response) => {
            setClients(response);
        }).finally(() => {
            setLoading(false);
        });
        setLoading(false);
    }, [])

    const handleDelete = (id: number) => {
        ClientService.delete(id).then((response) => {
            return response;
        }).finally(() => {
            setClients(clients.filter((client) => client.id !== id));
            setLoading(false);
        });
        setLoading(false);
    }

    const handleSubmit = () => {
        ClientService.create({title, description, email}).then((response) => {
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
                    <h2>Ajout d'un client</h2>
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
                        <TextField
                            id="outlined-multiline-flexible"
                            label="Email"
                            name="email"
                            onChange={(e) => setEmail(e.target.value)}
                            color="secondary"
                            multiline
                            maxRows={4}
                        />
                        <Grid style={{marginLeft:10}}>
                            <Button variant="contained" type="submit" onClick={() => handleSubmit()}>Créer</Button>
                        </Grid>
                    </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                    <h2>Suppression d'un client</h2>
                    {
                        clients.length > 0 && clients.map((client, key) => {
                            return (
                                <Card style={{margin:10, padding:10}} key={key}>
                                    <Grid container direction={"row"} alignItems={"center"}>
                                        <Grid item xs={6}>
                                            <Typography variant={"h6"}>{client.title}</Typography>
                                            <Typography >{client.description}</Typography>
                                        </Grid>
                                        <Grid item xs={2}>
                                            <Clear
                                                style={{
                                                    cursor: 'pointer',
                                                }}
                                                onClick={() => {handleDelete(client.id)}}
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
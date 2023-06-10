import Loader from "../../../components/loader/Loader";
import {Box, Button, Card, Grid, TextField, Typography} from "@mui/material";
import {Clear} from "@mui/icons-material";
import * as React from "react";
import {useEffect, useState} from "react";
import {TechnologiesServices} from "../../../services/TechnologiesServices";

export const TechnologiesOnglet = () => {

    const [loading, setLoading] = useState(true)
    const [technologies, setTechnologies] = useState([])
    const [title, setTitle] = useState("")
    const [image, setImage] = useState("")
    const [description, setDescription] = useState("")

    useEffect(() => {
        TechnologiesServices.getAll().then((response) => {
            setTechnologies(response);
        }).finally(() => {
            setLoading(false);
        });
        setLoading(false);
    }, [])

    const handleDelete = (id: number) => {
        TechnologiesServices.delete(id).then((response) => {
            return response;
        }).finally(() => {
            setTechnologies(technologies.filter((technology) => technology.id !== id));
            setLoading(false);
        });
        setLoading(false);
    }

    const handleSubmit = () => {
        TechnologiesServices.create({title, description, image}).then((response) => {
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
                    <h2>Ajout d'une technologie</h2>
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
                        <input
                            style={{
                                marginLeft:10,
                                marginBottom:10,
                            }}
                            name="image"
                            onChange={(e) => setImage(e.target.value)}
                            accept="image/*"
                            id="contained-button-file"
                            type="file"
                        />
                        <Grid style={{marginLeft:10}}>
                            <Button variant="contained" type="submit" onClick={() => handleSubmit()}>Ajouter</Button>
                        </Grid>
                    </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                    <h2>Suppression d'une technologie</h2>
                    {
                        technologies.length > 0 && technologies.map((technology, key) => {
                            return (
                                <Card style={{margin:10, padding:10}} key={key}>
                                    <Grid container direction={"row"} alignItems={"center"}>
                                        <Grid item xs={10}>
                                            <Typography variant={"h6"}>{technology.title}</Typography>
                                            <Typography >{technology.description}</Typography>
                                        </Grid>
                                        <Grid item xs={2}>
                                            <Clear
                                                style={{
                                                    cursor: 'pointer',
                                                }}
                                                onClick={() => {handleDelete(technology.id)}}
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
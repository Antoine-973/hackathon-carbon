import Loader from "../../../components/loader/Loader";
import {Box, Button, Card, Grid, TextField, Typography} from "@mui/material";
import {Clear} from "@mui/icons-material";
import * as React from "react";
import {useEffect, useState} from "react";
import {ArticlesServices} from "../../../services/ArticlesServices";

export const ArticlesOnglet = () => {

    const [loading, setLoading] = useState(true)
    const [articles, setArticles] = useState([])
    const [title, setTitle] = useState("")
    const [image, setImage] = useState("https://picsum.photos/250/200")
    const [description, setDescription] = useState("")
    const [author, setAuthor] = useState("")

    useEffect(() => {
        ArticlesServices.getAll().then((response) => {
            setArticles(response);
        }).finally(() => {
            setLoading(false);
        });
        setLoading(false);
    }, [])

    const handleDelete = (id: number) => {
        ArticlesServices.delete(id).then((response) => {
            return response;
        }).finally(() => {
            setArticles(articles.filter((article) => article.id !== id));
            setLoading(false);
        });
        setLoading(false);
    }

    const handleSubmit = () => {
        ArticlesServices.create({title, description, image, author}).then((response) => {
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
                    <h2>Ajout d'un article</h2>
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
                            label="Auteur"
                            name="author"
                            onChange={(e) => setAuthor(e.target.value)}
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
                            <Button variant="contained" type="submit" onClick={() => handleSubmit()}>Créer</Button>
                        </Grid>
                    </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                    <h2>Suppression d'un article</h2>
                    {
                        articles.length > 0 && articles.map((article, key) => {
                            return (
                                <Card style={{margin:10, padding:10}} key={key}>
                                    <Grid container direction={"row"} alignItems={"center"}>
                                        <Grid item xs={6}>
                                            <Typography variant={"h6"}>{article.title}</Typography>
                                            <Typography >{article.description}</Typography>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <img src={article.image} alt={article.title} style={{width:100}}/>
                                        </Grid>
                                        <Grid item xs={2}>
                                            <Clear
                                                style={{
                                                    cursor: 'pointer',
                                                }}
                                                onClick={() => {handleDelete(article.id)}}
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
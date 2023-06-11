import {Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import {DocumentService} from "../../../services/DocumentService";
import Loader from "../../../components/loader/Loader";
import * as React from "react";
import {ClientService} from "../../../services/ClientService";

export const DocumentsOnglet = () => {

    const [documents, setDocuments] = useState([])
    const [title, setTitle] = useState("")
    const [link, setLink] = useState("")
    const [category, setCategory] = useState('')
    const [toDelete, setToDelete] = useState("")

    const [loading, setLoading] = useState(true)

    const CATEGORIES = {
        RH: 'RESSOURCES_HUMAINES',
        COM: 'COMMERCIAL',
        GLO: 'GLOBAL',
    }

    const categories = [
        {
            value: 'RESSOURCES_HUMAINES',
            label: 'Ressources Humaines',
        },
        {
            value: 'COMMERCIAL',
            label: 'Commercial',
        },
        {
            value: 'GLOBAL',
            label: 'Global',
        },
    ]

    useEffect(() => {
        DocumentService.getAll().then((response) => {
            setDocuments(response)
        }).finally(() => {
            setLoading(false)
        })
    }, [])

    const handleCreate = () => {
        if (toDelete) {
            DocumentService.create({title, link, category}).then((response) => {
                setDocuments([...documents, response])
            }).finally(() => {
                setLoading(false);
            });
        }
    }

    const handleDelete = () => {
        DocumentService.delete(toDelete).then((response) => {
            setDocuments(documents.filter((document) => document.id !== response.id))
        }).finally(() => {
            setLoading(false);
        });
    }

    const urls = {
        global: "https://drive.google.com/drive/folders/16Z0YLojdpgHnE9ZbDfyexgNU53KycHrK?usp=sharing",
        rh: "https://drive.google.com/drive/folders/1BIUwS2LbGxdDh_eN0NgkaCw_s2J0rkIp?usp=sharing",
        commercial: "https://drive.google.com/drive/folders/1C6rO8uQBQl5bHgMsycO1v9nBT2zskhKj?usp=drive_link",
    }

    return (
        loading ? <Loader/> :
            <Grid container justifyContent={'center'}>
                <Typography variant="h4" component="h2" gutterBottom>
                    Documents
                </Typography>
                <Grid container sx={{
                    display: 'flex',
                    alignItems: 'center',
                }}>
                    <Grid item xs={12} md={6}>
                        <Grid item xs={12} sx={{
                            display: 'flex',
                            marginY: 5,
                        }}>
                            <Button color={"secondary"} variant={"contained"}
                                    onClick={() => window.location.href = urls.global}>
                                Accéder aux documents
                            </Button>
                        </Grid>
                        <Grid item xs={12} md={6} sx={{
                            display: 'flex',
                            marginY: 2,
                        }}>
                            <TextField
                                id="outlined-multiline-flexible"
                                label="Libellé"
                                name="title"
                                onChange={(e) => setTitle(e.target.value)}
                                color="secondary"
                                multiline
                                maxRows={4}
                                sx={{
                                    marginRight: 2,
                                }}
                            />
                            <TextField
                                id="outlined-multiline-flexible"
                                label="Lien"
                                name="link"
                                onChange={(e) => setLink(e.target.value)}
                                color="secondary"
                                multiline
                                maxRows={4}
                            />
                        </Grid>
                        <Grid item xs={12} sx={{
                            marginY: 2,
                            textAlign: 'start'
                        }}>
                            <FormControl fullWidth sx={{
                                maxWidth: 450,
                            }}>
                                <InputLabel color={"secondary"} id="demo-simple-select-label">Catégorie</InputLabel>
                                <Select
                                    required={true}
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={category}
                                    label="Catégorie"
                                    color="secondary"
                                    name="category"
                                    onChange={(e) => setCategory(e.target.value)}
                                >
                                    {
                                        categories.map((category, key) => {
                                            return <MenuItem key={key}
                                                             value={category.value}>{category.label}</MenuItem>
                                        })
                                    }
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sx={{
                            marginY: 2,
                        }}>
                            <Button color={"secondary"} variant={"contained"} onClick={handleCreate}>
                                Créer
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <FormControl fullWidth sx={{
                            maxWidth: 450,
                        }}>
                            <InputLabel color={"secondary"} id="demo-simple-select-label">Document à
                                supprimer</InputLabel>
                            <Select
                                required={true}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={toDelete}
                                label="Catégorie"
                                color="secondary"
                                name="category"
                                onChange={(e) => setToDelete(e.target.value)}
                            >
                                {
                                    documents.map((document, key) => {
                                        return <MenuItem key={key} value={document.id}>
                                            {document.category + " - " + document.title}
                                        </MenuItem>
                                    })
                                }
                            </Select>
                        </FormControl>
                        <Grid item xs={12} sx={{
                            marginY: 2,
                        }}>
                            <Button color={"secondary"} variant={"contained"} onClick={handleDelete}>
                                Supprimer
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} md={12}>
                    <Typography variant="h5" component="h2" gutterBottom>
                        Documents globaux
                    </Typography>
                    <Box sx={{
                        display: 'flex',
                        marginY: 2,
                        direction: 'column',
                    }}>
                        {
                            documents && documents.length > 0 && documents.map((document) => {
                                if (document.category === CATEGORIES.GLO) {
                                    return <Button key={document.id} sx={{margin: 2}} color={"info"}
                                                   variant={"contained"}
                                                   onClick={() => window.location.href = document.link}>
                                        {document.title}
                                    </Button>
                                }
                            })
                        }
                    </Box>
                </Grid>
                <Grid item xs={12} md={12}>
                    <Typography variant="h5" component="h2" gutterBottom>
                        Documents ressources humaines
                    </Typography>
                    <Box sx={{
                        display: 'flex',
                        marginY: 2,
                        direction: 'column',
                    }}>
                        {
                            documents && documents.length > 0 && documents.map((document) => {
                                if (document.category === CATEGORIES.RH) {
                                    return <Button key={document.id} sx={{margin: 2}} color={"info"}
                                                   variant={"contained"}
                                                   onClick={() => window.location.href = document.link}>
                                        {document.title}
                                    </Button>
                                }
                            })
                        }
                    </Box>
                </Grid>
                <Grid item xs={12} md={12} sx={{}}>
                    <Typography variant="h5" component="h2" gutterBottom>
                        Documents commerciaux
                    </Typography>
                    <Box sx={{
                        display: 'flex',
                        marginY: 2,
                        direction: 'column',
                    }}>
                        {
                            documents && documents.length > 0 && documents.map((document) => {
                                if (document.category === CATEGORIES.COM) {
                                    return <Button key={document.id} sx={{margin: 2}} color={"info"}
                                                   variant={"contained"}
                                                   onClick={() => window.location.href = document.link}>
                                        {document.title}
                                    </Button>
                                }
                            })
                        }
                    </Box>
                </Grid>
            </Grid>
    )
}
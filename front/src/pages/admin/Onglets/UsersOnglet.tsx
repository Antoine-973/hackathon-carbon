import {Box, Button, Card, Grid, TextField} from "@mui/material";
import * as React from "react";
import {useEffect, useState} from "react";
import {UserServices} from "../../../services/UserServices";
import {Clear} from "@mui/icons-material";
import Loader from "../../../components/loader/Loader.tsx";

export const UsersOnglet = () => {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)

    const [email, setEmail] = useState([])
    const [firstname, setFirstname] = useState([])
    const [lastname, setLastname] = useState([])
    const [password, setPassword] = useState([])
    const [role, setRole] = useState([])

    useEffect(() => {
        UserServices.getUsers().then((response) => {
            setUsers(response);
        }).finally(() => {
            setLoading(false) ;
        });
    }, [])

    const handleSubmit = () => {
        UserServices.createUsers({email, firstname, lastname, password, role}).then((response) => {
            setUsers([...users, response]);
        }).finally(() => {
            // setLoading(false) ;
        });
    }

    return (
        loading ? <Loader/> :
        <Grid container direction={"row"}>
            <Grid item xs={12} md={6}>
                <h2>Création d'un utilisateur</h2>
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
                        label="Email"
                        name="email"
                        color="secondary"
                        onChange={(e) => setEmail(e.target.value)}
                        multiline
                        maxRows={4}
                    />
                    <TextField
                        id="outlined-multiline-flexible"
                        label="Prénom"
                        name="firstname"
                        onChange={(e) => setFirstname(e.target.value)}
                        color="secondary"
                        multiline
                        maxRows={4}
                    />
                    <TextField
                        id="outlined-multiline-flexible"
                        label="Nom"
                        name="lastname"
                        onChange={(e) => setLastname(e.target.value)}
                        color="secondary"
                        multiline
                        maxRows={4}
                    />
                    <TextField
                        id="outlined-multiline-flexible"
                        label="password"
                        name="password"
                        onChange={(e) => setPassword(e.target.value)}
                        color="secondary"
                        multiline
                        maxRows={4}
                    />
                    <TextField
                        id="outlined-multiline-flexible"
                        label="Rôle"
                        name="role"
                        onChange={(e) => setRole(e.target.value)}
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
                <h2>Suppression d'un utilisateur</h2>
                {
                    users.length > 1 && users.map((user, key) => {
                        return (
                            <Card style={{margin:10, padding:10}} key={key}>
                                <Grid container direction={"row"} alignItems={"center"}>
                                    <p >{user.firstname + " " +user.lastname}</p>
                                    <span style={{
                                        marginLeft: 'auto',
                                        marginTop: 10,
                                    }}>
                                        <Clear/>
                                    </span>
                                </Grid>
                            </Card>
                        )
                    })
                }
            </Grid>
        </Grid>
    )
}
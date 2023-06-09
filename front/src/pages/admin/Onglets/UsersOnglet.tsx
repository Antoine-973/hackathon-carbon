import {Box, Button, Card, Grid, TextField} from "@mui/material";
import {useEffect} from "react";
import {UserServices} from "../../../services/UserServices";
import * as React from "react";
import {Clear} from "@mui/icons-material";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

export const UsersOnglet = () => {
    const [users, setUsers] = React.useState([])
    const [loading, setLoading] = React.useState(true)

    const [email, setEmail] = React.useState([])
    const [firstname, setFirstname] = React.useState([])
    const [lastname, setLastname] = React.useState([])
    const [password, setPassword] = React.useState([])
    const [role, setRole] = React.useState([])
    const [recruitmentAt,setRecruitmentAt ] = React.useState(new Date)

    useEffect(() => {
        UserServices.getUsers().then((response) => {
            setUsers(response);
        }).finally(() => {
            setLoading(false) ;
        });
    }, [])

    const handleSubmit = () => {
        UserServices.createUsers({email, firstname, lastname, password, role, recruitmentAt}).then((response) => {
            console.log(response)
        }).finally(() => {
            setLoading(false) ;
        });
    }

    const handleDelete = (id) => {
        UserServices.deleteUser(id).then((response) => {
            console.log(response)
        }).finally(() => {
            setUsers(users.filter((user) => user.id !== id))
            setLoading(false) ;
        });
    }

    return (
        loading ? <div>Loading...</div> :
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
                    <Grid style={{
                        marginBottom: 10,
                        marginLeft:10
                    }}>
                        <DatePicker
                            selected={recruitmentAt}
                            onChange={(date) => setRecruitmentAt(date)}
                        />
                    </Grid>
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
                                        <Clear
                                            style={{
                                                cursor: 'pointer',
                                            }}
                                            onClick={() => {handleDelete(user.id)}}
                                        />
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
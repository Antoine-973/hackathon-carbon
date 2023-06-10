import {
    Box,
    Button,
    Card,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField
} from "@mui/material";
import {useEffect, useState} from "react";
import {UserServices} from "../../../services/UserServices";
import {Clear} from "@mui/icons-material";
import Loader from "../../../components/loader/Loader.tsx";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const UsersOnglet = () => {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)

    const [email, setEmail] = useState("")
    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [password, setPassword] = useState("")
    const [role, setRole] = useState("")
    const [recruitmentAt,setRecruitmentAt ] = useState(new Date)

    useEffect(() => {
        UserServices.getUsers().then((response) => {
            setUsers(response);
        }).finally(() => {
            setLoading(false);
        });
    }, [])

    const handleSubmit = () => {

        UserServices.createUsers({email, firstname, lastname, password, role, recruitmentAt}).then(() => {
        }).finally(() => {
            setLoading(false) ;
        });
    }

    const handleDelete = (id) => {
        UserServices.deleteUser(id).then(() => {
        }).finally(() => {
            setUsers(users.filter((user) => user.id !== id))
            setLoading(false) ;
        });
    }

    const handleChangeSelect = (event: SelectChangeEvent) => {
        setRole(event.target.value as string);
        console.log(role)
    };

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
                        required={true}
                        id="outlined-multiline-flexible"
                        label="Email"
                        name="email"
                        color="secondary"
                        onChange={(e) => setEmail(e.target.value)}
                        multiline
                        maxRows={4}
                    />
                    <TextField
                        required={true}
                        id="outlined-multiline-flexible"
                        label="Prénom"
                        name="firstname"
                        onChange={(e) => setFirstname(e.target.value)}
                        color="secondary"
                        multiline
                        maxRows={4}
                    />
                    <TextField
                        required={true}
                        id="outlined-multiline-flexible"
                        label="Nom"
                        name="lastname"
                        onChange={(e) => setLastname(e.target.value)}
                        color="secondary"
                        multiline
                        maxRows={4}
                    />
                    <TextField
                        required={true}
                        id="outlined-multiline-flexible"
                        label="password"
                        name="password"
                        onChange={(e) => setPassword(e.target.value)}
                        color="secondary"
                        multiline
                        maxRows={4}
                    />
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Rôle</InputLabel>
                        <Select
                            required={true}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={role}
                            label="Age"
                            color="secondary"
                            name="role"
                            onChange={handleChangeSelect}
                        >
                            <MenuItem value={"ROLE_CONSULTANT"}>consultant</MenuItem>
                            <MenuItem value={"ROLE_SUPPORT"}>support</MenuItem>
                            <MenuItem value={"ROLE_ADMIN"}>admin</MenuItem>
                        </Select>
                    </FormControl>
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
                    users.length > 0 && users.map((user, key) => {
                        if (user.role === "admin"){
                            return null
                        }
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
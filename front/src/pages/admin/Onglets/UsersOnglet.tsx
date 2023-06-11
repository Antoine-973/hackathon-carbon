import {
    Autocomplete,
    Box,
    Button,
    Card, Dialog, DialogActions, DialogContent, DialogTitle,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField
} from "@mui/material";
import React, {useEffect, useState} from "react";
import {UserServices} from "../../../services/UserServices";
import {Clear, Edit} from "@mui/icons-material";
import Loader from "../../../components/loader/Loader.tsx";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import UserService from "../../../services/UserService";
import {EXPERTISES} from "../../../rooter/permissions";

export const UsersOnglet = () => {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)

    const [email, setEmail] = useState("")
    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [password, setPassword] = useState("")
    const [role, setRole] = useState("")
    const [recruitmentAt, setRecruitmentAt] = useState(new Date)

    const [salary, setSalary] = useState(0)
    const [roleUser, setRoleUser] = useState("")
    const [mentorId, setMentorId] = useState("")
    const [expertise, setExpertise] = useState([])
    const [userModified, setUserModified] = useState({})

    const [userSelected, setUserSelected] = useState({})

    const [open, setOpen] = useState(false);


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setUserModified({})
        resetData()
    };

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
            setLoading(false);
        });
    }

    const handleDelete = (id) => {
        UserServices.deleteUser(id).then(() => {
        }).finally(() => {
            setUsers(users.filter((user) => user.id !== id))
            setLoading(false);
        });
    }

    const handleChangeSelect = (event: SelectChangeEvent) => {
        setRole(event.target.value as string);
        console.log(role)
    };

    const resetData = () => {
        setSalary(0)
        setRoleUser("")
        setMentorId("")
        setExpertise([])
    }

    const handleEditForm = (user: any) => {
        if (user.salary) setSalary(user.salary)
        if (user.role) setRoleUser(user.role)
        if (user.mentorId) setMentorId(user.mentorId)
        if (user.expertise) setExpertise(user.expertise)
        setUserModified(user)
        handleClickOpen()
    }
    const handleEdit = () => {
        const role = roleUser;
        const data = {
            salary: parseInt(salary),
            role: role,
            mentorId: mentorId.value,
            expertise: expertise
        }

        UserService.update(userModified.id, data).then(() => {
            setUsers(users.map((user) => {
                if (user.id === userModified.id) {
                    user.salary = parseInt(salary)
                    user.role = role
                    user.mentorId = mentorId
                    user.expertise = expertise
                }
                return user
            }))
        })
        setUserModified({})
        handleClose()
    }

    useEffect(() => {
        setUserSelected(users.map((user) => {
            return {label: user.firstname + " " + user.lastname, value: user.id}
        }))
    }, [users])

    return (
        loading ? <Loader/> :
            <>
                {/*POPUP*/}
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Modification de
                        l'utilisateur {userModified.firstname + " " + userModified.lastname}</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            value={salary}
                            variant="outlined"
                            color="secondary"
                            margin="dense"
                            id="salary"
                            label="Salaire"
                            onChange={(e) => setSalary(e.target.value)}
                            type="string"
                            fullWidth
                        />
                        <FormControl fullWidth sx={{
                            marginY: 2
                        }}>
                            <InputLabel color={"secondary"} id="demo-simple-select-label">Rôle</InputLabel>
                            <Select
                                required={true}
                                id="roleUser"
                                value={roleUser}
                                label="Rôle"
                                color="secondary"
                                name="roleUser"
                                onChange={(e) => setRoleUser(e.target.value)}
                            >
                                <MenuItem key={1} value={"ROLE_CONSULTANT"}>Consultant</MenuItem>
                                <MenuItem key={2} value={"ROLE_SUPPORT"}>Support</MenuItem>
                                <MenuItem key={3} value={"ROLE_ADMIN"}>Admin</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl fullWidth sx={{
                            marginY: 2
                        }}>
                            <InputLabel color={"secondary"} id="demo-simple-select-label">Expertise</InputLabel>
                            <Select
                                required={true}
                                id="expertise"
                                value={expertise}
                                label="Expertise"
                                color="secondary"
                                name="expertise"
                                onChange={(e) => setExpertise(e.target.value)}
                            >
                                <MenuItem key={1} value={EXPERTISES.JUNIOR}>{EXPERTISES.JUNIOR}</MenuItem>
                                <MenuItem key={2} value={EXPERTISES.CONFIRME}>{EXPERTISES.CONFIRME}</MenuItem>
                                <MenuItem key={3} value={EXPERTISES.SENIOR}>{EXPERTISES.SENIOR}</MenuItem>
                                <MenuItem key={4} value={EXPERTISES.EXPERT}>{EXPERTISES.EXPERT}</MenuItem>
                            </Select>
                        </FormControl>
                        <Autocomplete
                            disablePortal
                            color={"secondary"}
                            id="mentorId"
                            value={mentorId}
                            options={userSelected}
                            onChange={(event,value) => setMentorId(value)}
                            sx={{
                                width: 300,
                                marginY: 2
                            }}
                            renderInput={(params) => <TextField {...params} label={"Mentor"}/>}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button color={"secondary"} variant={"contained"} onClick={handleClose}>Annuler</Button>
                        <Button color={"secondary"} variant={"contained"} onClick={handleEdit}>Modifier</Button>
                    </DialogActions>
                </Dialog>

                {/*PAGE CONTENT*/}
                <Grid container direction={"row"}>
                    <Grid item xs={12}>
                        <h2>Création d'un utilisateur</h2>
                        <Box
                            component="form"
                            sx={{
                                '& .MuiTextField-root': {m: 1, width: '25ch'},
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
                                <InputLabel color={"secondary"} id="demo-simple-select-label">Rôle</InputLabel>
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
                                    <MenuItem value={"ROLE_CONSULTANT"}>Consultant</MenuItem>
                                    <MenuItem value={"ROLE_SUPPORT"}>Support</MenuItem>
                                    <MenuItem value={"ROLE_ADMIN"}>Admin</MenuItem>
                                </Select>
                            </FormControl>
                            <Grid style={{
                                marginBottom: 10,
                                marginLeft: 10
                            }}>
                                <DatePicker
                                    selected={recruitmentAt}
                                    onChange={(date) => setRecruitmentAt(date)}
                                />
                            </Grid>
                            <Grid style={{marginLeft: 10}}>
                                <Button variant="contained" type="submit" onClick={() => handleSubmit()}>Créer</Button>
                            </Grid>
                        </Box>
                    </Grid>
                    <h2>Liste des utilisateurs</h2>
                    <Grid container>
                        {
                            users.length > 0 && users.map((user, key) => {
                                if (user.role === "admin") {
                                    return null
                                }
                                return (
                                    <Grid item xs={12} md={6}>
                                        <Card style={{margin: 10, padding: 10}} key={key}>
                                            <Grid container direction={"row"} alignItems={"center"}>
                                                <p>{user.firstname + " " + user.lastname}</p>
                                                <span style={{
                                                    marginLeft: 'auto',
                                                    marginTop: 10,
                                                }}>
                                                <Edit
                                                    sx={{
                                                        cursor: 'pointer',
                                                        marginX: 5
                                                    }}
                                                    onClick={() => {
                                                        handleEditForm(user)
                                                    }}
                                                />
                                                <Clear
                                                    style={{
                                                        cursor: 'pointer',
                                                    }}
                                                    onClick={() => {
                                                        handleDelete(user.id)
                                                    }}
                                                />
                                            </span>
                                            </Grid>
                                        </Card>
                                    </Grid>
                                )
                            })
                        }
                    </Grid>
                </Grid>
            </>
    )
}
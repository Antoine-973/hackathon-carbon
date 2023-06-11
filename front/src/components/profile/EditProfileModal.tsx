import UserService from "../../services/UserService.ts";
import {ChangeEvent, useEffect, useState} from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Divider,
    FormHelperText,
    Grid,
    IconButton,
    TextField
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ReactQuill from "react-quill";
import {useSnackbarContext} from "react-mui-snackbar";

interface Props {
    open: boolean;
    toggleEditModal: () => void;
    userId: number;
}

export default function EditProfileModal(props: Props) {
    const {open, toggleEditModal, userId} = props
    const [user, setUser] = useState<any>({})
    const [isSubmit, setIsSubmit] = useState<boolean>(false)
    const [errorsList, setErrorsList] = useState<any>({})
    const {openSnackbar} = useSnackbarContext();

    const getUser = (userId: number) => {
        UserService.get(userId).then((response) => {
            setUser(response)
        });
    }

    const updateUser = (userId: number) => {
        UserService.update(userId, user).then((response) => {
            openSnackbar({
                message: 'Utilisateur modifié avec succès',
                type: 'success',
            });
        });
    }

    useEffect(() => {
        if (userId && open) {
            getUser(userId);
        }
    }, []);

    useEffect(() => {
        if (Object.keys(errorsList).length === 0 && isSubmit) {
            updateUser(userId)
            handleClose()
        }
    }, [errorsList])

    const handleClose = (reason ?: string) => {
        {
            toggleEditModal()
        }
    };

    const handleSubmit = () => {
        setErrorsList(validateForm(user))
        setIsSubmit(true)
    }

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setUser({...user, [name]: value});
    };

    const handleContentChange = (editor: any) => {
        setUser({...user, description: editor});
    }

    const modules = {
        toolbar: [
            [{font: []}],
            [{header: [1, 2, 3, 4, 5, 6, false]}],
            ["bold", "italic", "underline", "strike"],
            [{color: []}, {background: []}],
            [{list: "ordered"}, {list: "bullet"}],
            [{indent: "-1"}, {indent: "+1"}, {align: []}],
        ]
    }

    const validateForm = (user) => {
        const errors = {} as any
        if (!user.firstname) {
            errors.title = 'Ce champ est requis'
        }
        if (!user.lastname) {
            errors.lastname = 'Ce champ est requis'
        }
        return errors
    }

    return (
        <Dialog open={open} onClose={(event, reason) => {
            handleClose(reason);
        }} fullWidth
                maxWidth="md">
            <DialogTitle>Edition du profil</DialogTitle>
            <IconButton
                aria-label="close"
                onClick={(reason) => {
                    handleClose(reason.toString());
                }}
                sx={{
                    position: 'absolute',
                    right: 8,
                    top: 11,
                    color: (theme) => theme.palette.grey[500],
                }}
            >
                <CloseIcon/>
            </IconButton>
            <Divider/>
            <DialogContent>
                <Grid direction={"column"} container gap={1}>
                    <Grid item container alignItems="center" columns={12} spacing={2}>
                        <Grid item xs={6}>
                            <DialogContentText>Prénom *</DialogContentText>
                            <TextField
                                id="firstname"
                                name="firstname"
                                type="text"
                                value={user.firstname}
                                required
                                autoFocus
                                inputProps={{maxLength: 50}}
                                fullWidth
                                variant="outlined"
                                error={!!errorsList.firstname} // S'il y a un message d'erreur alors l'attribut error est vrai
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <DialogContentText>Nom *</DialogContentText>
                            <TextField
                                id="lastname"
                                name="lastname"
                                type="text"
                                value={user.lastname}
                                required
                                autoFocus
                                inputProps={{maxLength: 50}}
                                fullWidth
                                variant="outlined"
                                error={!!errorsList.lastname} // S'il y a un message d'erreur alors l'attribut error est vrai
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <DialogContentText>Téléphone *</DialogContentText>
                            <TextField
                                id="phone"
                                name="phone"
                                type="tel"
                                value={user.phone}
                                required
                                autoFocus
                                inputProps={{maxLength: 10}}
                                fullWidth
                                variant="outlined"
                                error={!!errorsList.phone} // S'il y a un message d'erreur alors l'attribut error est vrai
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <DialogContentText>Localisation *</DialogContentText>
                            <TextField
                                id="localisation"
                                name="localisation"
                                type="text"
                                value={user.localisation}
                                required
                                autoFocus
                                inputProps={{maxLength: 50}}
                                fullWidth
                                variant="outlined"
                                error={!!errorsList.localisation} // S'il y a un message d'erreur alors l'attribut error est vrai
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <DialogContentText>Mot de passe *</DialogContentText>
                            <TextField
                                id="password"
                                name="password"
                                type="password"
                                value={user.password}
                                required
                                autoFocus
                                inputProps={{maxLength: 50}}
                                fullWidth
                                variant="outlined"
                                error={!!errorsList.password} // S'il y a un message d'erreur alors l'attribut error est vrai
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <DialogContentText>Description *</DialogContentText>
                            <ReactQuill modules={modules} id="description" theme="snow" value={user.description}
                                        onChange={handleContentChange}/>
                        </Grid>
                        <Grid item>
                            <FormHelperText error>{errorsList.description}</FormHelperText>
                        </Grid>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button color={"info"} onClick={(reason) => {
                    handleClose(reason.type);
                }}>Annuler</Button>
                <Button color={"success"} type="submit" sx={{m: 2,}} size="large" variant="contained"
                        onClick={handleSubmit}>Enregistrer</Button>
            </DialogActions>
        </Dialog>
    )
}
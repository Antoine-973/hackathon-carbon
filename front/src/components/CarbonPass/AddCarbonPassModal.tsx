import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Divider, FormHelperText,
    Grid,
    IconButton,
    TextField
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {ChangeEvent, useEffect, useState} from "react";
import {PassServices} from "../../services/PassServices.ts";
import {useSnackbarContext} from "react-mui-snackbar";

interface Props {
    open: boolean;
    toggleEditModal: () => void;
}

export const AddCarbonPassModal = (props: Props) => {
    const {open, toggleEditModal} = props
    const [pass, setPass] = useState<any>({})
    const [isSubmit, setIsSubmit] = useState<boolean>(false)
    const [errorsList, setErrorsList] = useState<any>({})
    const {openSnackbar} = useSnackbarContext();

    const createPass = () => {
        PassServices.savePass(pass).then((response) => {
            openSnackbar({
                message: 'Carbon Pass créé avec succès',
                type: 'success',
            });
        });
    }

    useEffect(() => {
        if (Object.keys(errorsList).length === 0 && isSubmit) {
            createPass()
            handleClose()
        }
    }, [errorsList])

    const handleClose = (reason ?: string) => {
        {
            toggleEditModal()
        }
    };

    const handleSubmit = () => {
        setErrorsList(validateForm(pass))
        pass.startAt = new Date(pass.startAt)
        pass.endAt = new Date(pass.endAt)
        setIsSubmit(true)
    }

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setPass({...pass, [name]: value})
    };


    const validateForm = (pass) => {
        const errors = {} as any
        if (!pass.title) {
            errors.title = 'Ce champ est requis'
        }
        if (!pass.startAt) {
            errors.startAt = 'Ce champ est requis'
        }
        if (!pass.endAt) {
            errors.endAt = 'Ce champ est requis'
        }
        if (pass.startAt > pass.endAt) {
            errors.endAt = 'La date de fin doit être supérieure à la date de début'
        }
        return errors
    }


    return (
        <Dialog open={open} onClose={(event, reason) => {
            handleClose(reason);
        }} fullWidth
                maxWidth="md">
            <DialogTitle>Création d'un Carbon Pass</DialogTitle>
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
                        <Grid item xs={12}>
                            <DialogContentText>Titre *</DialogContentText>
                            <TextField
                                id="title"
                                name="title"
                                type="text"
                                value={pass.title}
                                required
                                autoFocus
                                inputProps={{maxLength: 50}}
                                fullWidth
                                variant="outlined"
                                error={!!errorsList.title} // S'il y a un message d'erreur alors l'attribut error est vrai
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormHelperText error>{errorsList.title}</FormHelperText>
                        </Grid>
                        <Grid item xs={12}>
                            <DialogContentText>Date de début *</DialogContentText>
                            <TextField
                                id="startAt"
                                name="startAt"
                                type="date"
                                value={pass.startAt}
                                required
                                autoFocus
                                fullWidth
                                variant="outlined"
                                error={!!errorsList.startAt} // S'il y a un message d'erreur alors l'attribut error est vrai
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormHelperText error>{errorsList.startAt}</FormHelperText>
                        </Grid>
                        <Grid item xs={12}>
                            <DialogContentText>Date de fin *</DialogContentText>
                            <TextField
                                id="endAt"
                                name="endAt"
                                type="date"
                                value={pass.endAt}
                                required
                                autoFocus
                                fullWidth
                                variant="outlined"
                                error={!!errorsList.endAt} // S'il y a un message d'erreur alors l'attribut error est vrai
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormHelperText error>{errorsList.endAt}</FormHelperText>
                        </Grid>
                        <Grid item xs={12}>
                            <DialogContentText>Description</DialogContentText>
                            <TextField
                                multiline
                                id="description"
                                name="description"
                                type="text"
                                value={pass.description}
                                required
                                autoFocus
                                inputProps={{maxLength: 50}}
                                fullWidth
                                variant="outlined"
                                error={!!errorsList.description} // S'il y a un message d'erreur alors l'attribut error est vrai
                                onChange={handleInputChange}
                            />
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
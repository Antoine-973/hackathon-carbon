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
import {useSnackbarContext} from "react-mui-snackbar";
import {RewardService} from "../../services/RewardService.ts";

interface Props {
    open: boolean;
    toggleEditModal: () => void;
}

export const AddRewardModal = (props: Props) => {
    const {open, toggleEditModal} = props
    const [reward, setReward] = useState<any>({})
    const [isSubmit, setIsSubmit] = useState<boolean>(false)
    const [errorsList, setErrorsList] = useState<any>({})
    const {openSnackbar} = useSnackbarContext();

    const createReward = () => {
        RewardService.saveReward(reward).then((response) => {
            openSnackbar({
                message: 'Reward créé avec succès',
                type: 'success',
            });
        });
    }

    useEffect(() => {
        if (Object.keys(errorsList).length === 0 && isSubmit) {
            createReward()
            handleClose()
        }
    }, [errorsList])

    const handleClose = (reason ?: string) => {
        {
            toggleEditModal()
        }
    };

    const handleSubmit = () => {
        setErrorsList(validateForm(reward))
        setIsSubmit(true)
    }

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setReward({...reward, [name]: value})
    };


    const validateForm = (reward) => {
        const errors = {} as any
        if (!reward.title) {
            errors.title = 'Ce champ est requis'
        }
        return errors
    }


    return (
        <Dialog open={open} onClose={(event, reason) => {
            handleClose(reason);
        }} fullWidth
                maxWidth="md">
            <DialogTitle>Création d'un reward</DialogTitle>
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
                                value={reward.title}
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
                            <DialogContentText>Description</DialogContentText>
                            <TextField
                                multiline
                                id="description"
                                name="description"
                                type="text"
                                value={reward.description}
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
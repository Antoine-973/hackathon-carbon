import {FormControl, InputLabel, Input, useTheme, Button} from '@mui/material';
import { useState } from 'react';
import ReactQuill from 'react-quill';
import {useSnackbarContext} from "react-mui-snackbar";
import { useAuthContext } from '../../../providers/AuthProvider';
import {ForumServices} from "../../../services/ForumServices.ts";
import 'react-quill/dist/quill.snow.css';

export default function NewForum () {


    const [value, setValue] = useState('');
    const [title, setTitle] = useState('');
    const theme = useTheme() ;
    const {user} = useAuthContext() ;
    const {openSnackbar} = useSnackbarContext() ;

    const onSubmit = () => {
        ForumServices.createForum({
            title: title,
            content: value,
            createdById: 1,
            note: 0,
            clientId: 1,
        }).then((res) => {
            openSnackbar({
                message: 'Forum créé avec succès',
                type: 'success',
            });
        }).catch((err) => {
            openSnackbar({
                message: 'Erreur lors de la création du forum',
                type: 'error',
            });
        });
    }

    return (
        <form >
            <FormControl sx={{my:2}}>
                <InputLabel sx={{
                    color: theme.palette.primary.main
                }} htmlFor="my-input">Titre du Carbon OverFlow</InputLabel>
                <Input
                    sx={{
                        color: theme.palette.primary.main
                    }}
                    onChange={(e) => {setTitle(e.target.value)}}
                    id="my-input" aria-describedby="my-helper-text" />
            </FormControl>
            <ReactQuill theme={'snow'}  value={value} onChange={setValue} />

            <Button sx={{my:2}} onClick={() => {onSubmit()}}>
                Envoyer
            </Button>
        </form>
    )

}

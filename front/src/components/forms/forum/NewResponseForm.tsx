import {FormControl, InputLabel, Input, useTheme, Button} from '@mui/material';
import { useState } from 'react';
import ReactQuill from 'react-quill';
import {useSnackbarContext} from "react-mui-snackbar";
import { useAuthContext } from '../../../providers/AuthProvider';
import {ForumServices} from "../../../services/ForumServices.ts";
import 'react-quill/dist/quill.snow.css';

export default function NewForum ({ responses, forumId} : { responses : any, forumId: number}) {


    const [value, setValue] = useState('');
    const [title, setTitle] = useState('');
    const theme = useTheme() ;
    const {user} = useAuthContext() ;
    const {openSnackbar} = useSnackbarContext() ;

    const onSubmit = () => {
        ForumServices.createComment({

            content: value,
            createdBy: user.id ,
            topicId: parseInt(String(forumId))
        }).then((res) => {
            openSnackbar({
                message: 'Forum créé avec succès',
                type: 'success',
            });
            responses.push(res);
        }).catch((err) => {
            openSnackbar({
                message: 'Erreur lors de la création du forum',
                type: 'error',
            });
        });
    }

    return (
        <form >
            <ReactQuill theme={'snow'}  value={value} onChange={setValue} />

            <Button sx={{my:2}} onClick={() => {onSubmit()}}>
                Envoyer
            </Button>
        </form>
    )

}

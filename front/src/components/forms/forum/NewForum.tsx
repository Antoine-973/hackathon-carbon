import {Button, FormControl, InputLabel, MenuItem, Select, TextField, useTheme} from '@mui/material';
import {useState} from 'react';
import ReactQuill from 'react-quill';
import {useSnackbarContext} from "react-mui-snackbar";
import {useAuthContext} from '../../../providers/AuthProvider';
import {ForumServices} from "../../../services/ForumServices.ts";
import 'react-quill/dist/quill.snow.css';
import {useModalContext} from "../../../providers/ModalProvider.tsx";


export default function NewForum ({forums, clients}) {


    const [value, setValue] = useState('');
    const [title, setTitle] = useState('');
    const [client, setClient] = useState('');
    const theme = useTheme() ;
    const {user} = useAuthContext() ;
    const {openSnackbar} = useSnackbarContext() ;
    const {handleOpen} = useModalContext() ;


    const onSubmit = () => {
        ForumServices.createForum({
            title: title,
            content: value,
            createdById: user.id,
            note: 0,
            clientId: client,
        }).then((res) => {
            openSnackbar({
                message: 'Forum créé avec succès',
                type: 'success',
            });
            handleOpen() ;
            forums.push(res);
        }).catch((err) => {
            openSnackbar({
                message: 'Erreur lors de la création du forum',
                type: 'error',
            });
        });
    }

    return (
        <form style={{
            width: '100%',
        }}>
                <TextField
                    label="Titre"
                    fullWidth={true}
                    variant="filled"
                    color={'secondary'}
                    sx={{
                        color: theme.palette.secondary.main,
                        my:2
                    }}
                    onChange={(e) => {setTitle(e.target.value)}}
                     aria-describedby="my-helper-text" />

            <ReactQuill style={{
                height: '200px',
            }} theme={'snow'}  value={value} onChange={setValue} />

            <FormControl sx={{mt:8}} fullWidth>
                <InputLabel color={'secondary'}  id="client" > Client </InputLabel>
                <Select
                    labelId="client"
                    id="client-select"
                    label="client"
                    value={client}
                    onChange={(e) => {setClient(e.target.value)}}
                    color={'secondary'}
                    variant={'filled'}
                >
                    {
                       clients && clients.length >0 && clients.map((client) => {
                            return <MenuItem key={client.id} value={client.id}>{client.title}</MenuItem>
                        })
                    }

                </Select>
            </FormControl>

            <Button color={'secondary'} variant={'contained'} sx={{my:2}} onClick={() => {onSubmit()}}>
                Envoyer
            </Button>
        </form>
    )

}

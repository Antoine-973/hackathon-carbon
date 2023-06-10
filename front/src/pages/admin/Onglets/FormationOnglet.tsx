import {
    Container,
    Typography,
    List,
    Button,
    ListItemButton,
    ListItemText,
    InputLabel,
    Stack,
    Input,
    FormControl, useTheme
} from "@mui/material";
import {useEffect, useState} from "react";
import {FormationServices} from "../../../services/FormationServices.tsx";
import Loader from "../../../components/loader/Loader.tsx";
import ListItemIcon from "@mui/material/ListItemIcon";
import {Delete} from "@mui/icons-material";
import {useModalContext} from "../../../providers/ModalProvider.tsx";
import {DatePicker} from "@mui/lab";

export default function FormationOnlget () {

    const [formation, setFormation] = useState([]) ;
    const [loader, setLoader] = useState(false) ;

    useEffect(() => {

        FormationServices.getFormations().then((res) => {
            setFormation(res)
        }).finally(() => {
            setLoader(false)
        })

    },[]) ;

    const {openModal} = useModalContext() ;
    const theme = useTheme() ;
    const [title, setTitle] = useState('') ;
    const [description, setDescription] = useState('') ;
    const [date, setDate] = useState('') ;
    const addFormation = () => {
        openModal({
            title: 'Ajouter une formation',
            content:
                <Stack>
                <FormControl sx={{my:2}}>
                    <InputLabel sx={{
                        color: theme.palette.primary.main
                    }} htmlFor="my-input">Titre de l'Evolution Carbon</InputLabel>
                    <Input
                        sx={{
                            color: theme.palette.primary.main
                        }}
                        onChange={(e) => {setTitle(e.target.value)}}
                        id="my-input" aria-describedby="my-helper-text" />
                </FormControl>
                <FormControl sx={{my:2}}>
                    <InputLabel sx={{
                        color: theme.palette.primary.main
                    }} htmlFor="desc">Description</InputLabel>
                    <Input
                        sx={{
                            color: theme.palette.primary.main
                        }}
                        onChange={(e) => {setDescription(e.target.value)}}
                        id="desc" aria-describedby="my-helper-text" />
                </FormControl>
                <input type={'date'} label="Date" onChange={(evt) => setDate(new Date(evt.target.value))} />
                <Button onClick={() => {
                    FormationServices.createFormation({
                        title: title,
                        description: description,
                        date: date,
                    }).then((res) => {
                        setFormation([...formation, res])
                    })
                }}>
                    Envoyer
                </Button>
            </Stack>
        })
    }

    return (
        loader? <Loader/> :
        <Container>
            <Typography componant={'h1'} variant={'h4'}>
                Gérer les Evolution Carbon
            </Typography>
            <Button variant={'contained'} sx={{mt:2}}
                    onClick={() => {addFormation()}}
            >
                Ajouter une Evolution Carbon
            </Button>
            <List>
                {
                   formation &&  formation.map((item) => {
                        return (
                            <ListItemButton divider key={item.title}>
                                <ListItemText primary={item.title} secondary={item.description}/>
                                <ListItemText primary={new Date(item.date).toLocaleDateString()}/>
                                <ListItemIcon>
                                    <Delete onClick={() => {
                                        const confirm = window.confirm('Voulez vous vraiment supprimer cette formation ?')
                                        if(!confirm) return
                                        FormationServices.deleteFormation(item.id).then(() => {
                                            setFormation(formation.filter((formation) => formation.id !== item.id))
                                        })
                                    }} />
                                </ListItemIcon>
                            </ListItemButton>
                        )
                    })
                }
            </List>
        </Container>
    )
}
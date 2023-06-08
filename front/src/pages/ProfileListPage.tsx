import {Box, Container, Divider, IconButton, InputBase, Grid} from "@mui/material";
import Selector from "../components/Selector";
import { FilterAltOff, Search} from "@mui/icons-material";
import {SetStateAction, useMemo, useState} from "react";
import {useTheme} from "@mui/material/styles";
import CardProfile from "../components/card/CardProfile.tsx";

interface Profile {
    id: number;
    prenom: string;
    nom: string;
    email: string;
    techno: string[];
    expertise: string;
    dispo: string;
    client: string;
    photo: string;
}

export default function ProfileListPage() {

    const [client, setClient] = useState('');
    const [techno, setTechno] = useState('');
    const [expertise, setExpertise] = useState('');
    const [dispo, setDispo] = useState('');
    const [search, setSearch] = useState('');
    const [profiles, setProfiles] = useState([
        {
            id: 1,
            prenom: 'Antoine',
            nom: 'CHEF',
            techno: [ 'Vue'],
            expertise: 'Expert',
            dispo: 'Disponible',
            client: 'Darty',
            photo: 'https://picsum.photos/50/50'
        },
        {
            id: 2,
            prenom: 'Alexandre',
            nom: 'BAUDRY',
            techno: ['React'],
            expertise: 'Confirmé',
            dispo: 'Disponible',
            client: 'Fnac',
            photo: 'https://picsum.photos/50/50'

        },
        {
            id: 3,
            prenom: 'Jean',
            nom: 'Dupont',
            techno: [ 'Angular'],
            expertise: 'Junior',
            dispo: 'Disponible',
            client: 'Darty',
            photo: 'https://picsum.photos/50/50'
        },
        {
            id: 4,
            prenom: 'Arthur',
            nom: 'GRATTON',
            techno: [ 'React', 'Angular'],
            expertise: 'Expert',
            dispo: 'Disponible',
            client: 'Pmu',
            photo: 'https://picsum.photos/50/50'
        },
        {
            id: 5,
            prenom: 'Aymeric',
            nom: 'Merci',
            techno: [ 'Vue'],
            expertise: 'Confirmé',
            dispo: 'Disponible',
            client: 'Fnac',
            photo: 'https://picsum.photos/50/50'
        },
        {
            id: 6,
            prenom: 'Ruth',
            nom: 'Bader',
            techno: [ 'React'],
            expertise: 'Expert',
            dispo: 'Disponible',
            client: 'Fnac',
            photo: 'https://picsum.photos/50/50'
        }
    ]) ;

    const resetFilter = () => {
        setDispo('') ;
        setClient('') ;
        setTechno('') ;
        setExpertise('') ;
    }

    const handleClientChange = (event) => {
        setClient(event.target.value);
    }

    const handleTechnoChange = (event) => {
        setTechno(event.target.value);
    }

    const handleExpertiseChange = (event) => {
        setExpertise(event.target.value);
    }

    const handleDispoChange = (event) => {
        setDispo(event.target.value);
    }

    const handleSearchChange = (event) => {
        setSearch(event.target.value);
    }

    const data = useMemo(() => {
        if (client === '' && techno === '' && expertise === '' && dispo === '' && search === '') {
            return profiles ;
        }
        return profiles.filter((profile : Profile) => {
            if (client !== '' && profile.client !== client) {
                return false ;
            }
            if (techno !== '' && profile.techno.indexOf(techno) === -1) {
                return false ;
            }
            if (expertise !== '' && profile.expertise !== expertise) {
                return false ;
            }
            if (dispo !== '' && profile.dispo !== dispo) {
                return false ;
            }
            if( search !== '' && profile.prenom.toLowerCase().indexOf(search.toLowerCase()) === -1 && profile.nom.toLowerCase().indexOf(search.toLowerCase()) === -1) {
                return false ;
            }
            return true ;
        })
    },[client, techno, expertise, dispo, search]) ;

    const theme = useTheme() ;

    return (
        <Container>
            <Box sx={{
                top: '100px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexDirection: {xs: 'column', md: 'row'},
            }}>
                <Box
                    display={'flex'}
                    alignItems={'center'}
                    flexWrap={'wrap'}
                    justifyContent={'center'}
                >
                    <Selector
                        title={'Client'}
                        value={client}
                        values={[ 'Pmu', 'Darty', 'Fnac']}
                        handleChange={(event: { target: { value: SetStateAction<undefined>; }; }) => handleClientChange(event)}
                    />
                    <Selector
                        title={'Technologie'}
                        value={techno}
                        values={['React', 'Vue', 'Angular']}
                        handleChange={(event: { target: { value: SetStateAction<undefined>; }; }) => handleTechnoChange(event)}
                    />
                    <Selector
                        title={'Expertise'}
                        value={expertise}
                        values={['Genins ', 'Chuunins', 'Jounins ', 'Kage']}
                        handleChange={(event: { target: { value: SetStateAction<undefined>; }; }) => handleExpertiseChange(event)}
                    />
                    <Selector
                        title={'Disponibilité'}
                        value={dispo}
                        values={['Disponible', 'Dans 3 mois', 'Dans 6 mois ']}
                        handleChange={(event: { target: { value: SetStateAction<undefined>; }; }) => handleDispoChange(event)}
                    />
                    <IconButton
                        onClick={() => {resetFilter()}}
                        type="button"
                        sx={{ m: 2,  p: '10px', color: theme.palette.secondary.main }}
                        aria-label="Clear"
                    >
                        <FilterAltOff/>
                    </IconButton>
                </Box>
                <Box
                    component="form"
                    sx={{ margin: 1 ,  display: 'flex', alignItems: 'center',  border: '1px solid', borderColor: theme.palette.secondary.main, borderRadius: '5px' }}
                >
                    <InputBase
                        onChange={(event: { target: { value: SetStateAction<undefined>; }; }) => handleSearchChange(event)}
                        sx={{ ml: 1, flex: 1 }}
                        placeholder="Type consultant name..."
                        inputProps={{ 'aria-label': 'search carbon consultant' }}
                    />
                    <Divider sx={{ height: 28, borderColor: theme.palette.secondary.main }} orientation="vertical" />
                </Box>
            </Box>
            <Divider sx={{p:2}}/>
            <Grid mt={4} container spacing={2}>
                {
                    data.map((profile : Profile) => {
                        return (
                            <Grid  key={profile.id} item xs={12} md={4}>
                                <CardProfile
                                    prenom={profile.prenom}
                                    nom={profile.nom}
                                    techno={profile.techno}
                                    expertise={profile.expertise}
                                    photo={profile.photo}
                                    dispo={profile.dispo}
                                    client={profile.client}
                                 />
                            </Grid>
                        )
                    })
                }

            </Grid>
        </Container>
    );
}

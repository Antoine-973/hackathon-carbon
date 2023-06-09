import {Box, Container, Divider, Grid, IconButton, InputBase} from "@mui/material";
import Selector from "../components/Selector";
import {FilterAltOff} from "@mui/icons-material";
import {SetStateAction, useEffect, useMemo, useState} from "react";
import {useTheme} from "@mui/material/styles";
import CardProfile from "../components/card/CardProfile.tsx";
import {UserServices} from "../services/UserServices.ts";
import Loader from "../components/loader/Loader";
import {useNavigate} from "react-router-dom";

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

    const expertiseValues = [
        "Argile Fragile",
        "Terre Cuite",
        "Céramique Etincelante",
        "Carbon Fiber",
    ]

    const [client, setClient] = useState('');
    const [techno, setTechno] = useState('');
    const [expertise, setExpertise] = useState('');
    const [dispo, setDispo] = useState('');
    const [search, setSearch] = useState('');
    const [profiles, setProfiles] = useState([]) ;
    const [loader, setLoader] = useState(true) ;

    const resetFilter = () => {
        setDispo('');
        setClient('');
        setTechno('');
        setExpertise('');
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
            return profiles;
        }
        return profiles.filter((profile: Profile) => {
            if (client !== '' && profile.client !== client) {
                return false;
            }
            if (techno !== '' && profile.techno.indexOf(techno) === -1) {
                return false;
            }
            if (expertise !== '' && profile.expertise !== expertise) {
                return false;
            }
            if (dispo !== '' && profile.dispo !== dispo) {
                return false;
            }
            if (search !== '' && profile.prenom.toLowerCase().indexOf(search.toLowerCase()) === -1 && profile.nom.toLowerCase().indexOf(search.toLowerCase()) === -1) {
                return false;
            }
            return true;
        })
    },[client, techno, expertise, dispo, search, profiles]) ;
    const theme = useTheme() ;

    useEffect(() => {
        UserServices.getUsers().then((response) => {
            setProfiles(response) ;
        }).finally(() => {
            setLoader(false) ;
        });
    },[]) ;

    const navigate = useNavigate() ;

    return (
        loader ? <Loader/> :
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
                        values={['Pmu', 'Darty', 'Fnac']}
                        handleChange={(event: {
                            target: { value: SetStateAction<undefined>; };
                        }) => handleClientChange(event)}
                    />
                    <Selector
                        title={'Technologie'}
                        value={techno}
                        values={['React', 'Vue', 'Angular']}
                        handleChange={(event: {
                            target: { value: SetStateAction<undefined>; };
                        }) => handleTechnoChange(event)}
                    />
                    <Selector
                        title={'Expertise'}
                        value={expertise}
                        values={expertiseValues}
                        handleChange={(event: { target: { value: SetStateAction<undefined>; }; }) => handleExpertiseChange(event)}
                    />
                    <Selector
                        title={'Disponibilité'}
                        value={dispo}
                        values={['Disponible', 'Dans 3 mois', 'Dans 6 mois ']}
                        handleChange={(event: {
                            target: { value: SetStateAction<undefined>; };
                        }) => handleDispoChange(event)}
                    />
                    <IconButton
                        onClick={() => {
                            resetFilter()
                        }}
                        type="button"
                        sx={{m: 2, p: '10px', color: theme.palette.secondary.main}}
                        aria-label="Clear"
                    >
                        <FilterAltOff/>
                    </IconButton>
                </Box>
                <Box
                    component="form"
                    sx={{
                        margin: 1,
                        display: 'flex',
                        alignItems: 'center',
                        border: '1px solid',
                        borderColor: theme.palette.secondary.main,
                        borderRadius: '5px'
                    }}
                >
                    <InputBase
                        onChange={(event: {
                            target: { value: SetStateAction<undefined>; };
                        }) => handleSearchChange(event)}
                        sx={{ml: 1, flex: 1}}
                        placeholder="Type consultant name..."
                        inputProps={{'aria-label': 'search carbon consultant'}}
                    />
                    <Divider sx={{height: 28, borderColor: theme.palette.secondary.main}} orientation="vertical"/>
                </Box>
            </Box>
            <Divider sx={{p: 2}}/>
            <Grid mt={4} container spacing={2}>
                {
                    data.map((profile: Profile) => {
                        return (
                            <Grid  key={profile.id} item xs={12} md={4}>
                                <CardProfile
                                    prenom={profile.firstname}
                                    nom={profile.lastname}
                                    techno={profile.techno}
                                    expertise={profile?.expertise || "Argile Fragile"}
                                    photo={"https://picsum.photos/50/50"}
                                    dispo={profile.dispo}
                                    action={() => {navigate(`/consultant/${profile.id}`)}}
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

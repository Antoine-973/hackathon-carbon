import {Box, Container, FormControl, InputLabel, NativeSelect} from "@mui/material";
import Selector from "../components/Selector";
import {SetStateAction, useState} from "react";


export default function ProfileListPage() {

    const [client, setClient] = useState();
    const [techno, setTechno] = useState();
    const [expertise, setExpertise] = useState();

    return (
        <Container>
            <Box sx={{
                position: 'fixed',
                top: '100px',
                display: 'flex',
                width: '100%',
            }}>
                <Selector
                    title={'Client'}
                    value={client}
                    values={['Pmu', 'Darty', 'Fnac']}
                    handleChange={(event: { target: { value: SetStateAction<undefined>; }; }) => setClient(event.target.value)}
                 />
                <Selector
                    title={'Technologie'}
                    value={techno}
                    values={['React', 'Vue', 'Angular']}
                    handleChange={(event: { target: { value: SetStateAction<undefined>; }; }) => setTechno(event.target.value)}
                />
                <Selector
                    title={'Expertise'}
                    value={expertise}
                    values={['Junior', 'Confirmé', 'Expert']}
                    handleChange={(event: { target: { value: SetStateAction<undefined>; }; }) => setExpertise(event.target.value)}
                />

            </Box>
        </Container>
    );
}

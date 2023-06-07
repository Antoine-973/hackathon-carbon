import {
    Box,
    Container,
    Grid,
    Typography,
    Select,
    MenuItem,
    FormLabel,
    FormControl,
    InputLabel,
    NativeSelect, Stack
} from "@mui/material";

export default function ProfileListPage() {
    return (
        <Box  sx={{paddingTop:'100px'}} >
            <Container>
                <Grid container>
                    <Grid item xs={12} sm={2}>
                        <Typography>
                            Tous les filtres
                        </Typography>
                        <Stack>
                            <FormControl sx={{my:4}}>
                                <InputLabel variant="standard" htmlFor="client">
                                    Client
                                </InputLabel>
                                <NativeSelect
                                    defaultValue={'aucun'}
                                    inputProps={{
                                        name: 'age',
                                        id: 'client',
                                    }}
                                >
                                    <option value={'aucun'}>Aucun</option>
                                    <option value={'pmu'}>PMU</option>
                                    <option value={'darty'}>Darty</option>
                                    <option value={'fnac'}>Fnac</option>
                                </NativeSelect>
                            </FormControl>
                            <FormControl sx={{my:4}}>
                                <InputLabel variant="standard" htmlFor="techno">
                                    Technologie
                                </InputLabel>
                                <NativeSelect
                                    defaultValue={'aucune'}
                                    inputProps={{
                                        name: 'age',
                                        id: 'techno',
                                    }}
                                >
                                    <option value={'aucune'}>Aucune</option>
                                    <option value={'react'}>React</option>
                                    <option value={'vue'}>Vue</option>
                                    <option value={'angular'}>Angular</option>
                                </NativeSelect>
                            </FormControl>
                        </Stack>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}

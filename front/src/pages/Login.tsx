import {Box, Button, Grid, TextField} from "@mui/material";
import carbonLogo from "../../public/carbon-logo.png";
import AuthService from "../services/AuthService";
import {useEffect, useState} from "react";

export const Login = () => {

    const [password, setPassword] = useState<string>('')
    const [email, setEmail] = useState<string>('')

    const validateForm = () => {
        AuthService.login(email, password).then((response) => {
            if (response.access_token) {
                localStorage.setItem('token', response.access_token)
                window.location.href = "/"
            }
        })
    }

    useEffect(() => {
        document.body.style.overflow = "hidden";
    }, [])

    return (
        <div style={{
            overflow: 'fixed',
        }}>
            <Grid container>
                <Grid item xs={12} sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                }}>
                    <Box sx={{
                        marginBottom: 10,
                    }}>
                        <img src={carbonLogo}/>
                    </Box>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        maxWidth: 300,
                    }}>
                        <TextField
                            id="email"
                            label="Email"
                            variant="outlined"
                            onChange={(e) => setEmail(e.target.value)}
                            sx={{
                                borderRadius: 20,
                                marginBottom: 2,
                            }}
                        />
                        <TextField
                            id="mot_de_passe"
                            label="Mot de passe"
                            variant="outlined"
                            onChange={(e) => setPassword(e.target.value)}
                            sx={{
                                borderRadius: 20,
                            }}
                        />
                        <Button variant={"outlined"} onClick={() => validateForm()} style={{
                            marginTop: 20,
                            backgroundColor: "#00BB7E",
                        }}>
                            Se connecter
                        </Button>
                    </Box>
                </Grid>
                <Box style={{
                    position: 'absolute',
                    top: '-10vh',
                    right: '-60vw',
                    zIndex: -1,
                    width: '100vw',
                }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="1615.663" height="1464.82"
                         viewBox="0 0 1615.663 1464.82">
                        <g id="Polygone_2" data-name="Polygone 2" transform="translate(1615.663 688.101) rotate(146)"
                           fill="#00bb7e">
                            <path d="M694.5,0,1389,830H0Z" stroke="none"/>
                            <path
                                d="M 694.5000610351562 1.558349609375 L 2.1407470703125 829 L 1386.859375 829 L 694.5000610351562 1.558349609375 M 694.5000610351562 0 L 1389 830 L 0.0001220703125 830 L 694.5000610351562 0 Z"
                                stroke="none" fill="rgba(112,112,112,0)"/>
                        </g>
                    </svg>
                </Box>
                <Box sx={{
                    position: 'absolute',
                    top: '-60vh',
                    left: '-50vw',
                    zIndex: -1,
                    width: '50%',
                }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="1255.011" height="1589.11"
                         viewBox="0 0 1255.011 1589.11">
                        <g id="Polygone_1" data-name="Polygone 1" transform="translate(779.945) rotate(60)"
                           fill="#e53f49">
                            <path d="M694.5,0,1389,830H0Z" stroke="none"/>
                            <path
                                d="M 694.5000610351562 1.558349609375 L 2.1407470703125 829 L 1386.859375 829 L 694.5000610351562 1.558349609375 M 694.5000610351562 0 L 1389 830 L 0.0001220703125 830 L 694.5000610351562 0 Z"
                                stroke="none" fill="rgba(112,112,112,0)"/>
                        </g>
                    </svg>
                </Box>
            </Grid>
        </div>

    )
}
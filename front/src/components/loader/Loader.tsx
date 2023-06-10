import {Box, useTheme} from "@mui/material";
import styles from './Loader.module.css';

export default function Loader () {
    const theme = useTheme() ;
    return (
        <Box sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height:'80vh',
        }} >
            <img className={styles.rotate} width={'100px'} src="/LogoShort.png" alt="logo carbon blanc"/>
        </Box>
    )
}
import * as React from 'react';
import {Box, CircularProgress, CircularProgressProps, Typography} from "@mui/material";

const CircularProgressWithLabel = (
    props: CircularProgressProps & { value: number }
) => {
    return (
        <Box sx={{ position: 'relative', display: 'inline-flex', margin:2 }}>
            <CircularProgress variant="determinate" {...props} sx={{color:"#00BB7E"}} size={80}/>
            <Box
                sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Typography
                    variant="h5"
                    component="div"
                    color="#00BB7E"
                >{`${Math.round(props.value)}`}</Typography>
            </Box>
        </Box>
    );
}

export const CircularStatic = ({level}:{level: number}) => {
    const [progress, setProgress] = React.useState(10);

    React.useEffect(() => {
        setProgress(level);
    }, []);

    return <CircularProgressWithLabel value={progress}/>;
}
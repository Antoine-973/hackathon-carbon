import {Box,Typography,Stack} from "@mui/material";
import {useTheme} from "@mui/material/styles";


export default function Article ({image, title, description, link}: {image: string, title: string, description: string, link: string}) {
    const theme = useTheme();


    return (
        <Box
            sx={{
                background : `url(${image}) no-repeat center center`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                borderRadius: '10px',
                minWidth: '400px',
                minHeight:'150px',
                height:'100%',
                width: '100%',
                cursor: 'pointer',
                border: '2px solid ' + theme.palette.info.main,
            }}
            onClick={() => { window.open(link, '_blank') }}
        >
            <Stack sx={{
                paddingTop:2,
                paddingLeft:4,
                paddingRight:4,
                color: theme.palette.primary.main
            }}>
                <Typography variant={'h2'} componant={'p'}>
                    {title}
                </Typography>
                <Typography sx={{
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    display: 'block',
                    width: '400px',
                }}>
                    {description}
                </Typography>
            </Stack>
        </Box>
    )
}
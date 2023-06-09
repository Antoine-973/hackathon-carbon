import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Box from '@mui/material/Box';
import Slide from '@mui/material/Slide';
import {Fragment, ReactElement, useState} from "react";
import NotificationsIcon from '@mui/icons-material/Notifications';
import DragHandleIcon from "@mui/icons-material/DragHandle";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import styles from "./Header.module.css";
import {
    Drawer,
    IconButton,
    useTheme,
    styled,
    Divider,
    List,
    ListItem,
    ListItemButton,
    ListItemText
} from "@mui/material";
import { NavLink, useNavigate} from 'react-router-dom';

interface Props {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window?: () => Window;
    children: ReactElement;
}

function HideOnScroll(props: Props) {
    const { children, window } = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({
        target: window ? window() : undefined,
    });

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    );
}


const drawerWidth = 240 ;
const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
}));
export default function Header(props: Props)  {

    const theme = useTheme() ;
    const [open, setOpen] = useState(false);
    const logo = "./carbon-logo.png" ;

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const navigate = useNavigate();
    const links = [
        {name:'Mon Carbon', path:'/profil'},
        {name:'Carbon Overflow', path:'/forum'},
        {name:"Evolution Carbon", path:'/formation'},
        {name:'Regroupement Carbon', path:'/evenement'} ,
        {name:'Les Carbons', path:'/consultant'}
    ];

    interface Link {
        isPending: boolean,
        isActive: boolean
    }

    return (
        <Fragment>
            <CssBaseline/>
            <HideOnScroll {...props}>
                <AppBar>
                    <Toolbar>
                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            width: '100%'
                        }}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    width: '100%'
                                }}
                            >
                                <img
                                    style={{
                                        cursor: 'pointer',
                                        marginRight: '40px'
                                    }}
                                    width={'100px'}
                                    onClick={() => {
                                        navigate('/')
                                    }}
                                    src="/carbon-logo.png" alt="Logo de l'entreprise Carbon IT"
                                />
                                <Box
                                    sx={{
                                        display: {xs:'none', md:'flex'},
                                    }}
                                >
                                    {
                                        links.map( (link) => {
                                            return (
                                                <NavLink
                                                    className={({ isActive, isPending }: Link) =>
                                                        isPending ? "" : isActive ? styles.active : ""
                                                    }
                                                    to={link.path} key={link.name}
                                                    style={{
                                                        color: theme.palette.secondary.main,
                                                        textDecoration: 'none',
                                                        margin: '0 10px',
                                                    }}
                                                >
                                                    {link.name}
                                                </NavLink>
                                            )
                                        })
                                    }
                                </Box>
                            </Box>
                            <Box sx={{
                                display: 'flex',
                            }}>
                                <IconButton sx={{color: theme.palette.secondary.main}}>
                                    <NotificationsIcon/>
                                </IconButton>
                                <IconButton  onClick={() => handleDrawerOpen()} sx={{
                                    color: theme.palette.secondary.main,
                                    display: {xs:'block', md:'none'}
                                }} >
                                    <DragHandleIcon/>
                                </IconButton>
                            </Box>
                        </Box>


                            <Box flex={1}/>

                    </Toolbar>
                </AppBar>
            </HideOnScroll>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                    },
                }}
                variant="persistent"
                anchor="right"
                open={open}
            >
                <DrawerHeader>
                    <IconButton
                        sx={{color: theme.palette.secondary.main}}
                        onClick={handleDrawerClose}>
                         <ChevronRightIcon />
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    {
                        links.map((text) => (
                        <ListItem key={text.name} disablePadding>
                            <ListItemButton onClick={() => {
                                navigate(text.path)
                            }}>
                                <ListItemText primary={text.name}>
                                </ListItemText>
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        </Fragment>
    )

}
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Box from '@mui/material/Box';
import Slide from '@mui/material/Slide';
import {Fragment, ReactElement, useState} from "react";
import {Notifications} from "@mui/icons-material";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
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

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <Fragment>
            <CssBaseline/>
            <HideOnScroll {...props}>
                <AppBar>
                    <Toolbar>
                            <img width={'100px'}  src="/carbon-logo.png" alt="Logo de l'entreprise Carbon IT"/>
                            <Box flex={1}/>
                            <IconButton sx={{color: theme.palette.secondary.main}}>
                                <Notifications/>
                            </IconButton>
                            <IconButton onClick={() => handleDrawerOpen()} sx={{color: theme.palette.secondary.main}} >
                                <DragHandleIcon/>
                            </IconButton>
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
                    {['Profil', 'Forum', 'Formation', 'Evenement','Consultants'].map((text) => (
                        <ListItem key={text} disablePadding>
                            <ListItemButton>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        </Fragment>
    )

}
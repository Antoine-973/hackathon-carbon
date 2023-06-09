import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import {Home, Article, People, AlternateEmail, Co2} from '@mui/icons-material';
import {UsersOnglet} from "./Onglets/UsersOnglet";
import {DashboardOnglet} from "./Onglets/DashboardOnglet";
import {ArticlesOnglet} from "./Onglets/ArticlesOnglet";
import {TechnologiesOnglet} from "./Onglets/TechnologiesOnglet";
import {CarbonpassOnglet} from "./Onglets/CarbonpassOnglet";

const drawerWidth = 240;

export const Dashboard = () => {

    const [onglet, setOnglet] = React.useState('Dashboard')

    const links = [
        {
            name: 'Dashboard',
            icon: < Home />
        },
        {
            name: 'Articles',
            icon: < Article/>
        },
        {
            name: 'Users',
            icon: < People />
        },
        {
            name: 'Technologies',
            icon: < AlternateEmail />
        },
        {
            name: 'CarbonPass',
            icon: < Co2/>
        }
    ]

    const getOnglet = () => {
        switch (onglet) {
            case 'Dashboard':
                return <DashboardOnglet/>
            case 'Users':
                return <UsersOnglet/>
            case 'Articles':
                return <ArticlesOnglet/>
            case 'Technologies':
                return <TechnologiesOnglet/>
            case 'CarbonPass':
                return <CarbonpassOnglet/>
            default:
                return <DashboardOnglet/>
        }
    }

    return (
        <Box sx={{display: 'flex'}}>
            <CssBaseline/>
            <Drawer
                variant="permanent"
                sx={{
                    zIndex: 0,
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: {width: drawerWidth, boxSizing: 'border-box'},
                }}
            >
                <Toolbar/>
                <Box sx={{overflow: 'auto'}}>
                    <List>
                        {
                            links.map((link, index) => {
                                return (
                                    <ListItem key={index} disablePadding onClick={() => setOnglet(link.name)}>
                                        <ListItemButton>
                                            <ListItemIcon>
                                                {link.icon}
                                            </ListItemIcon>
                                            <ListItemText primary={link.name}/>
                                        </ListItemButton>
                                    </ListItem>
                                )
                            })
                        }
                    </List>

                </Box>
            </Drawer>
            <Box component="main" sx={{flexGrow: 1, p: 3}}>
                {
                    getOnglet()
                }
            </Box>
        </Box>
    );
}
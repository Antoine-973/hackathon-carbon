import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import {AlternateEmail, Article, Co2, Home, People} from '@mui/icons-material';
import {UsersOnglet} from "./Onglets/UsersOnglet";
import {DashboardOnglet} from "./Onglets/DashboardOnglet";
import {ArticlesOnglet} from "./Onglets/ArticlesOnglet";
import {TechnologiesOnglet} from "./Onglets/TechnologiesOnglet";
import {CarbonpassOnglet} from "./Onglets/CarbonpassOnglet";
import {School} from "@mui/icons-material";
import FormationOnglet from './Onglets/FormationOnglet';

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
            name : 'Evolution Carbon',
            icon : < School/>
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
            case 'Evolution Carbon':
                return <FormationOnglet/>
            default:
                return <DashboardOnglet/>
        }
    }

    return (
        <Box sx={{display: 'flex'}}>
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
import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Backdrop, CircularProgress } from '@mui/material';
import ViewAgendaIcon from '@mui/icons-material/ViewAgenda';
import TocIcon from '@mui/icons-material/Toc';
import Top from '../pages/Top';
import MainVisual from './MainVisual';
import { useElementClientRect } from '../hooks/ElementClientRect';
import { sectionsData } from '../data/Data';

const drawerWidth = 270;
const navItems = ['Home', 'About', 'Contact'];

function Header(props) {
    const { window, children } = props;

    const projectName = 'Boeing B-52 Stratofortress';
    const [agendaOpen, setAgendaOpen] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const ref = useRef(null);
    const {clientRect, setDOMLoading} = useElementClientRect(ref);

    const handleAgendaToggle = () => {
        setAgendaOpen((prevState) => !prevState);
    }

    const agenda = (
        <Box onClick={handleAgendaToggle} sx={{ textAlign: 'center' }}>
        <Typography variant="h6" sx={{ my: 2 }}>
            Agenda
        </Typography>
        <Divider />
            <List disablePadding>
                {
                    sectionsData.map((section, index) => (
                        <React.Fragment key={index}>
                            <ListItem disablePadding>
                                <ListItemButton id={section.title}>
                                    <ListItemText primary={section.title}/>
                                </ListItemButton>
                            </ListItem>
                            <Divider />
                            {
                                section.subSections !== undefined &&
                                <React.Fragment>
                                    <List component="div" disablePadding>
                                    {
                                        section.subSections.map((subSection, index) => (
                                            <React.Fragment key={index}>
                                                <ListItemButton sx={{ pl: 4 }} id={subSection.title}>
                                                    <ListItemText primary={subSection.title}/>
                                                </ListItemButton>
                                                <Divider />
                                            </React.Fragment>
                                        ))
                                    }
                                    </List>
                                </React.Fragment>
                            }
                        </React.Fragment>
                    ))
                }
            </List>
        </Box>
    );

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
        <Typography variant="h6" sx={{ my: 2 }}>
            {projectName}
        </Typography>
        <Divider />
        <List disablePadding>
                {navItems.map((item) => (
                <ListItem key={item} disablePadding>
                    <ListItemButton sx={{ textAlign: 'center' }}>
                        <ListItemText primary={item} />
                    </ListItemButton>
                </ListItem>
                ))}
        </List>
        </Box>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar component="nav" ref={ref}>
                <Toolbar>
                <Typography
                    variant="h6"
                    component="div"
                    sx={{ flexGrow: 1, display: { xs: 'block' } }}
                >
                    {projectName}
                </Typography>
                <IconButton
                    color="inherit"
                    aria-label="open agenda"
                    edge="end"
                    onClick={handleAgendaToggle}
                    sx={{ display: { md: 'none' }, mr: 1 }}
                >
                    <TocIcon />
                </IconButton>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="end"
                    onClick={handleDrawerToggle}
                    sx={{ display: { md: 'none' } }}
                >
                    <MenuIcon />
                </IconButton>
                <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                    {navItems.map((item) => (
                    <Button key={item} sx={{ color: '#fff' }}>
                        {item}
                    </Button>
                    ))}
                </Box>
                </Toolbar>
            </AppBar>
            <Box component="nav">
                <Drawer
                    container={container}
                    variant="temporary"
                    open={agendaOpen}
                    onClose={handleAgendaToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', md: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {agenda}
                </Drawer>
            </Box>
            <Box component="nav">
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', md: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box component="main">
                <Toolbar />
                {
                    clientRect === null ?
                    <Backdrop open={true}>
                        <CircularProgress/>
                    </Backdrop>
                    :
                    <React.Fragment>
                        <Box sx={{width: 'calc(100vw - (100vw - 100%))'}}>
                            <MainVisual headerElmBoundingClientRect={clientRect} />
                            <Top headerElmBoundingClientRect={clientRect} />
                        </Box>
                    </React.Fragment>
                }
            </Box>
        </Box>
    );
}

Header.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
    children: PropTypes.element
};

export default Header;

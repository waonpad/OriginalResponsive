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

import MainVisual from './MainVisual';
import { useWindowDimensions } from '../hooks/WindowDimensions';

const drawerWidth = 240;
const navItems = ['Home', 'About', 'Contact'];

function Header(props) {
    const { window, children } = props;
    const [mobileOpen, setMobileOpen] = useState(false);
    const headerElm = useRef(null);
    const { width, height } = useWindowDimensions();
    const [headerElmBoundingClientRect, setHeaderElmBoundingClientRect] = useState(null);

    useEffect(() => {
        const status = headerElm.current.getBoundingClientRect();
        // console.log(status);
        setHeaderElmBoundingClientRect(status);
    }, [headerElm, width, height]);

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
        <Typography variant="h6" sx={{ my: 2 }}>
            MUI
        </Typography>
        <Divider />
        <List>
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
            <AppBar component="nav" ref={headerElm}>
                <Toolbar>
                <Typography
                    variant="h6"
                    component="div"
                    sx={{ flexGrow: 1, display: { xs: 'block' } }}
                >
                    MUI
                </Typography>
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
                    headerElmBoundingClientRect === null ?
                    <Backdrop open={true}>
                        <CircularProgress/>
                    </Backdrop>
                    :
                    <React.Fragment>
                        <Box sx={{width: '100vw'}}>
                            <MainVisual headerElmBoundingClientRect={headerElmBoundingClientRect} />
                        </Box>
                        {children}
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

import React from 'react';
import { Box } from '@mui/material';

function MainVisual(props) {
    const {headerElmBoundingClientRect} = props;

    return (
        <Box
            sx={{
                position: 'realative',
                width: '100%',
                minHeight: {
                    xs: `calc(100vh - ${headerElmBoundingClientRect.height}px)`,
                    sm: `calc(50vh - ${headerElmBoundingClientRect.height}px)`,
                    md: `calc(50vh - ${headerElmBoundingClientRect.height}px)`,
                    lg: `calc(100vh - ${headerElmBoundingClientRect.height}px)`,

                },
                background: `url(${window.location.origin}/images/main_visual.png) center / cover`,
            }}
        >
            <></>
        </Box>
    )
}

export default MainVisual;
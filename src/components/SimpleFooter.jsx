import React, { useState, useEffect, CSSProperties } from 'react';
import { Box, Typography, SxProps, Theme } from '@mui/material';

function SimpleFooter(props) {
    const {wrap, style} = props;

    return (
        <Box sx={{...style, display: 'flex', alignItems: "center", justifyContent: "center"}}>
            <Typography sx={{whiteSpace: 'pre-line', textAlign: 'center'}}>Copryright &copy; 2023 {wrap && "\n"} Boeing B-52 Stratofortress.</Typography>
        </Box>
    )
}

export default SimpleFooter;
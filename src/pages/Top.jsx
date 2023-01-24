import React from 'react';
import { Box, Container, Grid } from '@mui/material';
import { useWindowDimensions } from '../hooks/WindowDimensions';

const Top = () => {
    const {breakpoint} = useWindowDimensions();

    return (
        <Container maxWidth={false} sx={{'&.MuiContainer-root':{ paddingLeft: 0, paddingRight: 0}}}>
            <Grid container spacing={0}>
                {/* 左 */}
                <Grid item container lg={2.5} sx={{display: {xs: 'none', lg: 'block'}}}>
                    <Grid item xs={12}>
                        <Box sx={{minWidth: '100%', minHeight: '300px', backgroundColor: 'red'}}>左</Box>
                    </Grid>
                </Grid>
                {/* 中 */}
                <Grid item container xs={12} sm={8.5} md={8} lg={6.5}>
                    <Grid item xs={12}>
                        <Box sx={{minWidth: '100%', minHeight: '300px', backgroundColor: 'green'}}>中</Box>
                    </Grid>
                </Grid>
                {/* 右 */}
                <Grid item container sm={3.5} md={4} lg={3} sx={{display: {xs: 'none', sm: 'block'}}}>
                    <Grid item xs={12}>
                        {
                            ['sm', 'md'].includes(breakpoint) ?
                            <Grid container>
                                {/* 右の左 */}
                                <Grid item xs={6}>
                                    <Box sx={{minWidth: '100%', minHeight: '300px', backgroundColor: 'red'}}>左</Box>
                                </Grid>
                                {/* 右の右 */}
                                <Grid item xs={6}>
                                    <Box sx={{minWidth: '100%', minHeight: '300px', backgroundColor: 'blue'}}>右</Box>
                                </Grid>
                            </Grid>
                            :
                            ['lg', 'xl'].includes(breakpoint) ?
                            <Box sx={{minWidth: '100%', minHeight: '300px', backgroundColor: 'blue'}}>右</Box>
                            :
                            <Box>予期せぬbreakpoint</Box>
                        }
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    )
}

export default Top;
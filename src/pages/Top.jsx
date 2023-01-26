import React, { useState, useEffect } from 'react';
import { Box, Container, Grid, Card } from '@mui/material';
import { useWindowDimensions } from '../hooks/WindowDimensions';
import Agenda from '../components/Agenda';
import Gallery from '../components/Gallery';
import ButtonGroupPrimary from '../components/ButtonGroupPrimary';
import MainArticle from '../components/MainArticle';
import { useElementClientRect } from '../hooks/ElementClientRect';

const Top = (props) => {
    const {headerElmBoundingClientRect} = props;

    const {breakpoint} = useWindowDimensions();
    const {ref, client_rect, setDOMLoading} = useElementClientRect();
    const [dispComponent, setDispComponent] = useState('gallery');

    const handleChangeDispComponent = (event) => {
        setDispComponent(event.currentTarget.value);
    }

    return (
        <Container maxWidth={false} sx={{'&.MuiContainer-root':{paddingTop: 1, paddingLeft: 1, paddingRight: 1}}}>
            <Grid container spacing={1}>
                {/* 左 */}
                <Grid item lg={2.5} sx={{display: {xs: 'none', lg: 'block'}, maxHeight: `calc(100vh - ${headerElmBoundingClientRect.height}px)`}}>
                    <Card elevation={1} sx={{minHeight: 'calc(100% - 16px)', maxHeight: 'calc(100% - 16px)'}}>
                        <ButtonGroupPrimary
                            head={true}
                            items={[
                                {
                                    text: 'Agenda',
                                    value: 'agenda',
                                    active: false
                                },
                            ]}
                        />
                        {/* 形式が同じなので、右エリアのclientrectを流用 */}
                        <Agenda parent_client_rect={client_rect} />
                    </Card>
                </Grid>
                {/* 中 */}
                <Grid item xs={12} sm={8.5} md={8} lg={6.5} sx={{minHeight: '100%', maxHeight: `calc(100vh - ${headerElmBoundingClientRect.height}px)`}}>
                    <MainArticle />
                </Grid>
                {/* 右 */}
                <Grid item sm={3.5} md={4} lg={3} sx={{display: {xs: 'none', sm: 'block'}, maxHeight: `calc(100vh - ${headerElmBoundingClientRect.height}px)`}}>
                    <Card elevation={1} sx={{minHeight: 'calc(100% - 16px)', maxHeight: 'calc(100% - 16px)'}} ref={ref}>
                        {
                            ['sm', 'md'].includes(breakpoint) ?
                            <React.Fragment>
                                <ButtonGroupPrimary
                                    head={true}
                                    items={[
                                        {
                                            text: 'Agenda',
                                            value: 'agenda',
                                            onClick: handleChangeDispComponent,
                                            active: dispComponent === 'agenda'
                                        },
                                        {
                                            text: 'Gallery',
                                            value: 'gallery',
                                            onClick: handleChangeDispComponent,
                                            active: dispComponent === 'gallery'
                                        },
                                    ]}
                                />
                                {dispComponent === 'agenda' && <Agenda parent_client_rect={client_rect} />}
                                {dispComponent === 'gallery' && <Gallery parent_client_rect={client_rect} />}
                            </React.Fragment>
                            :
                            ['lg', 'xl'].includes(breakpoint) ?
                            <React.Fragment>
                                <ButtonGroupPrimary
                                    head={true}
                                    items={[
                                        {
                                            text: 'Gallery',
                                            value: 'gallery',
                                            active: false
                                        },
                                    ]}
                                />
                                <Gallery parent_client_rect={client_rect} />
                            </React.Fragment>
                            :
                            <></>
                        }
                    </Card>
                </Grid>
            </Grid>
        </Container>
    )
}

export default Top;
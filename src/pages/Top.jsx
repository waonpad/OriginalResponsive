import React, { useState, useEffect, useRef } from 'react';
import { Box, Container, Grid, Card } from '@mui/material';
import { useWindowDimensions } from '../hooks/WindowDimensions';
import Agenda from '../components/Agenda';
import Gallery from '../components/Gallery';
import ButtonGroupPrimary from '../components/ButtonGroupPrimary';
import Article from '../components/Article';
import { useElementClientRect } from '../hooks/ElementClientRect';
import useElementChildScroll from '../hooks/ElementChildScroll';

const Top = (props) => {
    const {headerElmBoundingClientRect} = props;

    const {breakpoint} = useWindowDimensions();
    const ref = useRef(null);
    const {clientRect, setDOMLoading} = useElementClientRect(ref);
    const [dispComponent, setDispComponent] = useState('gallery');
    const [agendaScrollTop, setAgendaScrollTop] = useState(0);
    const [articleScrollTop, setArticleScrollTop] = useState(0);
    const [galleryScrollTop, setGalleryScrollTop] = useState(0);
    const articleSectionRefs = useRef({});
    const galleryImageRefs = useRef({});
    // const [currentSection, setCurrentSection] = useState('Summary');

    const handleChangeAgendaScrollTop = (scrollTop) => {
        setAgendaScrollTop(scrollTop);
    }

    const handleChangeArticleScrollTop = (scrollTop) => {
        setArticleScrollTop(scrollTop);
    }

    const handleChangeGalleryScrollTop = (scrollTop) => {
        setGalleryScrollTop(scrollTop);
    }

    const handleChangeDispComponent = (event) => {
        setDispComponent(event.currentTarget.value);
    }

    const handleScrollIntoView = (event) => {
        const key = event.currentTarget.id;
        const targetArticle = articleSectionRefs.current[key];
        targetArticle && articleSectionRefs.current[key].scrollIntoView({behavior: 'smooth', block: 'start'});

        // 2つをスクロールしようとすると片方しかできない
        // imageは、articleのスクロールに反応してスクロールされるべきだが、めんどくさそう

        // const targetImage = galleryImageRefs.current[key];
        // targetImage && galleryImageRefs.current[key].scrollIntoView({behavior: 'smooth', block: 'start'});
    }

    return (
        <Container maxWidth={false} sx={{'&.MuiContainer-root':{paddingTop: 1, paddingLeft: 1, paddingRight: 1}}}>
            <Grid container spacing={1}>
                {/* 左 */}
                <Grid item lg={2.5} sx={{display: {xs: 'none', lg: 'block'}, minHeight: `calc(100vh - ${headerElmBoundingClientRect.height}px)`, maxHeight: `calc(100vh - ${headerElmBoundingClientRect.height}px)`}}>
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
                        {/* 形式が同じなので、右エリアのclientRectを流用 */}
                        <Agenda
                            parentClientRect={clientRect}
                            storedAgendaScrollTop={agendaScrollTop}
                            handleChangeAgendaScrollTop={handleChangeAgendaScrollTop}
                            handleScrollIntoView={handleScrollIntoView}
                        />
                    </Card>
                </Grid>
                {/* 中 */}
                <Grid item xs={12} sm={8} md={8} lg={6.5} sx={{minHeight: `calc(100vh - ${headerElmBoundingClientRect.height}px)`, maxHeight: `calc(100vh - ${headerElmBoundingClientRect.height}px)`}}>
                    <Article
                        articleSectionRefs={articleSectionRefs}
                        storedArticleScrollTop={articleScrollTop}
                        handleChangeArticleScrollTop={handleChangeArticleScrollTop}
                    />
                </Grid>
                {/* 右 */}
                <Grid item sm={4} md={4} lg={3} sx={{display: {xs: 'none', sm: 'block'}, minHeight: `calc(100vh - ${headerElmBoundingClientRect.height}px)`, maxHeight: `calc(100vh - ${headerElmBoundingClientRect.height}px)`}}>
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
                                {dispComponent === 'agenda' &&
                                    <Agenda
                                        parentClientRect={clientRect}
                                        storedAgendaScrollTop={agendaScrollTop}
                                        handleChangeAgendaScrollTop={handleChangeAgendaScrollTop}
                                        handleScrollIntoView={handleScrollIntoView}
                                    />
                                }
                                {dispComponent === 'gallery' &&
                                    <Gallery
                                        parentClientRect={clientRect}
                                        storedGalleryScrollTop={galleryScrollTop}
                                        handleChangeGalleryScrollTop={handleChangeGalleryScrollTop}
                                        galleryImageRefs={galleryImageRefs}
                                    />
                                }
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
                                <Gallery
                                    parentClientRect={clientRect}
                                    storedGalleryScrollTop={galleryScrollTop}
                                    handleChangeGalleryScrollTop={handleChangeGalleryScrollTop}
                                    galleryImageRefs={galleryImageRefs}
                                />
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
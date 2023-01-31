import React, { useState, useEffect, useRef } from 'react';
import { Box, Container, Grid, Card, Fab, Dialog, Typography, ImageList, ImageListItem, ImageListItemBar } from '@mui/material';
import CollectionsIcon from '@mui/icons-material/Collections';
import { useWindowDimensions } from '../hooks/WindowDimensions';
import Agenda from '../components/Agenda';
import Gallery from '../components/Gallery';
import ButtonGroupPrimary from '../components/ButtonGroupPrimary';
import Article from '../components/Article';
import { useElementClientRect } from '../hooks/ElementClientRect';
import useElementChildPositions from '../hooks/ElementChildPositions';
import { itemData } from '../data/Data';

const Top = (props) => {
    const {headerElmBoundingClientRect} = props;

    const {width, height, breakpoint} = useWindowDimensions();
    const ref = useRef(null);
    const {clientRect} = useElementClientRect(ref);
    const [dispComponent, setDispComponent] = useState('gallery');
    const [agendaScrollTop, setAgendaScrollTop] = useState(0);
    const [articleScrollTop, setArticleScrollTop] = useState(0);
    const [galleryScrollTop, setGalleryScrollTop] = useState(0);
    const articleRef = useRef(null);
    const articleSectionRefs = useRef({});
    const galleryRef = useRef(null);
    const galleryImageRefs = useRef({});
    const articleChildPositions = useElementChildPositions(articleRef, articleSectionRefs);
    const galleryChildPositions = useElementChildPositions(galleryRef, galleryImageRefs);
    const [currentSection, setCurrentSection] = useState('Summary');
    const [galleryDialogOpen, setGalleryDialogOpen] = useState(false);

    const isEmpty = (obj) => {
        return !Object.keys(obj).length;
    }

    const handleChangeAgendaScrollTop = (scrollTop) => {
        setAgendaScrollTop(scrollTop);
    }

    const handleChangeArticleScrollTop = (scrollTop) => {
        setArticleScrollTop(scrollTop);
        handleChnageCurrentSection();
    }

    const handleChangeGalleryScrollTop = (scrollTop) => {
        setGalleryScrollTop(scrollTop);
    }

    const handleChangeDispComponent = (event) => {
        setDispComponent(event.currentTarget.value);
    }

    useEffect(() => {
        handleGalleryScrollTo();
    }, [currentSection])

    const handleGalleryScrollTo = () => {
        if(!isEmpty(galleryChildPositions)) {
            const key = currentSection;

            const target = galleryChildPositions.filter((childPosition) => (
                childPosition.key === key
            ))[0];

            if(target) {
                const top = target.y + galleryScrollTop;
                galleryRef.current && galleryRef.current.scrollTo({top: top, left: 0, behavior: 'smooth'})
            }
        }
    }

    const handleArticleScrollTo = (event) => {
        if(!isEmpty(articleChildPositions)) {
            const key = event.currentTarget.id;
            
            const target = articleChildPositions.filter((childPosition) => (
                childPosition.key === key
            ))[0];

            if(target) {
                const top = target.y + articleScrollTop;
                articleRef.current && articleRef.current.scrollTo({top: top, left: 0, behavior: 'smooth'})
            }
        }
    }

    const handleChnageCurrentSection = () => {
        if(!isEmpty(articleChildPositions)) {
            const sortedArticleChildPositions = articleChildPositions.sort((a, b) => {
                return a.y - b.y;
            });
            
            const activeSections = sortedArticleChildPositions.filter((childPosition, index) => (
                articleScrollTop + childPosition.y + sortedArticleChildPositions[0].y <= 100
            ));

            setCurrentSection(activeSections.map((activeSection) => activeSection.key)[activeSections.length - 1])
        }
    }

    const handleGalleryDialogOpen = () => {
        setGalleryDialogOpen(true);
    }

    const handleGalleryDialogClose = () => {
        setGalleryDialogOpen(false);
    }

    return (
        <Container maxWidth={false} sx={{position: 'relative', '&.MuiContainer-root':{paddingTop: 1, paddingLeft: 1, paddingRight: 1}}}>
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
                            handleArticleScrollTo={handleArticleScrollTo}
                            currentSection={currentSection}
                        />
                    </Card>
                </Grid>
                {/* 中 */}
                <Grid item xs={12} sm={8} md={8} lg={6.5} sx={{minHeight: `calc(100vh - ${headerElmBoundingClientRect.height}px)`, maxHeight: `calc(100vh - ${headerElmBoundingClientRect.height}px)`}}>
                    <Article
                        articleRef={articleRef}
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
                                        handleArticleScrollTo={handleArticleScrollTo}
                                        currentSection={currentSection}
                                    />
                                }
                                {dispComponent === 'gallery' &&
                                    <Gallery
                                        galleryRef={galleryRef}
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
                                    galleryRef={galleryRef}
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
            <Dialog
                onClose={handleGalleryDialogClose}
                open={galleryDialogOpen}
                PaperProps={{
                    style: {
                        boxShadow: 'none',
                        minWidth: '95vw',
                        minHeight: '100vh',
                        backgroundColor: 'transparent'
                    }
                }}
                BackdropProps={{
                    style: {
                        backgroundColor: '#000',
                        opacity: 0.7
                    }
                }}
                onClick={handleGalleryDialogClose}
            >
                <ImageList cols={2}>
                {itemData.map((item) => (
                    <Box key={item.img}>
                        <ImageListItem sx={{width: `${width ? (width * 0.94) / 2 : 0}px`}}>
                            <img
                                src={`${window.location.origin}/images/B52/${item.img}`}
                                alt={item.title}
                                loading="lazy"
                            />
                            <ImageListItemBar
                                sx={{'& .MuiImageListItemBar-titleWrap': {paddingTop: 0}}}
                                title={<Typography variant="caption" color='#fff' fontSize={5} sx={{whiteSpace: 'pre-line'}}>{item.title}</Typography>}
                                position="below"
                            />
                        </ImageListItem>
                    </Box>
                ))}
                </ImageList>
            </Dialog>
            <Fab
                color='primary'
                sx={{
                    display: {xs: 'flex', sm: 'none'},
                    position: 'fixed',
                    bottom: '16px',
                    right: '16px'
                }}
                onClick={handleGalleryDialogOpen}
            >
                <CollectionsIcon />
            </Fab>
        </Container>
    )
}

export default Top;
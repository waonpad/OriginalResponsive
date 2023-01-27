import React, { useState, useEffect, useRef } from 'react';
import { Box, Container, Grid, Card } from '@mui/material';
import { useWindowDimensions } from '../hooks/WindowDimensions';
import Agenda from '../components/Agenda';
import Gallery from '../components/Gallery';
import ButtonGroupPrimary from '../components/ButtonGroupPrimary';
import Article from '../components/Article';
import { useElementClientRect } from '../hooks/ElementClientRect';
import useElementChildPositions from '../hooks/ElementChildPositions';

// ウインドウのサイズを変えたり要素の一部が表示されていない時などに動かすとバグって思うような動作をしない
// 位置取得の仕方が甘いのが原因だと思われる

const Top = (props) => {
    const {headerElmBoundingClientRect} = props;

    const {breakpoint} = useWindowDimensions();
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
    const [currentSection, setCurrentSection] = useState('Summary');
    const articleChildPositions = useElementChildPositions(articleRef, articleSectionRefs);
    const galleryChildPositions = useElementChildPositions(galleryRef, galleryImageRefs);

    const isEmpty = (obj) => {
        return !Object.keys(obj).length;
    }

    useEffect(() => {
        if(!isEmpty(galleryChildPositions) && (['lg', 'xl'].includes(breakpoint) || dispComponent === 'gallery')) {
            const key = currentSection;
            const targetImage = galleryChildPositions.filter((galleryChildPosition) => ( galleryChildPosition.key === key ));

            console.log(targetImage);
            targetImage[0] && galleryRef.current.scrollTo({top: targetImage[0].y, left: 0, behavior: 'smooth', block: 'start'});
        }
    }, [currentSection])

    const handleChangeAgendaScrollTop = (scrollTop) => {
        setAgendaScrollTop(scrollTop);
    }

    const handleChangeArticleScrollTop = (scrollTop) => {
        setArticleScrollTop(scrollTop);
          
        if(!isEmpty(articleChildPositions)) {
            const sortedArticleChildPositions = articleChildPositions.sort((a, b) => {
                return a.y - b.y;
            });
            
            const activeSections = sortedArticleChildPositions.filter((childPosition, index) => (
                index === sortedArticleChildPositions.length - 1 ? articleScrollTop + 200 >= sortedArticleChildPositions[index].y : articleScrollTop + 200 >= sortedArticleChildPositions[index].y && articleScrollTop + 200 <= sortedArticleChildPositions[index + 1].y
            ));

            setCurrentSection(activeSections.map((activeSection) => activeSection.key)[activeSections.length - 1])
        }
    }

    const handleChangeGalleryScrollTop = (scrollTop) => {
        setGalleryScrollTop(scrollTop);
    }

    const handleChangeDispComponent = (event) => {
        setDispComponent(event.currentTarget.value);
    }

    const handleScrollIntoView = (event) => {
        const key = event.currentTarget.id;

        const targetSection = articleChildPositions.filter((articleChildPosition) => ( articleChildPosition.key === key ));
        targetSection[0] && articleRef.current.scrollTo({top: targetSection[0].y, left: 0, behavior: 'smooth', block: 'start'});
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
                                        handleScrollIntoView={handleScrollIntoView}
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
        </Container>
    )
}

export default Top;
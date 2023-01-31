import React, { useRef, useEffect } from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { Card, Grid, Typography } from '@mui/material';
import useElementChildScroll from '../hooks/ElementChildScroll';
import useElementChildPositions from '../hooks/ElementChildPositions';
import { useElementClientRect } from '../hooks/ElementClientRect';
import { sectionsData, itemData } from '../data/Data';

export default function Article(props) {
    const {articleRef, storedArticleScrollTop, handleChangeArticleScrollTop, articleSectionRefs} = props;

    // const articleRef = useRef(null);
    const articleScrollTop = useElementChildScroll(articleRef);
    const {clientRect} = useElementClientRect(articleRef);
    
    useEffect(() => {
        if(handleChangeArticleScrollTop) {
            // console.log(articleScrollTop)
            handleChangeArticleScrollTop(articleScrollTop)
        }
    }, [articleScrollTop])

    useEffect(() => {
        if(articleRef && storedArticleScrollTop) {
            articleRef.current.scrollTop = storedArticleScrollTop;
        }
    }, [articleRef])

    return (
        <Card elevation={1} ref={articleRef} sx={{minHeight: 'calc(100% - 16px)', maxHeight: 'calc(100% - 16px)', overflow: 'scroll', '&::-webkit-scrollbar': {display: 'none'}}}>
            <Box sx={{padding: 2}}>
            <Typography variant="h4" gutterBottom>
                Boeing B-52 Stratofortress
            </Typography>
            <Grid container spacing={5}>
                {
                    sectionsData.map((section, index) => (
                        <Grid item xs={12} key={index} ref={el => {articleSectionRefs.current[section.title] = el}}>
                            <Typography variant="h5" gutterBottom>
                                {section.title}
                            </Typography>
                            {
                                section.subSections === undefined ?
                                <Box>
                                    <Box sx={{float: 'right', ml: 0.5}}>
                                        <img
                                            // width={`${clientRect ? clientRect.width / 3 : 0}px`}
                                            height={`${24 * 5 - 1.5}px`} // 24はfontSize * lineHeight // 余分な下の隙間を作らないようにheight基準
                                            src={`${window.location.origin}/images/B52/${itemData.filter((item) => (item.section === section.title))[0].img}`}
                                            alt={itemData.filter((item) => (item.section === section.title))[0].title}
                                            loading="lazy"
                                        />
                                    </Box>
                                    <Typography variant="body1" sx={{whiteSpace: 'pre-line'}} gutterBottom>
                                        {section.text}
                                    </Typography>
                                </Box>
                                :
                                <Grid container spacing={1}>
                                    {
                                        section.subSections.map((subSection, index) => (
                                            <Grid item xs={12} key={index} ref={el => {articleSectionRefs.current[subSection.title] = el}}>
                                                <Typography variant="h6" gutterBottom>
                                                    {subSection.title}
                                                </Typography>
                                                <Box>
                                                    <Box sx={{float: 'right', ml: 0.5}}>
                                                        <img
                                                            // width={`${clientRect ? clientRect.width / 3 : 0}px`}
                                                            height={`${24 * 5 - 1.5}px`} // 24はfontSize * lineHeight // 余分な下の隙間を作らないようにheight基準
                                                            src={`${window.location.origin}/images/B52/${itemData.filter((item) => (item.subSection === subSection.title))[0].img}`}
                                                            alt={itemData.filter((item) => (item.subSection === subSection.title))[0].title}
                                                            loading="lazy"
                                                        />
                                                    </Box>
                                                    <Typography variant="body1" sx={{whiteSpace: 'pre-line'}} gutterBottom>
                                                        {subSection.text}
                                                    </Typography>
                                                </Box>
                                            </Grid>
                                        ))
                                    }
                                </Grid>
                            }
                        </Grid>
                    ))
                }
            </Grid>
            </Box>
        </Card>
    )
}
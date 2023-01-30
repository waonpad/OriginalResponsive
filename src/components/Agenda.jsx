import React, {useEffect, useRef} from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { Card, Box, ListItem } from '@mui/material';
import useElementChildScroll from '../hooks/ElementChildScroll';
import { sectionsData } from '../data/Data';

export default function Agenda(props) {
    const {parentClientRect, storedAgendaScrollTop, handleChangeAgendaScrollTop, handleArticleScrollTo, currentSection} = props;

    const agendaRef = useRef(null);
    const agendaScrollTop = useElementChildScroll(agendaRef);
    
    useEffect(() => {
        if(handleChangeAgendaScrollTop) {
            console.log(agendaScrollTop)
            handleChangeAgendaScrollTop(agendaScrollTop)
        }
    }, [agendaScrollTop])

    useEffect(() => {
        if(agendaRef && storedAgendaScrollTop) {
            agendaRef.current.scrollTop = storedAgendaScrollTop;
        }
    }, [agendaRef])

    return (
        <Box sx={{ minWidth: '100%', bgcolor: 'background.paper'}}>
            <List ref={agendaRef} sx={{pt: 0, pb: 0, maxHeight: `calc(${parentClientRect ? parentClientRect.height : 0}px - 35px)`, overflow: 'auto', '&::-webkit-scrollbar': {display: 'none'}}}>
                {
                    sectionsData.map((section, index) => (
                        <React.Fragment key={index}>
                            <ListItem disablePadding>
                                <ListItemButton id={section.title} onClick={handleArticleScrollTo}>
                                    <ListItemText primary={section.title} primaryTypographyProps={{fontWeight: currentSection === section.title ? 'bold' : 'normal'}} />
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
                                                <ListItemButton sx={{ pl: 4 }} id={subSection.title} onClick={handleArticleScrollTo}>
                                                    <ListItemText primary={subSection.title} primaryTypographyProps={{fontWeight: currentSection === subSection.title ? 'bold' : 'normal'}} />
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
}

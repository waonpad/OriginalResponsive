import React, { useRef, useEffect } from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import { Box, Typography } from '@mui/material';
import useElementChildScroll from '../hooks/ElementChildScroll';
import { useElementClientRect } from '../hooks/ElementClientRect';
import { itemData } from '../data/Data';

export default function Gallery(props) {
    const {galleryRef, parentClientRect, storedGalleryScrollTop, handleChangeGalleryScrollTop, galleryImageRefs} = props;

    // const galleryRef = useRef(null);
    const galleryScrollTop = useElementChildScroll(galleryRef);
    const {clientRect} = useElementClientRect(galleryRef);

    useEffect(() => {
        if(handleChangeGalleryScrollTop) {
            // console.log(galleryScrollTop)
            handleChangeGalleryScrollTop(galleryScrollTop)
        }
    }, [galleryScrollTop])

    useEffect(() => {
        if(galleryRef && storedGalleryScrollTop) {
            galleryRef.current.scrollTop = storedGalleryScrollTop;
        }
    }, [galleryRef])

    return (
        <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <ImageList cols={1} ref={galleryRef} sx={{width: '95%', mt: 1, mb: 1, maxHeight: `calc(${parentClientRect ? parentClientRect.height : 0}px - 35px - 8px)`, overflow: 'auto', '&::-webkit-scrollbar': {display: 'none'}}}>
            {itemData.map((item) => (
                <Box key={item.img} ref={el => {galleryImageRefs.current[item.subSection ? item.subSection : item.section] = el}}>
                    <ImageListItem sx={{width: `${clientRect ? clientRect.width : 0}px`}}>
                        <img
                            src={`${window.location.origin}/images/B52/${item.img}`}
                            alt={item.title}
                            loading="lazy"
                        />
                        <ImageListItemBar
                            title={<Typography variant="caption" sx={{whiteSpace: 'pre-line'}}>{item.title}</Typography>}
                            // subtitle={<span>{item.subSection ? item.subSection : item.section}</span>}
                            position="below"
                        />
                    </ImageListItem>
                </Box>
            ))}
            </ImageList>
        </Box>
    );
}

import React, { useRef, useEffect } from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import { Box, Typography } from '@mui/material';
import useElementChildScroll from '../hooks/ElementChildScroll';
import { useElementClientRect } from '../hooks/ElementClientRect';

export default function Gallery(props) {
    const {parentClientRect, storedGalleryScrollTop, handleChangeGalleryScrollTop, galleryImageRefs} = props;

    const galleryRef = useRef(null);
    const galleryScrollTop = useElementChildScroll(galleryRef);
    const {clientRect} = useElementClientRect(galleryRef);

    useEffect(() => {
        if(handleChangeGalleryScrollTop) {
            console.log(galleryScrollTop)
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
                            // subtitle={<span>{item.section}</span>}
                            position="below"
                        />
                    </ImageListItem>
                </Box>
            ))}
            </ImageList>
        </Box>
    );
}

const itemData = [
    {
        img: 'B-52_Takeoff_Tinker_05.jpg',
        title: 'ティンカー空軍基地より飛び立つB-52H-175-BW61-0036号機 (2014年12月9日撮影)',
        section: 'Summary'
    },
    {
        img: 'Boeing_B-52_Stratofortress_evolution,_part_1.png',
        title: '機体の発展（1）。左からモデル462、464-29、464-35',
        section: 'Development'
    },
    {
        img: 'Boeing_B-52_Stratofortress_evolution,_part_2.png',
        title: '機体の発展（2）。左からモデル464-49、464-67（YB-52とXB-52）、B-52A',
        section: 'Development'
    },
    {
        img: 'B-52_&_Tu-95.jpg',
        title: 'B-52（手前）とソ連のTu-95（中央の2機）。双方は冷戦期の戦略爆撃の主力を担った。最奥は世界最大級の輸送機An-124',
        section: 'Operational history',
        subSection: 'Cold War'
    },
    {
        img: 'B52destroyed.jpg',
        title: 'START I批准により、アリゾナ州デビスモンサン空軍基地で廃棄処分されたB-52',
        section: 'Operational history',
        subSection: 'Cold War'
    },
    {
        img: 'B-52D(061127-F-1234S-017).jpg',
        title: '爆弾を投下するB-52D（1960年代）',
        section: 'Operational history',
        subSection: 'Combat'
    },
    {
        img: 'B-1B_B-2_and_B-52.jpg',
        title: 'B-52（上）と飛行するB-1B（中）とB-2（下）。共にB-52を完全に置き換えるには至らなかった',
        section: 'Operational history',
        subSection: 'Longer operation'
    },
    {
        img: 'B-52H_static_display_arms_06.jpg',
        title: 'B-52の搭載兵器',
        section: 'Operational history',
        subSection: 'Longer operation'
    },
    {
        img: 'B-52_and_16_other_planes_fly_over_Kitty_Hawk_in_formation_flight_August_14,_2007.jpg',
        title: '「勇敢な盾2007軍事訓練」に参加するB-52（2007年8月14日）',
        section: 'Operational history',
        subSection: 'Henceforth'
    },
];

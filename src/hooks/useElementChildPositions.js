import { useState, useEffect } from 'react';
import { useElementClientRect } from './useElementClientRect';
import useElementChildScroll from './useElementChildScroll';

function useElementChildPositions(parentRef, childRefs) {
    const {clientRect: parentRect} = useElementClientRect(parentRef);
    const scrollTop = useElementChildScroll(parentRef);
    const [childPositions, setChildPositions] = useState({});

    useEffect(() => {
        if (parentRect && parentRef.current && childRefs.current[Object.keys(childRefs.current)[0]]) { // 存在判定の仕方雑？

            const handleMove = () => {
                // console.log(parentRect)

                const childPositions = Object.keys(childRefs.current).map((childRefKey) => {
                    const childRect =  childRefs.current[childRefKey].getBoundingClientRect();

                    // console.log({[childRefKey]: childRect});
                    return {
                        key: childRefKey,
                        x: childRect.left - parentRect.left,
                        y: childRect.top - parentRect.top
                    };
                })
                setChildPositions(childPositions);
            };

            handleMove();

            window.addEventListener('resize', handleMove);
            window.addEventListener("scroll", handleMove);
            
            return () => {
                window.removeEventListener('resize', handleMove);
                window.removeEventListener("scroll", handleMove);
            };
        }
    }, [parentRef, childRefs, parentRect, scrollTop]);

    return childPositions;
}

export default useElementChildPositions;

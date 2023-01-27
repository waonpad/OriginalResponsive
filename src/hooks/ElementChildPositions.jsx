import { useState, useEffect } from 'react';

function useElementChildPositions(parentRef, childRefs) {
    const [childPositions, setChildPositions] = useState({});

    useEffect(() => {
        if (parentRef.current && childRefs.current[Object.keys(childRefs.current)[0]]) { // 存在判定の仕方雑？
        const parentRect = parentRef.current.getBoundingClientRect();

        const handleMove = () => {
            // console.log(parentRect);

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
    }, [parentRef, childRefs]);

    return childPositions;
}

export default useElementChildPositions;

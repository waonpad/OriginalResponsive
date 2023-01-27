import { useState, useEffect, useRef } from "react";
import { useWindowDimensions } from "./WindowDimensions";

export const useElementClientRect = (ref) => {
    const {width, height} = useWindowDimensions();
    const [domLoading, setDOMLoading] = useState(true);
    const [clientRect, setClientRect] = useState(null);

    const getClientRect = () => {
        if(ref.current !== null) {
            const clientRect = ref.current.getBoundingClientRect();
            setClientRect(clientRect);
        }
    }

    useEffect(() => {
        const handleScroll = () => {
            getClientRect()
        };

        window.addEventListener("scroll", handleScroll);
        window.addEventListener('resize', handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", handleScroll);
        };
    }, [])

    useEffect(() => {
        getClientRect()
    }, [domLoading, ref, width, height])

    return {
        clientRect,
        setDOMLoading
    }
}
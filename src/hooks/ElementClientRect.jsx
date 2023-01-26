import { useState, useEffect, useRef } from "react";
import { useWindowDimensions } from "./WindowDimensions";

export const useElementClientRect = () => {
    const ref = useRef(null);
    const {width, height} = useWindowDimensions();
    const [dom_loading, setDOMLoading] = useState(true);
    const [client_rect, setClientRect] = useState(null);

    const getClientRect = () => {
        if(ref.current !== null) {
            const client_rect = ref.current.getBoundingClientRect();
            setClientRect(client_rect);
        }
    }

    useEffect(() => {
        const handleScroll = () => {
            getClientRect()
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
          window.removeEventListener("scroll", handleScroll);
        };
    }, [])

    useEffect(() => {
        getClientRect()
    }, [dom_loading, ref, width, height])

    return {
        ref,
        client_rect,
        setDOMLoading
    }
}
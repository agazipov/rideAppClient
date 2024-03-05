import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import { useDebounce, useDebouncedCallback } from 'use-debounce';

const context = React.createContext(0);
const setterContext = React.createContext((e: ICoord) => { });

export const useMouseMove = () => {
    return useContext(context);
};

export const useSetMouseMove = () => {
    return useContext(setterContext);
};

interface IProvider {
    children: React.ReactNode
}

interface ICoord {
    x: number,
    y: number,
}

export const MouseMoveProvider = ({ children }: IProvider) => {
    const [coord, setCoord] = useState(0);
    const [isDistance, setDistance] = useState(0);
    const [debounceCoord] = useDebounce(coord, 1000);
    const refX = useRef(0);
    const refY = useRef(0);
    const refXPrev = useRef(0);
    const refYPrev = useRef(0);
    // const debounced = useDebouncedCallback((e: number) => {
    //     console.log(e);
    //     setCoord(e);
    // }, 1000) 
    const calculateDistance = useCallback((x1: number, y1: number, x2: number, y2: number): number => {
        const distance = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
        return distance;
    }, [])

    useEffect(() => {
        const intervalId = setInterval(() => {
            // if (refXPrev.current === refX.current && refYPrev.current === refY.current) {
            //     setDistance(0);
            //     return;
            // }
            // const distance = calculateDistance(refXPrev.current, refYPrev.current, refX.current, refY.current);
            // refXPrev.current = refX.current;
            // refYPrev.current = refY.current;
            const speed = Math.round(Math.sqrt((refX.current**2)+(refY.current**2)));
            setDistance(speed);
            // console.log(`Speed X: ${refX.current}px/s, Y: ${refY.current}px/s`);
            console.log(`MidSpeed: ${speed}`);
            
            refX.current = refY.current = 0;
        }, 1000);

        return () => {
            console.log('unmount');
            clearInterval(intervalId);
        };
    }, []);

    const setMouseMove = useCallback((e: ICoord) => {
        refX.current += Math.abs(e.x);
        refY.current += Math.abs(e.y);
        // setCoord(e);
    }, []);

    return (
        <context.Provider value={isDistance / 30}>
            <setterContext.Provider value={setMouseMove}>
                {children}
            </setterContext.Provider>
        </context.Provider>
    );
};
import React, { useCallback, useContext, useEffect, useRef, useState } from "react";

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
    const [speed, setSpeed] = useState(0);
    const refX = useRef(0);
    const refY = useRef(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            const deegre = arrowDeegre(refX.current, refY.current);
            setSpeed(deegre);
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
    }, []);

    const arrowDeegre = useCallback((x: number, y: number) => {
        if (x === 0 && y === 0) {
            return 0;
        }
        const speed = Math.round(Math.sqrt((x ** 2) + (y ** 2)) / 30);
        return speed;
    }, []);

    return (
        <context.Provider value={speed}>
            <setterContext.Provider value={setMouseMove}>
                {children}
            </setterContext.Provider>
        </context.Provider>
    );
};
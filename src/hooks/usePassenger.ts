import { useCallback, useRef, useState } from "react";
import { IPassengers } from "../type/interface";
import { countFreeSeaats } from "../libs/counters";
import { log } from "console";

const defaultValue = {
    left: false,
    right: false,
    mid: false,
    front: false
}

export function usePassenger(passengers: IPassengers  = defaultValue) {
    const [salon, setSalon] = useState<IPassengers>(passengers);
    const ref = useRef(countFreeSeaats(passengers));
    const defaultFreeSeats = ref.current;

    const setPassenger = useCallback((param: string) => {
        setSalon((prev) => {
            return { ...prev, [param]: !prev[param] };
        });
    }, []);

    const freeSeats = useCallback(() => {        
        return countFreeSeaats(salon) - defaultFreeSeats;
    }, [salon, defaultFreeSeats])

    return { salon, setPassenger, freeSeats }
}
import { useCallback, useRef, useState } from "react";
import { IClient } from "../type/interface";
import { countFreeSeaats } from "../libs/counters";
import { SubmitHandler } from "react-hook-form";

const defaultValue: IClient[] = [
    {
        position: 'front',
        name: '',
        phone: '',
    },
    {
        position: 'left',
        name: '',
        phone: '',
    },
    {
        position: 'mid',
        name: '',
        phone: '',
    },
    {
        position: 'right',
        name: '',
        phone: '',
    }
]

export function usePassenger(passengers: IClient[] = defaultValue) {
    const [salon, setSalon] = useState<IClient[]>(passengers);
    const ref = useRef(countFreeSeaats(passengers));
    const defaultFreeSeats = ref.current;

    const setPassenger: SubmitHandler<IClient> = useCallback((data) => {
        const { position, name, phone } = data;
        setSalon((prev) => {
            return prev.map((seat) => seat.position === position ? { ...seat, name, phone } : seat)
        });
    }, []);

    // выглядит как полная хуйня
    const freeSeatsAdd = useCallback(() => {
       return countFreeSeaats(salon);
    }, [salon]);

    const freeSeatsChange = useCallback(() => {
        return countFreeSeaats(salon) - defaultFreeSeats;
    }, [salon, defaultFreeSeats]);
    console.log('salon', salon);
    

    return { salon, setPassenger, freeSeatsAdd, freeSeatsChange };
}
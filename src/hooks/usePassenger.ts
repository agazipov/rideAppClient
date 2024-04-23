import { useCallback, useRef, useState } from "react";
import { IClient } from "../type/interface";
import { countFreeSeats } from "../libs/counters";
import { SubmitHandler } from "react-hook-form";

const defaultValue: IClient[] = [
    {
        position: 'front',
        name: '',
        phone: '',
        isFind: false,
    },
    {
        position: 'left',
        name: '',
        phone: '',
        isFind: false,
    },
    {
        position: 'mid',
        name: '',
        phone: '',
        isFind: false,
    },
    {
        position: 'right',
        name: '',
        phone: '',
        isFind: false,
    }
]

export function usePassenger(passengers: IClient[] = defaultValue) {  
    const [salon, setSalon] = useState<IClient[]>(passengers);
    const ref = useRef(countFreeSeats(passengers));
    const defaultFreeSeats = ref.current;

    const setPassenger: SubmitHandler<IClient> = useCallback((data) => {
        const { position, name, phone, isFind } = data;
        setSalon((prev) => {
            return prev.map((seat) => seat.position === position ? { ...seat, name, phone, isFind } : seat)
        });
    }, []);

    // выглядит как полная хуйня
    const freeSeatsAdd = useCallback(() => {
       return countFreeSeats(salon);
    }, [salon]);

    const freeSeatsChange = useCallback(() => {
        return countFreeSeats(salon) - defaultFreeSeats;
    }, [salon, defaultFreeSeats]);

    console.log('salon', salon);
    
    return { salon, setPassenger, freeSeatsAdd, freeSeatsChange };
}
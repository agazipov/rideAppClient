import { IClient } from "../type/interface";

export function countFreeSeaats(seats: IClient[]): number {
    let count = 0;
    seats.forEach(seat => {
        if (!seat.name) count++;
    });
    
    return count;
};

import { IPassengers } from "../type/interface";

export function countFreeSeaats(seats: IPassengers): number {
    let count = 0;
    Object.values(seats).forEach(seat => {
        if (seat) count++;
    });
    return count;
};

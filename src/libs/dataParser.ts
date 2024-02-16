import { IEvent } from "../type/interface";

export function dataParseTitleForSeats(data: IEvent[]):IEvent[] {
    const newData = data.map((route) => {
        const value = route.seats === 0 ? 'нет мест' : route.seats?.toString();
        return { ...route, title: route.title + ' / ' + value}
    });
    return newData;
}
import { IEvent } from "../type/interface";

export function mapEvents(events: IEvent[]): IEvent[][] {
    // ОПТИМИЗИРУЙТЕ МЕНЯ ПОЖАЛУЙСТА!!!
    const copyEvents = [...events];
    copyEvents.sort((a, b) => Number(a.start.toString().slice(8, 10)) - Number(b.start.toString().slice(8, 10)));

    const dateArray = [copyEvents[0].start];

    const arr = copyEvents.map((event, index) => {
        if (dateArray[dateArray.length - 1] !== event.start ) dateArray.push(event.start)
        const value = event.seats === 0 ? 'нет мест' : event.seats?.toString();
        return { ...event, title: event.title + ' / ' + value}
    });

    return dateArray.map(elem => {
        return arr.filter(event => event.start === elem);
    })
}
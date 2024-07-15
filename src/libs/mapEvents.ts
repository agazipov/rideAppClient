import { IEvent } from "../type/interface";

/**
 * преобразует полученые с бека данные в формат, подходящий для отрисовки в компоненте
 * евенты с одинаковыми датами сортируются в отдельный массив
 * @param events 
 * @returns 
 */

export function mapEvents(events: IEvent[]): IEvent[][] {
    // ОПТИМИЗИРУЙТЕ МЕНЯ ПОЖАЛУЙСТА!!!
    if (!events.length) return [];
    const copyEvents = [...events];
    copyEvents.sort((a, b) => Number(a.start.toString().slice(8, 10)) - Number(b.start.toString().slice(8, 10)));

    const dateArray = [copyEvents[0].start];

    const arr = copyEvents.map((event) => {
        if (dateArray[dateArray.length - 1] !== event.start ) dateArray.push(event.start);
        return event;
    });

    return dateArray.map(elem => {
        return arr.filter(event => event.start === elem);
    });
}

// export function mapEvents(events: IEvent[]): IEvent[][] {
//     if (!events.length) return [];

//     // Сортировка событий по дате
//     const sortedEvents = [...events].sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime());

//     // Группировка событий по уникальным датам
//     const groupedEvents = sortedEvents.reduce((acc, event) => {
//         const date = event.start.toISOString().split('T')[0]; // Получение даты в формате YYYY-MM-DD
//         if (!acc[date]) {
//             acc[date] = [];
//         }
//         acc[date].push(event);
//         return acc;
//     }, {} as Record<string, IEvent[]>);

//     // Преобразование объекта в массив массивов
//     return Object.values(groupedEvents);
// }